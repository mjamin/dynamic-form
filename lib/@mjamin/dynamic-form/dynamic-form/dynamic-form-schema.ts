export interface DynamicFormSchema {
    title?: string;
    tabs: DynamicFormSchemaTab[];
}

export interface DynamicFormSchemaTab {
    id: string;
    label?: string;
    fieldsets: DynamicFormSchemaFieldset[];
}

export interface DynamicFormSchemaFieldset {
    label?: string;
    fields: DynamicFormSchemaField[];
}

export interface DynamicFormSchemaField {
    id: string;
    label: string;
    description?: string;
    placeholder?: string;
    hint?: string;
    type: string;
    validators?: {[key: string]: boolean | {[key: string]: any}};
    readonly?: boolean;
    data?: any;
    config?: any;
    defaultValue?: any;
}
