export const DEFAULT_FORM = JSON.stringify({
    label: "An example form",
    tabs: [
        {
            id: "tab-1",
            label: "First Tab",
            fieldsets: [
                {
                    id: "fieldset-1",
                    label: "Personal information",
                    fields: [
                        {
                            id: "firstname",
                            label: "First name",
                            placeholder: "John",
                            type: "text",
                            validators: {
                                required: true,
                                minlength: {
                                    length: 2
                                }
                            }
                        },
                        {
                            id: "lastname",
                            label: "Last name",
                            type: "text",
                            placeholder: "Doe",
                            validators: {
                                required: true,
                                minlength: {
                                    length: 2
                                }
                            }
                        },
                        {
                            id: "about",
                            label: "About me",
                            type: "textarea",
                            placeholder: "I like turtles."
                        }
                    ]
                },
                {
                    id: "fieldset-2",
                    label: "Preferences",
                    fields: [
                        {
                            id: "radiogroup",
                            label: "A couple options",
                            type: "radio",
                            placeholder: "Test",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "A",
                                        value: 1
                                    },
                                    {
                                        label: "B",
                                        value: 2
                                    },
                                    {
                                        label: "C",
                                        value: 3
                                    }
                                ]
                            }
                        },
                        {
                            id: "checkbox",
                            label: "A checkbox group",
                            type: "checkbox",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "One",
                                        value: 1
                                    },
                                    {
                                        label: "Two",
                                        value: 2
                                    },
                                    {
                                        label: "Three",
                                        value: 3
                                    }
                                ]
                            }
                        },
                        {
                            id: "select",
                            label: "A select",
                            type: "select",
                            defaultValue: 2,
                            config: {
                                options: [
                                    {
                                        label: "A non-default select option",
                                        value: 1
                                    },
                                    {
                                        label: "A default select option",
                                        value: 2
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: "tab-2",
            label: "Second Tab",
            fieldsets: [
                {
                    id: "fieldset-3",
                    label: "More checkboxes",
                    fields: [
                        {
                            id: "checkbox-2",
                            label: "Another checkbox group",
                            type: "checkbox",
                            config: {
                                optionColumns: 1,
                                options: [
                                    {
                                        label: "Vertical option 1",
                                        value: 1
                                    },
                                    {
                                        label: "Vertical option 2",
                                        value: 2
                                    },
                                    {
                                        label: "Vertical option 3",
                                        value: 3
                                    }
                                ]
                            }
                        },
                        {
                            id: "checkbox-3",
                            label: "I have acknowledged that this checkbox has a simplified json definition and is centered vertically within this label-less box.",
                            hint: "It also has a non-standard required marker!",
                            type: "checkbox",
                            validators: {
                                required: true
                            }
                        }
                    ]
                }
            ]
        }
    ]
}, null, 4);
