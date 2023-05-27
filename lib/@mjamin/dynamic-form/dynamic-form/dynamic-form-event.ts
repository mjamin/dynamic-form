import { MjDynamicFormSchema } from "./dynamic-form-schema";

import { UntypedFormGroup } from "@angular/forms";

export class DynamicFormEvent {
    constructor(public form: UntypedFormGroup) { }
}

export class FormValueChangedEvent extends DynamicFormEvent {
    constructor(public override form: UntypedFormGroup) { super(form); }
}

export class FormSchemaChangedEvent extends DynamicFormEvent {
    constructor(public override form: UntypedFormGroup, public schema: MjDynamicFormSchema) { super(form); }
}

export class FormStatusChangedEvent extends DynamicFormEvent {
    constructor(public override form: UntypedFormGroup) { super(form); }
}

export class FormInitializedEvent extends DynamicFormEvent {
    constructor(public override form: UntypedFormGroup) { super(form); }
}
