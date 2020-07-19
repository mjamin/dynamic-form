export const FORM_JSON_SCHEMA = {
    $schema: "http://json-schema.org/draft-07/schema",
    $id: "http://example.com/example.json",
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
            $id: "#/properties/title",
            type: "string",
            title: "The title of the form.",
            default: ""
        },
        tabs: {
            $id: "#/properties/tabs",
            type: "array",
            title: "This form's tabs.",
            default: [],
            additionalItems: true,
            items: {
                anyOf: [
                    {
                        $id: "#/properties/tabs/items/anyOf/0",
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
                                $id: "#/properties/tabs/items/anyOf/0/properties/id",
                                type: "string",
                                title: "The tab id",
                                description: "Required to track the selected tab.",
                                default: ""
                            },
                            label: {
                                $id: "#/properties/tabs/items/anyOf/0/properties/label",
                                type: "string",
                                title: "This tab's label",
                                default: ""
                            },
                            fieldsets: {
                                $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets",
                                type: "array",
                                title: "The fieldsets of this tab",
                                default: [],
                                additionalItems: true,
                                items: {
                                    anyOf: [
                                        {
                                            $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items/anyOf/0",
                                            type: "object",
                                            title: "A form fieldsets",
                                            default: {},
                                            required: [
                                                "id",
                                                "fields"
                                            ],
                                            additionalProperties: true,
                                            properties: {
                                                label: {
                                                    $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items/anyOf/0/properties/label",
                                                    type: "string",
                                                    title: "This fieldset's label",
                                                    default: ""
                                                },
                                                fields: {
                                                    $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items/anyOf/0/properties/fields",
                                                    type: "array",
                                                    title: "The fields of this fieldset",
                                                    default: [],
                                                    additionalItems: true,
                                                    items: {
                                                        anyOf: [
                                                            {
                                                                $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items/anyOf/0/properties/fields/items/anyOf/0",
                                                                type: "object",
                                                                title: "A form field",
                                                                default: {},
                                                                required: [
                                                                    "id",
                                                                    "type"
                                                                ],
                                                                additionalProperties: true,
                                                                properties: {
                                                                    id: {
                                                                        $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items/anyOf/0/properties/fields/items/anyOf/0/properties/id",
                                                                        type: "string",
                                                                        title: "The id of this form field",
                                                                        description: "Required to map this field to a form control.",
                                                                        default: ""
                                                                    },
                                                                    label: {
                                                                        $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items/anyOf/0/properties/fields/items/anyOf/0/properties/label",
                                                                        type: "string",
                                                                        title: "This field's label",
                                                                        default: ""
                                                                    },
                                                                    description: {
                                                                        $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items/anyOf/0/properties/fields/items/anyOf/0/properties/description",
                                                                        type: "string",
                                                                        title: "This field's description",
                                                                        default: ""
                                                                    },
                                                                    defaultValue: {
                                                                        $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items/anyOf/0/properties/fields/items/anyOf/0/properties/description",
                                                                        title: "This field's default value",
                                                                        default: ""
                                                                    },
                                                                    placeholder: {
                                                                        $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items/anyOf/0/properties/fields/items/anyOf/0/properties/placeholder",
                                                                        type: "string",
                                                                        title: "This field's placeholder text",
                                                                        default: ""
                                                                    },
                                                                    hint: {
                                                                        $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items/anyOf/0/properties/fields/items/anyOf/0/properties/hint",
                                                                        type: "string",
                                                                        title: "This field's hint text",
                                                                        default: ""
                                                                    },
                                                                    readonly: {
                                                                        $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items/anyOf/0/properties/fields/items/anyOf/0/properties/readonly",
                                                                        type: "boolean",
                                                                        title: "Specifies wether or not this field is readonly",
                                                                        default: false
                                                                    },
                                                                    type: {
                                                                        $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items/anyOf/0/properties/fields/items/anyOf/0/properties/type",
                                                                        type: "string",
                                                                        title: "The type of this form field",
                                                                        enum: ["text", "textarea", "radio", "checkbox", "select"],
                                                                        default: "text"
                                                                    },
                                                                    data: {
                                                                        $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items/anyOf/0/properties/fields/items/anyOf/0/properties/data",
                                                                        type: "object",
                                                                        title: "Additional field specific data",
                                                                        default: {}
                                                                    },
                                                                    config: {
                                                                        $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items/anyOf/0/properties/fields/items/anyOf/0/properties/config",
                                                                        type: "object",
                                                                        title: "This field's configuration data",
                                                                        default: {}
                                                                    },
                                                                    validators: {
                                                                        $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items/anyOf/0/properties/fields/items/anyOf/0/properties/validators",
                                                                        type: "object",
                                                                        title: "The validators for this form field",
                                                                        default: {},
                                                                        additionalProperties: true,
                                                                        properties: {
                                                                            required: {
                                                                                $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items/anyOf/0/properties/fields/items/anyOf/0/properties/validators/properties/required",
                                                                                type: "boolean",
                                                                                title: "The 'required' validator",
                                                                                description: "Marks this field as required.",
                                                                                default: false
                                                                            },
                                                                            requiredTrue: {
                                                                                $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items/anyOf/0/properties/fields/items/anyOf/0/properties/validators/properties/requiredTrue",
                                                                                type: "boolean",
                                                                                title: "The 'requiredTrue' validator",
                                                                                description: "Validates that this form field's value equals true.",
                                                                                default: false
                                                                            },
                                                                            minlength: {
                                                                                $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items/anyOf/0/properties/fields/items/anyOf/0/properties/validators/properties/minlength",
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
                                                                                        $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items/anyOf/0/properties/fields/items/anyOf/0/properties/validators/properties/minlength/properties/length",
                                                                                        type: "integer",
                                                                                        title: "The required length value to validate",
                                                                                        default: 0
                                                                                    }
                                                                                }
                                                                            },
                                                                            maxlength: {
                                                                                $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items/anyOf/0/properties/fields/items/anyOf/0/properties/validators/properties/minlength",
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
                                                                                        $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items/anyOf/0/properties/fields/items/anyOf/0/properties/validators/properties/minlength/properties/length",
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
                                                        ],
                                                        $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items/anyOf/0/properties/fields/items"
                                                    }
                                                }
                                            }
                                        }
                                    ],
                                    $id: "#/properties/tabs/items/anyOf/0/properties/fieldsets/items"
                                }
                            }
                        }
                    }
                ],
                $id: "#/properties/tabs/items"
            }
        }
    }
};
