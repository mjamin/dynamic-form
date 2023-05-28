import { Provider, Self, Type } from "@angular/core";
import { FormGroupDirective } from "@angular/forms";
import { MjDynamicFormBase } from "./dynamic-form-base";

/**
 * A factory for a form group directive.
 * 
 * @param formComponent The form component.
 * @returns The form group directive.
 */
export function FORM_GROUP_DIRECTIVE_FACTORY(formComponent: MjDynamicFormBase): FormGroupDirective {
    return formComponent.formGroupDirective;
}

/**
 * Provides a form group directive.
 * 
 * @param providingType The providing type.
 * @returns The provider.
 */
export function provideFormGroupDirective<T>(providingType: Type<T>): Provider {
    return { provide: FormGroupDirective, useFactory: FORM_GROUP_DIRECTIVE_FACTORY, deps: [[new Self(), providingType]] };
}
