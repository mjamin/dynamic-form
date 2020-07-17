import { DynamicFormSchema } from "./dynamic-form-schema";

import { FormGroup } from "@angular/forms";

export class DynamicFormEvent {
    constructor(public form: FormGroup) { }
}

export class FormValueChangedEvent extends DynamicFormEvent {
    constructor(public form: FormGroup) { super(form); }
}

export class FormSchemaChangedEvent extends DynamicFormEvent {
    constructor(public form: FormGroup, public schema: DynamicFormSchema) { super(form); }
}

export class FormStatusChangedEvent extends DynamicFormEvent {
    constructor(public form: FormGroup) { super(form); }
}
