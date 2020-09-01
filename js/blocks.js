// Defines the custom blocks used in our toolbox.

Blockly.defineBlocksWithJsonArray([
    // Start
    {
        "type": "custom_start",
        "message0": "When %1 pressed, robot does this:",
        "args0": [
          {
            "type": "field_image",
            "src": "https://www.gstatic.com/codesite/ph/images/star_on.gif", //change to own image
            "width": 15,
            "height": 15,
            "alt": "play button",
            "flipRtl": false
          }
        ],
        "nextStatement": null,
        "colour": 15,
        "tooltip": "",
        "helpUrl": ""
    },
    // Move somewhere
    {
        "type": "custom_move",
        "message0": "Move %1 %2 to %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "TARGET",
                "options": [
                [
                    "Finger",
                    "FINGER"
                ]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "SPEED",
                "options": [
                [
                    "quickly",
                    "QUICK"
                ],
                [
                    "moderately",
                    "MODERATE"
                ],
                [
                    "slowly",
                    "SLOW"
                ]
                ]
            },
            {
                "type": "field_variable",
                "name": "LOCATION",
                "variable": "<somewhere>"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 50,
        "tooltip": "",
        "helpUrl": ""
    },
    // Move somewhere in straight line
    {
        "type": "custom_movestraight",
        "message0": "Move %1 %2 in a straight line to %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "TARGET",
                "options": [
                [
                    "Finger",
                    "FINGER"
                ]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "SPEED",
                "options": [
                [
                    "quickly",
                    "QUICK"
                ],
                [
                    "at a normal speed",
                    "NORMAL"
                ],
                [
                    "slowly",
                    "SLOW"
                ]
                ]
            },
            {
                "type": "field_variable",
                "name": "LOCATION",
                "variable": "<somewhere>"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 50,
        "tooltip": "",
        "helpUrl": ""
    },
    // Open finger
    {
        "type": "custom_open",
        "message0": "Open finger",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 210,
        "tooltip": "",
        "helpUrl": ""
    },
    // Close finger
    {
        "type": "custom_close",
        "message0": "Close finger",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 210,
        "tooltip": "",
        "helpUrl": ""
    }
]);