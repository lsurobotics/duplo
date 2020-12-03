'use strict';

goog.provide('Blockly.Rapid.robotHand');
goog.require('Blockly.Rapid');

//Blockly.Rapid.robotHand.RESULT_VARIABLE = "gripperResult";

Blockly.Rapid['custom_open'] = function (block) {
  var code = "";
  //if (Blockly.Rapid.robotModel == "14100") {
  //  //robot is a Roberta
  //  var resultVar = Blockly.Rapid.variableDB_.getName(Blockly.Rapid.robotHand.RESULT_VARIABLE,
  //    Blockly.Names.DEVELOPER_VARIABLE_TYPE);
  //  code = "ID:" + block.id + " " + resultVar + " := SG70_SetFingerSpan(66);\n";
  //} else {
    //assume robot has YuMi-style gripper
    code = "ID:" + block.id + " g_GripOut;\n";
    //add a g_Stop instruction because that's what the Yumi app does.
    //Not sure if this is necessary
    code += "ID:" + block.id + " g_Stop;\n";
  //}
  return code;
};

Blockly.Rapid['custom_close'] = function (block) {
  var code = "";
  //if (Blockly.Rapid.robotModel == "14100") {
  //  //robot is a Roberta
  //  var resultVar = Blockly.Rapid.variableDB_.getName(Blockly.Rapid.robotHand.RESULT_VARIABLE,
  //    Blockly.Names.DEVELOPER_VARIABLE_TYPE);
  //  code = "ID:" + block.id + " " + resultVar + " := SG70_GraspObjectInward(10, \\expectedSize:=0, \\expectedSizeDeviation:=66, \\synchronousCall:=TRUE, \\fingerSpeed:=10);\n";
  //} else {
    //assume robot has YuMi-style gripper
    code = "ID:" + block.id + " g_GripIn;\n";
  //}
  return code;
};

