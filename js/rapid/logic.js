'use strict';

goog.provide('Blockly.Rapid.logic');
goog.require('Blockly.Rapid');

Blockly.Rapid['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  do {
    conditionCode = Blockly.Rapid.valueToCode(block, 'IF' + n, Blockly.Rapid.ORDER_NONE) || 'false';
    branchCode = Blockly.Rapid.statementToCode(block, 'DO' + n) || '';
    code += (n == 0 ? 'IF ' : 'ELSEIF ' ) + conditionCode + ' THEN\n' + branchCode;
    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE')) {
    branchCode = Blockly.Rapid.statementToCode(block, 'ELSE') || '';
    code += 'ELSE\n' + branchCode;
  }
  code += 'ENDIF\n';
  return code;
};

Blockly.Rapid['controls_ifelse'] = Blockly.Rapid['controls_if'];

Blockly.Rapid['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '=',
    'NEQ': '<>',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = Blockly.Rapid.ORDER_RELATIONAL;
  var argument0 = Blockly.Rapid.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Rapid.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Rapid['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = block.getFieldValue('OP');
  var order = (operator == 'AND') ? Blockly.Rapid.ORDER_LOGICAL_AND : Blockly.Rapid.ORDER_LOGICAL_OR_NOT;
  var argument0 = Blockly.Rapid.valueToCode(block, 'A', order);
  var argument1 = Blockly.Rapid.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'FALSE';
    argument1 = 'FALSE';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == 'and') ? 'TRUE' : 'FALSE';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Rapid['logic_negate'] = function(block) {
  // Negation.
  var argument0 = Blockly.Rapid.valueToCode(block, 'BOOL', Blockly.Rapid.ORDER_LOGICAL_OR_NOT) || 'True';
  var code = 'NOT ' + argument0;
  return [code, Blockly.Rapid.ORDER_LOGICAL_OR_NOT];
};

Blockly.Rapid['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'TRUE' : 'FALSE';
  return [code, Blockly.Rapid.ORDER_ATOMIC];
};
