import { Subscription, Observable, ReplaySubject } from "rxjs";
import { tap, map } from "rxjs/operators";

import { DynamicFormRef } from "./dynamic-form-ref";
import { MjDynamicFormSchema } from "./dynamic-form-schema";
import { FormValueChangedEvent, FormSchemaChangedEvent, FormStatusChangedEvent, DynamicFormEvent } from "./dynamic-form-event";

export class MjDynamicFormController {
    private _attached: boolean;
    private _formRef: DynamicFormRef;
    private _formEventsSubscription: Subscription;
    private _schema: MjDynamicFormSchema;
    private _values: {[key: string]: any};
    private _validSubject = new ReplaySubject<boolean>(1);
    private _valuesSubject = new ReplaySubject<{[key: string]: any}>(1);
    private _schemaSubject = new ReplaySubject<MjDynamicFormSchema>(1);

    get title(): Observable<string> {
        return this._schemaSubject.asObservable().pipe(map(s => s.title));
    }

    get values(): Observable<{[key: string]: any}> {
        return this._valuesSubject.asObservable();
    }

    get valid(): Observable<boolean> {
        return this._validSubject.asObservable();
    }

    setValues(values: {[key: string]: any}): void {
        this._values = values;

        if (this._attached) {
            this._formRef.setValues(values, false);
        }

        this._valuesSubject.next(values);
    }

    setSchema(schema: MjDynamicFormSchema): void {
        this._schema = schema;

        if (this._attached) {
            this._formRef.setSchema(schema, false);
        }

        this._schemaSubject.next(schema);
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
            this._valuesSubject.next(event.form.value);
            return;
        }

        if (event instanceof FormSchemaChangedEvent) {
            this._schema = event.schema;
            this._schemaSubject.next(event.schema);
            return;
        }

        if (event instanceof FormStatusChangedEvent) {
            this._validSubject.next(event.form.valid);
            return;
        }
    }
}
