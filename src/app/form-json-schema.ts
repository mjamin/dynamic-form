export const FORM_JSON_SCHEMA = {
    $schema: "http://json-schema.org/draft-07/schema",
    $id: "http://example.com/example.json",
    definitions: {
        field: {
            type: "object",
            title: "A form field",
            default: {},
            required: [
                "id",
                "type"
            ],
            additionalProperties: false,
            properties: {
                id: {
                    type: "string",
                    title: "The id of this form field",
                    default: "field-"
                },
                label: {
                    type: "string",
                    title: "This field's label",
                    default: "New field"
                },
                defaultValue: {
                    title: "This field's default value",
                    default: ""
                },
                placeholder: {
                    type: "string",
                    title: "This field's placeholder text",
                    default: ""
                },
                hint: {
                    type: "string",
                    title: "This field's hint text",
                    default: ""
                },
                readonly: {
                    type: "boolean",
                    title: "Specifies wether or not this field is readonly",
                    default: false
                },
                type: {
                    type: "string",
                    title: "The type of this form field",
                    enum: ["text", "textarea", "radio", "checkbox", "select", "html"],
                    default: "text"
                },
                data: {
                    type: "object",
                    title: "Additional field specific data",
                    default: {}
                },
                config: {
                    type: "object",
                    title: "This field's configuration data",
                    default: {}
                },
                width: {
                    type: "number",
                    title: "This field's width in percent",
                    default: 100
                },
                space: {
                    type: "number",
                    title: "This field's total width in percent",
                    default: 100
                },
                validators: {
                    type: "object",
                    title: "The validators for this form field",
                    default: {},
                    additionalProperties: true,
                    properties: {
                        required: {
                            type: "boolean",
                            title: "The 'required' validator",
                            description: "Marks this field as required.",
                            default: false
                        },
                        requiredTrue: {
                            type: "boolean",
                            title: "The 'requiredTrue' validator",
                            description: "Validates that this form field's value equals true.",
                            default: false
                        },
                        minlength: {
                            type: "object",
                            title: "The 'minlength' validator",
                            description: "Validates that this form field has at least the configured amount of characters.",
                            default: {},
                            required: [
                                "length"
                            ],
                            additionalProperties: true,
                            properties: {
                                length: {
                                    type: "integer",
                                    title: "The required length value to validate",
                                    default: 0
                                }
                            }
                        },
                        maxlength: {
                            type: "object",
                            title: "The 'maxlength' validator",
                            description: "Validates that this form field has at most the configured amount of characters.",
                            default: {},
                            required: [
                                "length"
                            ],
                            additionalProperties: true,
                            properties: {
                                length: {
                                    type: "integer",
                                    title: "The required length value to validate",
                                    default: 0
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    type: "object",
    title: "The root schema",
    description: "The root schema comprises the entire JSON document.",
    default: {},
    required: [
        "tabs"
    ],
    additionalProperties: true,
    properties: {
        title: {
            type: "string",
            title: "The title of the form.",
            default: "New form"
        },
        tabs: {
            type: "array",
            title: "This form's tabs.",
            default: [],
            additionalItems: true,
            items: {
                anyOf: [
                    {
                        type: "object",
                        title: "A form tab",
                        default: {},
                        required: [
                            "id",
                            "fieldsets"
                        ],
                        additionalProperties: true,
                        properties: {
                            id: {
                                type: "string",
                                title: "The tab id",
                                default: "tab-"
                            },
                            label: {
                                type: "string",
                                title: "This tab's label",
                                default: "New tab"
                            },
                            fieldsets: {
                                type: "array",
                                title: "The fieldsets of this tab",
                                default: [],
                                additionalItems: true,
                                items: {
                                    anyOf: [
                                        {
                                            type: "object",
                                            title: "A form fieldsets",
                                            default: {},
                                            required: [
                                                "id",
                                                "fields"
                                            ],
                                            additionalProperties: true,
                                            properties: {
                                                id: {
                                                    type: "string",
                                                    title: "The fieldset id",
                                                    default: "fieldset-"
                                                },
                                                label: {
                                                    type: "string",
                                                    title: "This fieldset's label",
                                                    default: ""
                                                },
                                                fields: {
                                                    type: "array",
                                                    title: "The fields of this fieldset",
                                                    default: [],
                                                    additionalItems: true,
                                                    items: {
                                                        anyOf: [
                                                            {
                                                                $ref: "#/definitions/field"
                                                            },
                                                            {
                                                                type: "array",
                                                                title: "The fields of this fieldset",
                                                                default: [],
                                                                additionalItems: true,
                                                                items: {
                                                                    anyOf: [
                                                                        {
                                                                            $ref: "#/definitions/field"
                                                                        }
                                                                    ],
                                                                }
                                                            }
                                                        ],
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                ]
            }
        }
    }
};
