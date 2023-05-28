import { UntypedFormGroup } from "@angular/forms";
import { MjDynamicFormSchema } from "./dynamic-form-schema";

/**
 * A base class for dynamic form events.
 */
export class DynamicFormEvent {
    /**
     * Creates a new instance of DynamicFormEvent.
     * 
     * @param form The form group.
     */
    constructor(
        /**
         * The form group.
         */
        public form: UntypedFormGroup
    ) { }
}

/**
 * An event that is emitted when the form's value changes.
 */
export class FormValueChangedEvent extends DynamicFormEvent {
    /**
     * Creates a new instance of FormValueChangedEvent.
     * 
     * @param form The form group.
     */
    constructor(
        /**
         * The form group.
         */
        public override form: UntypedFormGroup
    ) {
        super(form); 
    }
}

/**
 * An event that is emitted when the form's schema changes.
 */
export class FormSchemaChangedEvent extends DynamicFormEvent {
    /**
     * Creates a new instance of FormSchemaChangedEvent.
     * 
     * @param form The form group.
     * @param schema The new schema.
     */
    constructor(
        /**
         * The form group.
         */
        public override form: UntypedFormGroup,
        /**
         * The new schema.
         */
        public schema: MjDynamicFormSchema
    ) {
        super(form);
    }
}

/**
 * An event that is emitted when the form's status changes.
 */
export class FormStatusChangedEvent extends DynamicFormEvent {
    /**
     * Creates a new instance of FormStatusChangedEvent.
     * 
     * @param form The form group.
     */
    constructor(
        /**
         * The form group.
         */
        public override form: UntypedFormGroup
    ) {
        super(form);
    }
}

/**
 * An event that is emitted when the form is initialized.
 */
export class FormInitializedEvent extends DynamicFormEvent {
    /**
     * Creates a new instance of FormInitializedEvent.
     * 
     * @param form The form group.
     */
    constructor(
        /**
         * The form group.
         */
        public override form: UntypedFormGroup
    ) {
        super(form);
    }
}
