export interface MjDynamicFormSchema {
    title?: string;
    tabs: MjDynamicFormSchemaTab[];
}

export interface MjDynamicFormSchemaTab {
    id: string;
    label?: string;
    fieldsets: MjDynamicFormSchemaFieldset[];
}

export interface MjDynamicFormSchemaFieldset {
    label?: string;
    fields: MjDynamicFormSchemaField[];
}

export interface MjDynamicFormSchemaField {
    id: string;
    label: string;
    placeholder?: string;
    hint?: string;
    type: string;
    validators?: {[key: string]: boolean | {[key: string]: any}};
    readonly?: boolean;
    data?: any;
    config?: any;
    defaultValue?: any;
    width?: number;
    space?: number;
}
