/**
 * @fileoverview Generating RAPID for variable blocks.
  */
'use strict';

goog.provide('Blockly.Rapid.variables');

goog.require('Blockly.Rapid');


Blockly.Rapid['variables_get'] = function(block) {
  // Variable getter.
  var code = Blockly.Rapid.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return [code, Blockly.Rapid.ORDER_ATOMIC];
};

Blockly.Rapid['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.Rapid.valueToCode(block, 'VALUE', Blockly.Rapid.ORDER_NONE) || '0';
  var varName = Blockly.Rapid.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return varName + ' := ' + argument0 + ';\n';
};
