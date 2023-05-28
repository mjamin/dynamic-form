/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * A schema for a dynamic form.
 */
export interface MjDynamicFormSchema {
    /**
     * The title of the form.
     */
    title?: string;

    /**
     * The tabs of the form.
     */
    tabs: MjDynamicFormSchemaTab[];
}

/**
 * A tab in a dynamic form schema.
 */
export interface MjDynamicFormSchemaTab {
    /**
     * The id of the tab.
     */
    id: string;

    /**
     * The label of the tab.
     */
    label?: string;

    /**
     * The fieldsets of the tab.
     */
    fieldsets: MjDynamicFormSchemaFieldset[];
}

/**
 * A fieldset in a dynamic form schema.
 */
export interface MjDynamicFormSchemaFieldset {
    /**
     * The label of the fieldset.
     */
    label?: string;

    /**
     * The fields of the fieldset.
     */
    fields: MjDynamicFormSchemaField[];
}

/**
 * A field in a dynamic form schema.
 */
export interface MjDynamicFormSchemaField {
    /**
     * The id of the field.
     */
    id: string;

    /**
     * The label of the field.
     */
    label: string;

    /**
     * The placeholder text of the field.
     */
    placeholder?: string;

    /**
     * The hint text of the field.
     */
    hint?: string;

    /**
     * The component type string of the field.
     */
    type: string;

    /**
     * The validators of the field.
     */
    validators?: {[key: string]: boolean | {[key: string]: any}};

    /**
     * Whether the field is required.
     */
    readonly?: boolean;

    /**
     * The data of the field.
     */
    data?: any;

    /**
     * The configuration of the field.
     */
    config?: any;

    /**
     * The default value of the field.
     */
    defaultValue?: any;

    /**
     * The width of the field.
     */
    width?: number;

    /**
     * The total width of the fieldset.
     */
    space?: number;
}
