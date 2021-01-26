'use strict';

goog.provide('Blockly.Rapid');
goog.require('Blockly.Generator');

/**
 * RAPID code generator
 * @type {!Blockly.Generator}
 */
Blockly.Rapid = new Blockly.Generator('Rapid');

Blockly.Rapid.addReservedWords(
  'ALIAS,AND,BACKWARD,CASE,CONNECT,CONST,DEFAULT,DIV,DO,ELSE,ELSEIF,ENDFOR,ENDFUNC,ENDIF,ENDMODULE,ENDPROC,ENDRECORD,ENDTEST,ENDTRAP,ENDWHILE,ERROR,EXIT,FALSE,FOR,FROM,FUNC,GOTO,IF,INOUT,LOCAL,MOD,MODULE,NOSTEPIN,NOT,NOVIEW,OR,PERS,PROC,RAISE,READONLY,RECORD,RETRY,RETURN,STEP,SYSMODULE,TEST,THEN,TO,TRAP,TRUE,TRYNEXT,VAR,VIEWONLY,WHILE,WITH,XOR,' +
  'alias,and,backward,case,connect,const,default,div,do,else,elseif,endfor,endfunc,endif,endmodule,endproc,endrecord,endtest,endtrap,endwhile,error,exit,false,for,from,func,goto,if,inout,local,mod,module,nostepin,not,noview,or,pers,proc,raise,readonly,record,retry,return,step,sysmodule,test,then,to,trap,true,trynext,var,viewonly,while,with,xor'
);

// Order of operation ENUMs
Blockly.Rapid.ORDER_ATOMIC = 0;           // 0 "" ...
Blockly.Rapid.ORDER_FUNCTION_CALL = 0.1;
Blockly.Rapid.ORDER_MULTIPLICATIVE = 1;   // * / DIV MOD
Blockly.Rapid.ORDER_ADDITIVE = 2;         // + -
Blockly.Rapid.ORDER_RELATIONAL = 3;       // < > <> <= >= =
Blockly.Rapid.ORDER_LOGICAL_AND = 4;      // AND
Blockly.Rapid.ORDER_LOGICAL_OR_NOT = 5;   // OR XOR NOT
Blockly.Rapid.ORDER_NONE = 99;            // (...)

// TODO: add order overrides, if any

Blockly.Rapid.init = function(workspace) {
  this.INDENT = "    ";
  Blockly.Rapid.toolName = "default_tool";
  Blockly.Rapid.wobjName = "default_wobj";
  Blockly.Rapid.namePrefix = "";
  Blockly.Rapid.robotModel = "";

  //A dictionary of definitions to be printed before the code
  Blockly.Rapid.definitions_ = Object.create(null);

  //initialize variable database
  if (!Blockly.Rapid.variableDB_) {
    Blockly.Rapid.variableDB_ = 
      new Blockly.Names(Blockly.Rapid.RESERVED_WORDS_);
  } else {
    Blockly.Rapid.variableDB_.reset();
  }
  
  Blockly.Rapid.variableDB_.setVariableMap(workspace.getVariableMap());

  var defvars = [];
  // Add developer variables (not created or named by the user).
  var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
  for (var i = 0; i < devVarList.length; i++) {
    var devVarName = Blockly.Rapid.variableDB_.getName(devVarList[i],
        Blockly.Names.DEVELOPER_VARIABLE_TYPE);
    defvars.push("LOCAL VAR bool " + devVarName + ";");
  }
  
  // Add user variables, but only ones that are being used.
  var variables = Blockly.Variables.allUsedVarModels(workspace);
  // Now custom variables for now

  /*for (var i = 0; i < variables.length; i++) {
    if (variables[i].type === Blockly.Locations.VARIABLE_TYPE) {
      //don't include Locations in the variable declaration block.
      //these will be handled by the Coblox app
      continue;
    }

    var varName = Blockly.Rapid.variableDB_.getName(variables[i].getId(),
        Blockly.Variables.NAME_TYPE);
    defvars.push("LOCAL VAR num " + varName + " := 0;");
  }

  Blockly.Rapid.definitions_['variables'] = defvars.join('\n');
  */
}

Blockly.Rapid.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.Rapid.definitions_) {
    definitions.push(Blockly.Rapid.definitions_[name]);
  }
  // Clean up temporary data.
  delete Blockly.Rapid.definitions_;
  delete Blockly.Rapid.functionNames_;
  Blockly.Rapid.variableDB_.reset();
  var allDefs = definitions.join('\n');
  return allDefs.replace(/\n\n+/g, '\n').replace(/\n*$/, '\n\n') + code;
}

Blockly.Rapid.scrub_ = function(block, code) {
  var nextBlock = nextInSplitStack(block);
  var nextCode = Blockly.Rapid.blockToCode(nextBlock);
  code += nextCode;
  return code;
}

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.
 * 
 * For RobotBlockly only a limited set of top-level blocks are allowed, so this function doesn't have to do anything.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Rapid.scrubNakedValue = function(line) {
  return line;
}

/**
 * Translates the given name into a version that can be used RAPID.
 * 
 * The purpose of this is to avoid name collisions between code modules
 * and to ensure that names don't contain characters forbidden in RAPID.
 * @param {string} locName The name to translate.
 * @return {string} A version of the name to use in RAPID.
 */
Blockly.Rapid.makeRapidName = function(name) {
  var sanitizedName = name.split('?').join('-');
  sanitizedName = sanitizedName.split(';').join('-');
  sanitizedName = sanitizedName.split('{').join('-');
  sanitizedName = sanitizedName.split('}').join('-');
  sanitizedName = sanitizedName.split(',').join('-');
  sanitizedName = sanitizedName.split('.').join('-');
  sanitizedName = sanitizedName.split('!').join('-');
  sanitizedName = sanitizedName.split('[').join('-');
  sanitizedName = sanitizedName.split(']').join('-');
  sanitizedName = sanitizedName.split('$').join('-');
  sanitizedName = sanitizedName.split('+').join('-');
  sanitizedName = sanitizedName.split('(').join('-');
  sanitizedName = sanitizedName.split(')').join('-');
  sanitizedName = sanitizedName.split('`').join('-');
  sanitizedName = sanitizedName.split('&').join('-');
  sanitizedName = sanitizedName.split('=').join('-');
  sanitizedName = sanitizedName.split('%').join('-');
  sanitizedName = sanitizedName.split('#').join('-');
  sanitizedName = sanitizedName.split('@').join('-');
  sanitizedName = sanitizedName.split('/').join('-');
  sanitizedName = sanitizedName.split('\\').join('-');
  sanitizedName = sanitizedName.split('*').join('-');
  sanitizedName = sanitizedName.split(':').join('-');
  sanitizedName = sanitizedName.split('^').join('-');
  sanitizedName = sanitizedName.split('~').join('-');


  return "var" + sanitizedName + "v";
}