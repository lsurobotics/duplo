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
        "previousStatement": null,
        "nextStatement": null,
        "colour": 50,
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
        "colour": 50,
        "tooltip": "",
        "helpUrl": ""
    },
    // Mirror movement
    {
        "type": "custom_mirror",
        "message0": "Mirror other arm",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 50,
        "tooltip": "",
        "helpUrl": ""
    },
    // Follow movement (toolbox version for connecting to move)
    {
        "type": "custom_toolbox_follow",
        "message0": "Follow other arm",
        "inputsInline": false,
        "output": null,
        "colour": 50,
        "tooltip": "",
        "helpUrl": ""
    },
    // Follow movement (toolbox version for connecting to move)
    {
        "type": "custom_toolbox_mirror",
        "message0": "Mirror other arm",
        "inputsInline": false,
        "output": null,
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

var moveMixin = {
    mutationToDom: function() {
        var container = document.createElement('mutation');
        var toolbox = this.isInFlyout && this.getInput('CONNECTION');
        container.setAttribute('toolbox', toolbox);
        return container;
    },

    domToMutation: function(xmlElement) {
        var toolbox = (xmlElement.getAttribute('toolbox') == 'true');
        this.updateShape_(toolbox);
    },

    updateShape_: function(toolbox) {
        var speed = new Blockly.FieldDropdown([["quickly","QUICK"], ["moderately","MODERATE"], ["slowly","SLOW"]]);
        var location = new Blockly.FieldVariable("[location]");

        console.log(this.inputList[0]);

        if (toolbox) {
            this.appendValueInput('CONNECTION')
                .appendField("Move arm ")
                .appendField(speed, 'SPEED')
                .appendField(" to ")
                .appendField(location, 'LOCATION');
        } else {
            this.appendDummyInput('')
                .appendField("Move arm ")
                .appendField(speed, 'SPEED')
                .appendField(" to ")
                .appendField(location, 'LOCATION');
        }
    }
}

Blockly.Extensions.registerMutator("move_mutator", moveMixin);