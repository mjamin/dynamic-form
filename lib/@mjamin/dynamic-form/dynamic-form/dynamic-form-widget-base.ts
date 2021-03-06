import { ViewChild, Directive } from "@angular/core";
import { FormGroup, FormControl, FormControlName } from "@angular/forms";

import { MjDynamicFormSchemaField } from "./dynamic-form-schema";

@Directive()
export abstract class MjDynamicFormWidgetBase {
    private _form: FormGroup;
    private _control: FormControl;
    private _fieldAccessor: () => MjDynamicFormSchemaField;

    @ViewChild(FormControlName, { static: false }) formControlName: FormControlName;

    get labelVisible(): boolean {
        return !!this.field.label;
    }

    get field(): MjDynamicFormSchemaField {
        return this._fieldAccessor();
    }

    get required(): boolean {
        return this.field.validators && this.field.validators.required === true;
    }

    get control(): FormControl {
        return this._control;
    }

    get form(): FormGroup {
        return this._form;
    }

    get error(): string {
        // TODO: get messages from DynamicFormModule.forRoot({ ... }) config "localization.validation"

        if (this._control.hasError("required")) {
            return "This field is required.";
        }

        if (this._control.hasError("minlength")) {
            const missing = this._control.errors.minlength.requiredLength - this._control.errors.minlength.actualLength;
            return `Requires at least ${missing === 1 ? "one more charachter" : `${missing} more characters`}.`;
        }

        if (this._control.hasError("maxlength")) {
            return `A maximum of ${this._control.errors.maxlength.requiredLength} characters are allowed.`;
        }

        return "Something went wrong.";
    }

    /** @internal */
    _setFieldAccessor(fieldAccessor: () => MjDynamicFormSchemaField): void {
        this._fieldAccessor = fieldAccessor;
    }

    /** @internal */
    _setForm(form: FormGroup): void {
        this._form = form;
        this._control = form.get(this.field.id) as FormControl;
    }
}
