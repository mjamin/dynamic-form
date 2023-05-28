import { Provider, Self, Type } from "@angular/core";
import { FormGroupDirective } from "@angular/forms";

import { MjDynamicFormBase } from "./dynamic-form-base";

export function FORM_GROUP_DIRECTIVE_FACTORY(formComponent: MjDynamicFormBase): FormGroupDirective {
    return formComponent.formGroupDirective;
}

export function provideFormGroupDirective<T>(providingType: Type<T>): Provider {
    return { provide: FormGroupDirective, useFactory: FORM_GROUP_DIRECTIVE_FACTORY, deps: [[new Self(), providingType]] };
}
