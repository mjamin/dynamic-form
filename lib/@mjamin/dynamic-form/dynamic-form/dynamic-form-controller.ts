import { Subscription, Observable, ReplaySubject } from "rxjs";
import { tap } from "rxjs/operators";

import { DynamicFormRef } from "./dynamic-form-ref";
import { DynamicFormSchema } from "./dynamic-form-schema";
import { FormValueChangedEvent, FormSchemaChangedEvent, FormStatusChangedEvent, DynamicFormEvent } from "./dynamic-form-event";

export class DynamicFormController {
    private _attached: boolean;
    private _formRef: DynamicFormRef;
    private _formEventsSubscription: Subscription;
    private _schema: DynamicFormSchema;
    private _values: {[key: string]: any};
    private _lastValid: boolean = null;
    private _validSubject = new ReplaySubject<boolean>(1);

    get valid(): Observable<boolean> {
        return this._validSubject.asObservable();
    }

    setValues(values: {[key: string]: any}): void {
        this._values = values;

        if (this._attached) {
            this._formRef.setValues(values, false);
        }
    }

    setSchema(schema: DynamicFormSchema): void {
        this._schema = schema;

        if (this._attached) {
            this._formRef.setSchema(schema, false);
        }
    }

    attach(form: DynamicFormRef): void {
        if (this._attached) {
            throw new Error("Already attached.");
        }

        this._formRef = form;

        this._formEventsSubscription = this._formRef.formEvents.pipe(
            tap(e => {
                this.handleFormEvent(e);
            })
        ).subscribe();

        if (this._schema) {
            this._formRef.setSchema(this._schema, false);
        }

        if (this._values) {
            this._formRef.setValues(this._values, false);
        }

        this._attached = true;
    }

    detach(): void {
        if (!this._attached) {
            throw new Error("Not attached.");
        }

        this._formRef = null;
        this._formEventsSubscription.unsubscribe();
        this._attached = false;
    }

    private handleFormEvent(event: DynamicFormEvent): void {
        if (event instanceof FormValueChangedEvent) {
            this._values = event.form.value;
            return;
        }

        if (event instanceof FormSchemaChangedEvent) {
            this._schema = event.schema;
            return;
        }

        if (event instanceof FormStatusChangedEvent) {
            if (this._lastValid == null || this._lastValid !== event.form.valid) {
                this._lastValid = event.form.valid;
                this._validSubject.next(event.form.valid);
            }

            return;
        }
    }
}
