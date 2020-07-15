export const DEFAULT_FORM = JSON.stringify({
    label: "An example form",
    tabs: [
        {
            id: "tab-1",
            label: "First Tab",
            fieldsets: [
                {
                    label: "Personal information",
                    fields: [
                        {
                            id: "firstname",
                            label: "First name",
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
                            hint: "Who are you? What are you about?"
                        }
                    ]
                },
                {
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
                                        label: "Option 1",
                                        value: 1
                                    },
                                    {
                                        label: "Option 2",
                                        value: 2
                                    },
                                    {
                                        label: "Option 3",
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
                                        label: "Option 1",
                                        value: 1
                                    },
                                    {
                                        label: "Option 2",
                                        value: 2
                                    },
                                    {
                                        label: "Option 3",
                                        value: 3
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
                    label: "More checkboxes",
                    fields: [
                        {
                            id: "checkbox-2",
                            label: "Checkbox No. 2",
                            type: "checkbox",
                            config: {
                                options: [
                                    {
                                        label: "Option 1",
                                        value: 1
                                    },
                                    {
                                        label: "Option 2",
                                        value: 2
                                    },
                                    {
                                        label: "Option 3",
                                        value: 3
                                    }
                                ]
                            }
                        },
                        {
                            id: "checkbox-3",
                            label: "I totally agree to everything in the Terms and Conditions that I have not read.",
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
