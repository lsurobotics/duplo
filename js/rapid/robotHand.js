'use strict';

goog.provide('Blockly.Rapid.robotHand');
goog.require('Blockly.Rapid');

//Blockly.Rapid.robotHand.RESULT_VARIABLE = "gripperResult";

Blockly.Rapid['custom_open'] = function (block) {
  var code = "";
  //assume robot has YuMi-style gripper
  code = "g_GripOut;\n";
  //add a g_Stop instruction because that's what the Yumi app does.
  //Not sure if this is necessary
  code += "g_Stop;\n";
  return code;
};

Blockly.Rapid['custom_close'] = function (block) {
  var code = "";
  //assume robot has YuMi-style gripper
  code = "g_GripIn;\n";
  return code;
};

