/**
 * @fileoverview Generating RAPID for math blocks.
 */
'use strict';

goog.provide('Blockly.Rapid.math');
goog.require('Blockly.Rapid');

Blockly.Rapid['math_number'] = function(block) {
  var code = parseFloat(block.getFieldValue('NUM'));
  if (code < 0) {
    // if negative, the literal may need parentheses around it
    return [code, Blockly.Rapid.ORDER_ADDITIVE];
  } else {
    return [code, Blockly.Rapid.ORDER_ATOMIC];
  }
};

Blockly.Rapid['math_arithmetic'] = function(block) {
  // Basic arithmetic operators, and power.
  var opField = block.getFieldValue('OP');
  var code = '';
  var order;
  if (opField == 'POWER') {
    var argument0 = Blockly.Rapid.valueToCode(block, 'A', Blockly.Rapid.ORDER_NONE) || '0';
    var argument1 = Blockly.Rapid.valueToCode(block, 'B', Blockly.Rapid.ORDER_NONE) || '0';
    code = 'Pow(' + argument0 + ', ' + argument1 + ')';
    order = Blockly.Rapid.ORDER_FUNCTION_CALL;
  } else {
    var OPERATORS = {
      'ADD': [' + ', Blockly.Rapid.ORDER_ADDITIVE],
      'MINUS': [' - ', Blockly.Rapid.ORDER_ADDITIVE],
      'MULTIPLY': [' * ', Blockly.Rapid.ORDER_MULTIPLICATIVE],
      'DIVIDE': [' / ', Blockly.Rapid.ORDER_MULTIPLICATIVE],
      'POWER': [' ** ', Blockly.Rapid.ORDER_EXPONENTIATION]
    };
    var tuple = OPERATORS[opField];
    var operator = tuple[0];
    order = tuple[1];
    var argument0 = Blockly.Rapid.valueToCode(block, 'A', order) || '0';
    var argument1 = Blockly.Rapid.valueToCode(block, 'B', order) || '0';
    code = argument0 + operator + argument1;
  }

  return [code, order];
};

// Block math_single is not implemented for RAPID, because it includes functions that
// RAPID doesn't support. Use math_single_rb instead.

Blockly.Rapid['math_single_rb'] = function(block) {
  // Math operators with single operand.
  var operator = block.getFieldValue('OP');
  var code;
  var arg;
  if (operator == 'NEG') {
    // Negation is a special case given its different operator precedence.
    code = Blockly.Rapid.valueToCode(block, 'NUM', Blockly.Rapid.ORDER_ADDITIVE) || '0';
    return ['-' + code, Blockly.Rapid.ORDER_ADDITIVE];
  }

  arg = Blockly.Rapid.valueToCode(block, 'NUM', Blockly.Rapid.ORDER_NONE) || '0';

  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ABS':
      code = 'Abs(' + arg + ')';
      break;
    case 'ROOT':
      code = 'Sqrt(' + arg + ')';
      break;
    case 'EXP':
      code = 'Exp(' + arg + ')';
      break;
    case 'POW10':
      code = 'Pow(10,' + arg + ')';
      break;
    case 'ROUND':
      code = 'Round(' + arg + ')';
      break;
    case 'SIN':
      code = 'Sin(' + arg + ')';
      break;
    case 'COS':
      code = 'Cos(' + arg + ')';
      break;
    case 'TAN':
      code = 'Tan(' + arg + ')';
      break;
    case 'ASIN':
      code = 'ASin(' + arg + ')';
      break;
    case 'ACOS':
      code = 'ACos(' + arg + ')';
      break;
    case 'ATAN':
      code = 'ATan(' + arg + ')';
      break;
    default:
      throw 'Unknown math operator: ' + operator;
  }
  
  return [code, Blockly.Rapid.ORDER_FUNCTION_CALL];
};

/**
 * The block math_round is not implemented for RAPID, because round up is not supported. 
 * Instead, the math_single_rb block includes the 'round' operation (but not round up or round down).
 */

// Trigonometry functions have a single operand.
Blockly.Rapid['math_trig'] = Blockly.Rapid['math_single_rb'];

Blockly.Rapid['math_change'] = function(block) {
  // Add to a variable in place.
  var argument0 = Blockly.Rapid.valueToCode(block, 'DELTA', Blockly.Rapid.ORDER_ADDITIVE) || '0';
  var varName = Blockly.Rapid.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ":= " + varName + " + " + argument0 + ";\n";
};

Blockly.Rapid['math_modulo'] = function(block) {
  // Remainder computation block.
  var argument0 = Blockly.Rapid.valueToCode(block, 'DIVIDEND', Blockly.Rapid.ORDER_MULTIPLICATIVE) || '0';
  var argument1 = Blockly.Rapid.valueToCode(block, 'DIVISOR', Blockly.Rapid.ORDER_MULTIPLICATIVE) || '0';
  var code = argument0 + ' MOD ' + argument1;
  return [code, Blockly.Rapid.ORDER_MULTIPLICATIVE];
};
