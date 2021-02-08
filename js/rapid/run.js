'use strict';

goog.provide('Blockly.Rapid.run');
goog.require('Blockly.Rapid');


Blockly.Rapid['custom_start'] = function (block) {
    // The run block represents the main function of the program.
    // However, the function's statements are siblings of the block, rather than children.
    // The scrub_ method in the generator needs an exception for this block, or else the sibling
    // blocks will be included twice.
    return "PROC main()\n";
};
