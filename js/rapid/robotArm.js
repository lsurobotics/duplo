'use strict';

goog.provide('Blockly.Rapid.robotArm');
goog.require('Blockly.Rapid');

Blockly.Rapid['error_action'] = function (block) {
    var code = block.getFieldValue('HANDLE')
    return [code, Blockly.Rapid.ORDER_ATOMIC];
}

Blockly.Rapid['error_signal'] = function (block) {
    var code = block.getFieldValue('SIGNAL')
    return [code, Blockly.Rapid.ORDER_ATOMIC];
}

Blockly.Rapid['error_rewind'] = function (block) {
    var code = block.getFieldValue('STEPS')
    return [code, Blockly.Rapid.ORDER_ATOMIC];
}

Blockly.Rapid['continue'] = function (block) {
    return ["ignore error!", Blockly.Rapid.ORDER_ATOMIC];
}

Blockly.Rapid['custom_move'] = function (block) {
  var move_speed = block.getFieldValue('SPEED');
  var inst = "ID:" + Blockly.Rapid.makeRapidName(block.id) + " MoveJ";
  var speed = "v100";
  switch (move_speed) {
    case "QUICK":
      speed = "v700";
      break;
    case "MODERATE":
      speed = "v300";
      break;
    case "SLOW":
      speed = "v100";
      break;
    default:
      break;
  }
  var target = Blockly.Rapid.makeRapidName(block.getFieldValue('LOCATION'));
  //var tool = Blockly.Rapid.toolName;
  var code = inst + ' ' + target + ', ' + speed + ', fine, tGripper' + ';\n';
  return code;
};
