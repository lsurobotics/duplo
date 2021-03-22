'use strict';

goog.provide('Blockly.Rapid.robotHand');
goog.require('Blockly.Rapid');

//Blockly.Rapid.robotHand.RESULT_VARIABLE = "gripperResult";

Blockly.Rapid['custom_open'] = function (block) {
  var code = "";
  //assume robot has YuMi-style gripper
  code = "g_GripOut;\n";
  code += "g_Stop;\n";  
  return code;
};

Blockly.Rapid['custom_close'] = function (block) {
  var code = "";
  //assume robot has YuMi-style gripper
  code = "g_GripIn;\n";
  return code;
};

