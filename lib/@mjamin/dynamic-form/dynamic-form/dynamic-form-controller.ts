import { Subscription } from "rxjs";
import { tap } from "rxjs/operators";

import { DynamicFormRef } from "./dynamic-form-ref";
import { DynamicFormSchema } from "./dynamic-form-schema";

export class DynamicFormController {
    private _attached: boolean;
    private _formRef: DynamicFormRef;
    private _formEventsSubscription: Subscription;
    private _schema: DynamicFormSchema;
    private _values: {[key: string]: any};

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
                // FormValuesChangedEvent -> update this._values
                // FormSchemaChangedEvent -> update this._schema
                // console.log("form event", e);
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
}
