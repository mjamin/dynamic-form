import { FormGroupDirective } from "@angular/forms";
import { Provider, Type, Self } from "@angular/core";

import { DynamicFormBase } from "./dynamic-form-base";

export function FORM_GROUP_DIRECTIVE_FACTORY(formComponent: DynamicFormBase): FormGroupDirective {
    return formComponent.formGroupDirective;
}

export function provideFormGroupDirective(providingType: Type<any>): Provider {
    return { provide: FormGroupDirective, useFactory: FORM_GROUP_DIRECTIVE_FACTORY, deps: [[new Self(), providingType]] };
}
