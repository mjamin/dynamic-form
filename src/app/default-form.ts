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
                                required: false
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
                            label: "A checkbox",
                            type: "checkbox"
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
                    label: "Yet another checkbox",
                    fields: [
                        {
                            id: "checkbox",
                            label: "Checkbox No. 2",
                            type: "checkbox"
                        }
                    ]
                }
            ]
        }
    ]
}, null, 4);
