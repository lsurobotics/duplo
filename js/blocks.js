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
        "message0": "Move arm %1 to %2",
        "args0": [
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
                "variable": "starting point"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 50,
        "tooltip": "",
        "helpUrl": ""
    },
    // Follow movement
    {
        "type": "custom_follow",
        "message0": "Follow movement",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 50,
        "tooltip": "",
        "helpUrl": ""
    },
    // Mirror movement
    {
        "type": "custom_mirror",
        "message0": "Mirror movement",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 50,
        "tooltip": "",
        "helpUrl": ""
    },
    // Open hand
    {
        "type": "custom_open",
        "message0": "Open hand",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 210,
        "tooltip": "",
        "helpUrl": ""
    },
    // Close hand
    {
        "type": "custom_close",
        "message0": "Close hand",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 210,
        "tooltip": "",
        "helpUrl": ""
    },
    // Wait for the other
    {
        "type": "custom_wait",
        "message0": "Wait for each other",
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#888",
        "tooltip": "",
        "helpUrl": ""
    }
]);