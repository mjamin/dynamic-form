import { Directive, ViewChild } from "@angular/core";
import { FormControlName, UntypedFormControl, UntypedFormGroup } from "@angular/forms";

import { MjDynamicFormSchemaField } from "./dynamic-form-schema";

/**
 * A base class for dynamic form widgets.
 */
@Directive()
export abstract class MjDynamicFormWidgetBase {
    private _form: UntypedFormGroup;
    private _control: UntypedFormControl;
    private _fieldAccessor: () => MjDynamicFormSchemaField;

    /**
     * The FormControlName directive.
     */
    @ViewChild(FormControlName, { static: false }) formControlName: FormControlName;

    /**
     * Wether the label is visible.
     */
    get labelVisible(): boolean {
        return !!this.field.label;
    }

    /**
     * The field to render.
     */
    get field(): MjDynamicFormSchemaField {
        return this._fieldAccessor();
    }

    /**
     * Wether the field is required.
     */
    get required(): boolean {
        return this.field.validators && this.field.validators["required"] === true;
    }

    /**
     * The form control.
     */
    get control(): UntypedFormControl {
        return this._control;
    }

    /**
     * The form.
     */
    get form(): UntypedFormGroup {
        return this._form;
    }

    /**
     * The error message.
     */
    get error(): string {
        // TODO: get messages from DynamicFormModule.forRoot({ ... }) config "localization.validation"

        if (this._control.hasError("required")) {
            return "This field is required.";
        }

        if (this._control.hasError("minlength")) {
            const missing = this._control.errors["minlength"].requiredLength - this._control.errors["minlength"].actualLength;
            return `Requires at least ${missing === 1 ? "one more charachter" : `${missing} more characters`}.`;
        }

        if (this._control.hasError("maxlength")) {
            return `A maximum of ${this._control.errors["maxlength"].requiredLength} characters are allowed.`;
        }

        return "Something went wrong.";
    }

    /** @internal */
    _setFieldAccessor(fieldAccessor: () => MjDynamicFormSchemaField): void {
        this._fieldAccessor = fieldAccessor;
    }

    /** @internal */
    _setForm(form: UntypedFormGroup): void {
        this._form = form;
        this._control = form.get(this.field.id) as UntypedFormControl;
    }
}
