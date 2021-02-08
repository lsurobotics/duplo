'use strict';

goog.provide('Blockly.Rapid.loops');
goog.require('Blockly.Rapid');


Blockly.Rapid['controls_repeat_ext'] = function(block) {
  // Repeat X times block
  var times = block.getFieldValue('TIMES') || '0';
  times = parseInt(times);
  var branch = Blockly.Rapid.statementToCode(block, 'DO');
  branch = Blockly.Rapid.addLoopTrap(branch, block.id);
  var loopVar = Blockly.Rapid.variableDB_.getDistinctName(
      'count', Blockly.Variables.NAME_TYPE);
  var code = "ID:" + Blockly.Rapid.makeRapidName(block.id) + " FOR " + loopVar + " FROM 1 TO " + times + " DO\n";
  code += branch;
  code += "ENDFOR\n";
  return code;
};

Blockly.Rapid['controls_repeat'] = Blockly.Rapid['controls_repeat_ext'];

/*Blockly.Rapid['controls_whileUntil'] = function(block) {
  // Do while/until loop.
  var until = block.getFieldValue('MODE') == 'UNTIL';
  var argument0 = Blockly.Rapid.valueToCode(block, 'BOOL',
      until ? Blockly.Rapid.ORDER_LOGICAL_OR_NOT :
      Blockly.Rapid.ORDER_NONE) || 'False';
  var branch = Blockly.Rapid.statementToCode(block, 'DO');
  branch = Blockly.Rapid.addLoopTrap(branch, block.id);
  if (until) {
    argument0 = 'NOT ' + argument0;
  }
  var code = "ID:" + block.id + ' WHILE ' + argument0 + ' DO\n';
  code += branch;
  code += 'ENDWHILE\n';
  return code;
};

Blockly.Rapid['controls_for'] = function(block) {
  //For loop block
  var loopVar = Blockly.Rapid.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var fromArg = Blockly.Rapid.valueToCode(block, 'FROM', Blockly.Rapid.ORDER_NONE) || '0';
  var toArg = Blockly.Rapid.valueToCode(block, 'TO', Blockly.Rapid.ORDER_NONE) || '0';
  var incArg = Blockly.Rapid.valueToCode(block, 'BY', Blockly.Rapid.ORDER_NONE) || '1';
  var branch = Blockly.Rapid.statementToCode(block, 'DO');
  branch = Blockly.Rapid.addLoopTrap(branch, block.id)

  var code = "ID:" + block.id + " FOR " + loopVar + 
             " FROM " + fromArg + 
             " TO " + toArg +
             " STEP " + incArg + " DO\n";
  code += branch;
  code += "ENDFOR\n";
  return code;
};*/

