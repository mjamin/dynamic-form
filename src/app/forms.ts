export const EMPTY_FORM = JSON.stringify({
    title: "New form",
    tabs: [ ]
}, null, 4);

export const EXAMPLE_FORM = JSON.stringify({
    title: "The XKCD Survey",
    tabs: [
        {
            id: "tab-1",
            label: "Questions 1-18",
            fieldsets: [
                {
                    id: "tab-1-fieldset-1",
                    label: "Questions 1-18",
                    fields: [
                        {
                            id: "q01",
                            label: "1. Have you ever been in a plane?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "Yes",
                                        value: 1
                                    },
                                    {
                                        label: "No",
                                        value: 2
                                    }
                                ]
                            }
                        },
                        {
                            id: "q02",
                            label: "2. Have you ever been skydiving?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "Yes",
                                        value: 1
                                    },
                                    {
                                        label: "No, but I might someday",
                                        value: 2
                                    },
                                    {
                                        label: "No",
                                        value: 3
                                    }
                                ]
                            }
                        },
                        {
                            id: "q03",
                            label: "3. When you first saw The Dress, what color was it?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                optionColumns: 1,
                                options: [
                                    {
                                        label: "White and gold",
                                        value: 1
                                    },
                                    {
                                        label: "Blue and black",
                                        value: 2
                                    },
                                    {
                                        label: "I don't remember",
                                        value: 3
                                    },
                                    {
                                        label: "A color combination not listed here",
                                        value: 4
                                    },
                                    {
                                        label: "What dress?",
                                        value: 5
                                    }
                                ]
                            }
                        },
                        {
                            id: "q04",
                            label: "4. What's a really popular food that you don't like?",
                            type: "text",
                            validators: {
                                required: true
                            },
                            config: {
                                appearance: "fill"
                            }
                        },
                        {
                            id: "q05",
                            label: "5. When you look at a blue sky, do you see those swirly floaters in your vision?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                optionColumns: 1,
                                options: [
                                    {
                                        label: "Yes, constantly",
                                        value: 1
                                    },
                                    {
                                        label: "Yes, occasionally",
                                        value: 2
                                    },
                                    {
                                        label: "No",
                                        value: 3
                                    },
                                    {
                                        label: "I'm not sure what things you mean",
                                        value: 4
                                    }
                                ]
                            }
                        },
                        {
                            id: "q06",
                            label: "6. Have you ever had a car run out of gas while you were driving it?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "Yes",
                                        value: 1
                                    },
                                    {
                                        label: "No",
                                        value: 2
                                    }
                                ]
                            }
                        },
                        {
                            id: "q07",
                            label: "7. Name the first five animals you can think of",
                            type: "textarea",
                            validators: {
                                required: true
                            },
                            config: {
                                appearance: "fill"
                            }
                        },
                        {
                            id: "q08",
                            label: "8. What's the weather like where you are right now?",
                            type: "text",
                            validators: {
                                required: true
                            },
                            config: {
                                appearance: "fill"
                            }
                        },
                        {
                            id: "q09",
                            label: "9. Which of these can you do reasonably well? (Check all that apply)",
                            type: "checkbox",
                            validators: {
                                required: true
                            },
                            config: {
                                optionColumns: 3,
                                options: [
                                    {
                                        label: "Dunk a basketball",
                                        value: 1
                                    },
                                    {
                                        label: "Tie a sheet bend or bowline",
                                        value: 2
                                    },
                                    {
                                        label: "Roller skate",
                                        value: 3
                                    },
                                    {
                                        label: "Run in high heels",
                                        value: 4
                                    },
                                    {
                                        label: "Drive a stick shift ",
                                        value: 5
                                    },
                                    {
                                        label: "Solve a Rubik's cube",
                                        value: 6
                                    },
                                    {
                                        label: "Dive headfirst off a diving board",
                                        value: 7
                                    },
                                    {
                                        label: "Ice skate",
                                        value: 8
                                    },
                                    {
                                        label: "Skateboard",
                                        value: 9
                                    },
                                    {
                                        label: "Walk on stilts",
                                        value: 10
                                    },
                                    {
                                        label: "Ski",
                                        value: 11
                                    },
                                    {
                                        label: "Cut vegetables with a knife",
                                        value: 12
                                    },
                                    {
                                        label: "Swim",
                                        value: 13
                                    },
                                    {
                                        label: "Ride a horse",
                                        value: 14
                                    },
                                    {
                                        label: "Unicycle",
                                        value: 15
                                    },
                                    {
                                        label: "Change the oil on a car",
                                        value: 16
                                    },
                                    {
                                        label: "Do a back handspring",
                                        value: 17
                                    },
                                    {
                                        label: "Juggle",
                                        value: 18
                                    }
                                ]
                            }
                        },
                        {
                            id: "q10",
                            label: "10. What word can you never seem to spell on the first try?",
                            type: "text",
                            validators: {
                                required: true
                            },
                            config: {
                                appearance: "fill"
                            }
                        },
                        {
                            id: "q11",
                            label: "11. Do you eat condiments directly out of the fridge as a snack?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "Yes",
                                        value: 1
                                    },
                                    {
                                        label: "No",
                                        value: 2
                                    }
                                ]
                            }
                        },
                        {
                            id: "q12",
                            label: "12. When you adjust a thermostat that was set by someone else, it's usually because you want the room to be...",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "Cooler",
                                        value: 1
                                    },
                                    {
                                        label: "Warmer",
                                        value: 2
                                    }
                                ]
                            }
                        },
                        {
                            id: "q13",
                            validators: {
                                required: true
                            },
                            label: "13. What color is the shirt/dress/upper-body-clothing you're wearing right now, if any?",
                            type: "text"
                        },
                        {
                            id: "q14",
                            label: "14. Do you get colds often?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "Yes",
                                        value: 1
                                    },
                                    {
                                        label: "No",
                                        value: 2
                                    }
                                ]
                            }
                        },
                        {
                            id: "q15",
                            label: "15. Pick a number from 1 to 100",
                            type: "text",
                            validators: {
                                required: true
                            },
                            config: {
                                appearance: "fill"
                            }
                        },
                        {
                            id: "q16",
                            label: "16. On a scale of 1 to 10, how good at spelling are you?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "1",
                                        value: 1
                                    },
                                    {
                                        label: "2",
                                        value: 2
                                    },
                                    {
                                        label: "3",
                                        value: 3
                                    },
                                    {
                                        label: "4",
                                        value: 4
                                    },
                                    {
                                        label: "5",
                                        value: 5
                                    },
                                    {
                                        label: "6",
                                        value: 6
                                    },
                                    {
                                        label: "7",
                                        value: 7
                                    },
                                    {
                                        label: "8",
                                        value: 8
                                    },
                                    {
                                        label: "9",
                                        value: 9
                                    },
                                    {
                                        label: "10",
                                        value: 10
                                    }
                                ]
                            }
                        },
                        {
                            id: "q17",
                            label: "17. Do you know your Myers-Briggs type?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "Yes",
                                        value: 1
                                    },
                                    {
                                        label: "No",
                                        value: 2
                                    }
                                ]
                            }
                        },
                        {
                            id: "q18",
                            label: "18. Do you know your astrological sign?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "Yes",
                                        value: 1
                                    },
                                    {
                                        label: "No",
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
            label: "Questions 19-36",
            fieldsets: [
                {
                    id: "tab-2-fieldset-2",
                    label: "Questions 19-36",
                    fields: [
                        {
                            id: "q19",
                            label: "19. How many older siblings do you have?",
                            type: "text",
                            validators: {
                                required: true
                            },
                            config: {
                                appearance: "fill"
                            }
                        },
                        {
                            id: "q20",
                            label: "20. How many younger siblings do you have?",
                            type: "text",
                            validators: {
                                required: true
                            },
                            config: {
                                appearance: "fill"
                            }
                        },
                        {
                            id: "q21",
                            label: "21. How many twin/etc siblings do you have?",
                            type: "text",
                            validators: {
                                required: true
                            },
                            config: {
                                appearance: "fill"
                            }
                        },
                        {
                            id: "q22",
                            label: "22. Do you feel sleepy a lot?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "Yes",
                                        value: 1
                                    },
                                    {
                                        label: "No",
                                        value: 2
                                    }
                                ]
                            }
                        },
                        {
                            id: "q23",
                            label: "23. Name a movie star",
                            type: "text",
                            validators: {
                                required: true
                            },
                            config: {
                                appearance: "fill"
                            }
                        },
                        {
                            id: "q24",
                            label: "24. Do you spend a lot of time in the sun?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "Yes",
                                        value: 1
                                    },
                                    {
                                        label: "No",
                                        value: 2
                                    }
                                ]
                            }
                        },
                        {
                            id: "q25",
                            label: "25. Does broccoli taste bitter to you?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "Yes",
                                        value: 1
                                    },
                                    {
                                        label: "No",
                                        value: 2
                                    },
                                    {
                                        label: "I've never had it",
                                        value: 3
                                    }
                                ]
                            }
                        },
                        {
                            id: "q26",
                            label: "26. Do you regularly stay awake much later than you meant to?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "Yes",
                                        value: 1
                                    },
                                    {
                                        label: "No",
                                        value: 2
                                    }
                                ]
                            }
                        },
                        {
                            id: "q27",
                            label: "27. Fill this text box with gibberish by mashing random keyboard keys",
                            type: "textarea",
                            validators: {
                                required: true
                            },
                            config: {
                                appearance: "fill"
                            }
                        },
                        {
                            id: "q28",
                            label: "28. On a scale of 1 to 5, where 1 is terrible and 3 is average, how good a driver do you think you are?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "1",
                                        value: 1
                                    },
                                    {
                                        label: "2",
                                        value: 2
                                    },
                                    {
                                        label: "3",
                                        value: 3
                                    },
                                    {
                                        label: "4",
                                        value: 4
                                    },
                                    {
                                        label: "5",
                                        value: 5
                                    }
                                ]
                            }
                        },
                        {
                            id: "q29",
                            label: "29. Do you have any food allergies?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "Yes",
                                        value: 1
                                    },
                                    {
                                        label: "No",
                                        value: 2
                                    }
                                ]
                            }
                        },
                        {
                            id: "q30",
                            label: "30. Have you heard thunder or seen lightning in the past year?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "Yes",
                                        value: 1
                                    },
                                    {
                                        label: "No",
                                        value: 2
                                    }
                                ]
                            }
                        },
                        {
                            id: "q31",
                            label: "31. Which do you prefer?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "Chocolate",
                                        value: 1
                                    },
                                    {
                                        label: "Vanilla",
                                        value: 2
                                    }
                                ]
                            }
                        },
                        {
                            id: "q32",
                            label: "32. Pick another number from 1 to 100",
                            type: "text",
                            validators: {
                                required: true
                            },
                            config: {
                                appearance: "fill"
                            }
                        },
                        {
                            id: "q33",
                            label: "33. When you think about stuff on the internet, where do you picture it being physically located?",
                            placeholder: "Even if you know it's not really how things work, is there a place you imagine websites and social media posts sitting before you look at them? If so, where is it?",
                            type: "textarea",
                            validators: {
                                required: true
                            },
                            config: {
                                appearance: "fill"
                            }
                        },
                        {
                            id: "q34",
                            label: "34. Can you roll your tongue?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "Yes",
                                        value: 1
                                    },
                                    {
                                        label: "No",
                                        value: 2
                                    },
                                    {
                                        label: "What?",
                                        value: 3
                                    }
                                ]
                            }
                        },
                        {
                            id: "q35",
                            label: "35. Can you pick things up with your toes?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "Yes",
                                        value: 1
                                    },
                                    {
                                        label: "No",
                                        value: 2
                                    }
                                ]
                            }
                        },
                        {
                            id: "q36",
                            label: "36. How old are you?",
                            type: "text",
                            validators: {
                                required: true
                            },
                            config: {
                                appearance: "fill"
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: "tab-3",
            label: "Questions 37-54",
            fieldsets: [
                {
                    id: "tab-3-fieldset-3",
                    label: "Questions 37-54",
                    fields: [
                        {
                            id: "q37",
                            label: "37. What color are the walls around you right now?",
                            type: "text",
                            validators: {
                                required: true
                            },
                            config: {
                                appearance: "fill"
                            }
                        },
                        {
                            id: "q38",
                            label: "38. What kind of cell phone do you have?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                optionColumns: 1,
                                options: [
                                    {
                                        label: "iPhone",
                                        value: 1
                                    },
                                    {
                                        label: "Android",
                                        value: 2
                                    },
                                    {
                                        label: "Other smartphone",
                                        value: 3
                                    },
                                    {
                                        label: "Non-smartphone",
                                        value: 4
                                    },
                                    {
                                        label: "I don't have a cell phone",
                                        value: 5
                                    }
                                ]
                            }
                        },
                        {
                            id: "q39",
                            label: "39.What's the last thing you ate",
                            type: "text",
                            validators: {
                                required: true
                            },
                            config: {
                                appearance: "fill"
                            }
                        },
                        {
                            id: "q40",
                            label: "40. Which of these words do you know the meaning of?",
                            type: "checkbox",
                            validators: {
                                required: true
                            },
                            config: {
                                optionColumns: 4,
                                options: [
                                    {
                                        label: "Slickle",
                                        value: 1
                                    },
                                    {
                                        label: "Rife",
                                        value: 2
                                    },
                                    {
                                        label: "Soliloquy",
                                        value: 3
                                    },
                                    {
                                        label: "Fination",
                                        value: 4
                                    },
                                    {
                                        label: "Stipple",
                                        value: 5
                                    },
                                    {
                                        label: "Peristeronic",
                                        value: 6
                                    },
                                    {
                                        label: "Modicum",
                                        value: 7
                                    },
                                    {
                                        label: "Trephony",
                                        value: 8
                                    },
                                    {
                                        label: "Tribution",
                                        value: 9
                                    },
                                    {
                                        label: "Phoropter",
                                        value: 10
                                    },
                                    {
                                        label: "Unitory",
                                        value: 11
                                    },
                                    {
                                        label: "Amiable",
                                        value: 12
                                    },
                                    {
                                        label: "Salient",
                                        value: 13
                                    },
                                    {
                                        label: "Regolith",
                                        value: 14
                                    },
                                    {
                                        label: "Lithe",
                                        value: 15
                                    },
                                    {
                                        label: "Revergent",
                                        value: 16
                                    },
                                    {
                                        label: "Hubris",
                                        value: 17
                                    },
                                    {
                                        label: "Fleek",
                                        value: 18
                                    },
                                    {
                                        label: "Cadine",
                                        value: 19
                                    },
                                    {
                                        label: "Apricity",
                                        value: 20
                                    }
                                ]
                            }
                        },
                        {
                            id: "q41",
                            label: "41. Please type \"cat\" here:",
                            type: "text",
                            validators: {
                                required: true
                            },
                            config: {
                                appearance: "fill"
                            }
                        },
                        {
                            id: "q42",
                            label: "42. Do you usually remember your dreams?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "Yes",
                                        value: 1
                                    },
                                    {
                                        label: "No",
                                        value: 2
                                    }
                                ]
                            }
                        },
                        {
                            id: "q43",
                            label: "43. Do you have strong opinions about text editors?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "Yes",
                                        value: 1
                                    },
                                    {
                                        label: "No",
                                        value: 2
                                    }
                                ]
                            }
                        },
                        {
                            id: "q44",
                            label: "44. How do you feel about emoji?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                optionColumns: 1,
                                options: [
                                    {
                                        label: "Positive 😊",
                                        value: 1
                                    },
                                    {
                                        label: "Neutral 😐",
                                        value: 2
                                    },
                                    {
                                        label: "Negative 😠",
                                        value: 3
                                    }
                                ]
                            }
                        },
                        {
                            id: "q45",
                            label: "45. Does it ever snow where you live?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "Yes",
                                        value: 1
                                    },
                                    {
                                        label: "No",
                                        value: 2
                                    }
                                ]
                            }
                        },
                        {
                            id: "q46",
                            label: "46. Do you strongly dislike the taste or texture of any of these things?",
                            type: "checkbox",
                            validators: {
                                required: true
                            },
                            config: {
                                optionColumns: 2,
                                options: [
                                    {
                                        label: "Eggs",
                                        value: 1
                                    },
                                    {
                                        label: "Chocolate ice cream",
                                        value: 2
                                    },
                                    {
                                        label: "Beer",
                                        value: 3
                                    },
                                    {
                                        label: "White wine",
                                        value: 4
                                    },
                                    {
                                        label: "Carbonation (or Fizz)",
                                        value: 5
                                    },
                                    {
                                        label: "Red wine",
                                        value: 6
                                    },
                                    {
                                        label: "Cilantro",
                                        value: 7
                                    },
                                    {
                                        label: "Coffee",
                                        value: 8
                                    },
                                    {
                                        label: "Tomatoes",
                                        value: 9
                                    },
                                    {
                                        label: "Yogurt",
                                        value: 10
                                    }
                                ]
                            }
                        },
                        {
                            id: "q47",
                            label: "47. Which of these do you regularly drink?",
                            type: "checkbox",
                            validators: {
                                required: true
                            },
                            config: {
                                optionColumns: 2,
                                options: [
                                    {
                                        label: "Caffeinated soda",
                                        value: 1
                                    },
                                    {
                                        label: "Noncaffeinated soda",
                                        value: 2
                                    },
                                    {
                                        label: "Coffee",
                                        value: 3
                                    },
                                    {
                                        label: "Fruit juice",
                                        value: 4
                                    },
                                    {
                                        label: "Milk",
                                        value: 5
                                    },
                                    {
                                        label: "Beer",
                                        value: 6
                                    },
                                    {
                                        label: "Wine",
                                        value: 7
                                    },
                                    {
                                        label: "Tea",
                                        value: 8
                                    },
                                    {
                                        label: "Maple syrup",
                                        value: 9
                                    },
                                    {
                                        label: "Water",
                                        value: 10
                                    }
                                ]
                            }
                        },
                        {
                            id: "q48",
                            label: "48. Type five random words",
                            type: "textarea",
                            validators: {
                                required: true
                            },
                            config: {
                                appearance: "fill"
                            }
                        },
                        {
                            id: "q49",
                            label: "49. Are you nervous about flying?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "Yes",
                                        value: 1
                                    },
                                    {
                                        label: "No",
                                        value: 2
                                    },
                                    {
                                        label: "A little",
                                        value: 3
                                    }
                                ]
                            }
                        },
                        {
                            id: "q50",
                            label: "50. On a scale of 1 to 5, which number is your favorite?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "1",
                                        value: 1
                                    },
                                    {
                                        label: "2",
                                        value: 2
                                    },
                                    {
                                        label: "3",
                                        value: 3
                                    },
                                    {
                                        label: "4",
                                        value: 4
                                    },
                                    {
                                        label: "5",
                                        value: 5
                                    }
                                ]
                            }
                        },
                        {
                            id: "q51",
                            label: "51. Which of these would you consider a sandwich? (Check all that apply)",
                            type: "checkbox",
                            validators: {
                                required: true
                            },
                            config: {
                                optionColumns: 1,
                                options: [
                                    {
                                        label: "Taco",
                                        value: 1
                                    },
                                    {
                                        label: "Quesadilla",
                                        value: 2
                                    },
                                    {
                                        label: "Sub/Hoagie",
                                        value: 3
                                    },
                                    {
                                        label: "Cheesesteak",
                                        value: 4
                                    },
                                    {
                                        label: "Hamburger",
                                        value: 5
                                    },
                                    {
                                        label: "Open-faced sandwich",
                                        value: 6
                                    },
                                    {
                                        label: "Calzone",
                                        value: 7
                                    }
                                ]
                            }
                        },
                        {
                            id: "q52",
                            label: "52. Which of these describes you? (Check all that apply)",
                            type: "checkbox",
                            validators: {
                                required: true
                            },
                            config: {
                                optionColumns: 1,
                                options: [
                                    {
                                        label: "Dog person",
                                        value: 1
                                    },
                                    {
                                        label: "Cat person",
                                        value: 2
                                    },
                                    {
                                        label: "Half-cat half-person",
                                        value: 3
                                    },
                                    {
                                        label: "Part of a subterranean race of dog people",
                                        value: 4
                                    },
                                    {
                                        label: "Literally named \"Catherine Person\"",
                                        value: 5
                                    }
                                ]
                            }
                        },
                        {
                            id: "q53",
                            label: "53. Would you say you have a good sense of direction?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                options: [
                                    {
                                        label: "Yes",
                                        value: 1
                                    },
                                    {
                                        label: "No",
                                        value: 2
                                    }
                                ]
                            }
                        },
                        {
                            id: "q54",
                            label: "54. Have you ever thrown out all your different pairs of socks/underwear, bought a bunch of replacements that were all one kind, and then told all your friends how great it was and how they should do it too?",
                            type: "radio",
                            validators: {
                                required: true
                            },
                            config: {
                                optionColumns: 1,
                                options: [
                                    {
                                        label: "Yes",
                                        value: 1
                                    },
                                    {
                                        label: "No",
                                        value: 2
                                    },
                                    {
                                        label: "I did the throwing out thing, but didn't talk to everyone about it",
                                        value: 2
                                    },
                                    {
                                        label: "No, but I'm totally doing that now",
                                        value: 2
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ]
}, null, 4);
