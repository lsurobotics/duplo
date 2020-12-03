'use strict';

goog.provide('Blockly.Rapid.procedures');
goog.require('Blockly.Rapid');

Blockly.Rapid['procedures_defnoreturn'] = function (block) {
  var branch = Blockly.Rapid.statementToCode(block, 'STACK');
  var funcName = Blockly.Rapid.variableDB_.getName(block.getFieldValue('NAME'), Blockly.PROCEDURE_CATEGORY_NAME);
  var code = "ID:" + block.id + " PROC " + funcName + "()\n" + branch + "ENDPROC\n";
  return code;
}

Blockly.Rapid['procedures_callnoreturn'] = function (block) {
  var funcName = Blockly.Rapid.variableDB_.getName(block.getFieldValue('NAME'), Blockly.PROCEDURE_CATEGORY_NAME);
  var code = "ID:" + block.id + " " + funcName + ";\n";
  return code;
}