/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, ReplaySubject, Subscription } from "rxjs";
import { map, tap } from "rxjs/operators";

import { DynamicFormEvent, FormInitializedEvent, FormSchemaChangedEvent, FormStatusChangedEvent, FormValueChangedEvent } from "./dynamic-form-event";
import { DynamicFormRef } from "./dynamic-form-ref";
import { MjDynamicFormSchema } from "./dynamic-form-schema";

/**
 * A controller for dynamic forms.
 */
export class MjDynamicFormController {
    private _attached: boolean;
    private _formRef: DynamicFormRef;
    private _formEventsSubscription: Subscription;
    private _schema: MjDynamicFormSchema;
    private _values: {[key: string]: any};
    private _validSubject = new ReplaySubject<boolean>(1);
    private _valuesSubject = new ReplaySubject<{[key: string]: any}>(1);
    private _schemaSubject = new ReplaySubject<MjDynamicFormSchema>(1);

    /**
     * The title of the form.
     */
    get title(): Observable<string> {
        return this._schemaSubject.asObservable().pipe(map(s => s.title));
    }

    /**
     * An observable of the values.
     */
    get values(): Observable<{[key: string]: any}> {
        return this._valuesSubject.asObservable();
    }

    /**
     * An observable of the valid state.
     */
    get valid(): Observable<boolean> {
        return this._validSubject.asObservable();
    }

    /**
     * Submits the form.
     * 
     * @param event The event.
     */
    submit(event: Event): void {
        this._formRef.submit(event);
    }

    /**
     * Resets the form.
     */
    reset(): void {
        this._formRef.reset();
    }

    /**
     * Sets the values.
     * 
     * @param values The values.
     */
    setValues(values: {[key: string]: any}): void {
        this._values = values;

        if (this._attached) {
            this._formRef.setValues(values);
        }
    }

    /**
     * Sets the schema.
     * 
     * @param schema The schema.
     */
    setSchema(schema: MjDynamicFormSchema): void {
        this._schema = schema;

        if (this._attached) {
            this._formRef.setSchema(schema);
        }
    }

    /**
     * Attaches the controller to a form.
     * 
     * @param form The form.
     */
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

    /**
     * Detaches the controller from the form.
     */
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

        if (event instanceof FormInitializedEvent) {
            this._validSubject.next(event.form.valid);
            this._valuesSubject.next(event.form.value);
        }
    }
}
