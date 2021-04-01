// Defines the custom blocks used in our toolbox.

Blockly.HSV_SATURATION = 0.8 // 0 (inclusive) to 1 (exclusive), defaulting to 0.45
Blockly.HSV_VALUE = 0.7 // 0 (inclusive) to 1 (exclusive), defaulting to 0.65

Blockly.defineBlocksWithJsonArray([
    // Start
    {
        "type": "custom_start",
        "message0": "When sᴛᴀʀᴛ is pressed, arm does this:",
        "nextStatement": null,
        "colour": 110,
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
                "variable": "<somewhere>"
            }
        ],
        "inputsInline": false,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 8,
        "tooltip": "",
        "helpUrl": "",
        "mutator": "move_mutator"
    },
    // Follow movement
    {
        "type": "custom_follow",
        "message0": "Follow other arm",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 40,
        "tooltip": "",
        "helpUrl": ""
    },
    // Mirror movement
    {
        "type": "custom_mirror",
        "message0": "Mirror other arm",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 40,
        "tooltip": "",
        "helpUrl": ""
    },
    // Open hand
    {
        "type": "custom_open",
        "message0": "Open hand",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 200,
        "tooltip": "",
        "helpUrl": ""
    },
    // Close hand
    {
        "type": "custom_close",
        "message0": "Close hand",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 200,
        "tooltip": "",
        "helpUrl": ""
    },
    // Wait for the other
    {
        "type": "custom_wait",
        "message0": "Wait for each other",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 40,
        "tooltip": "",
        "helpUrl": ""
    }
]);


// Controls whether move blocks are mutated (i.e. their forms in the toolbox).

var moveMixin = {
    mutationToDom: function() {
        var container = document.createElement('mutation');
        var type = this.getField('END') ? this.getFieldValue('END') : 'null';
        container.setAttribute('type', type);
        return container;
    },

    domToMutation: function(xmlElement) {
        var type = xmlElement.getAttribute('type');
        this.updateShape_(type);
    },

    updateShape_: function(type) {
        if (type == 'null' && this.getField('END')) {
            this.getInput('').removeField('END');
        } else if (type != 'null') {
            this.getInput('').removeField('END', true);
            this.getInput('').appendField(type, 'END');
        }
    }
}

Blockly.Extensions.registerMutator("move_mutator", moveMixin);