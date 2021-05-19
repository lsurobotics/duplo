/**
 * This file contains the functions for adjusting the variable dropdown to our use case and
 * for creating the variable prompt modal that occurs on a new position or rename selection.
 */


var rename_variable_callback;   //stores the callback reference for the variable prompt
var renameVariableWorkspace;    //stores workspace id that variable is being renamed in. Comes from dropdowncreate function
var selectedVariable;           //stores the currently selected variable in dropdown. Comes from dropdowncreate function. Used for reteach position option.

/**
 * Wrapper to window.prompt() that app developers may override to provide
 * alternatives to the modal browser window. Built-in browser prompts are
 * often used for better text input experience on mobile device. We strongly
 * recommend testing mobile when overriding this.
 * @param {string} message The message to display to the user.
 * @param {string} defaultValue The value to initialize the prompt with.
 * @param {!function(?string)} callback The callback for handling user response.
 */
Blockly.prompt = function(message, defaultValue, callback) {

  //if it is a Rename variable prompt use this modal else use default prompt
  if(message.includes("Rename")){
    $('#variable-prompt-modal').modal('show'); //show teach position modal
    $("#variable-prompt-modal-warning").html("Name your location:").css("color", "black");
    $("#variable-name-input").val(defaultValue);
    $("#variable-name-input").focus();
    rename_variable_callback = callback;  //store reference to callback for later use
  }else{
    callback(prompt(message, defaultValue));
  }
  
};

/**
   * Event listener for variable prompt modal cancel button
   */
 document.getElementById("variable-prompt-modal-cancel-button").addEventListener("click", canceledModal);
 function canceledModal() {
   rename_variable_callback(null);
 };

 /**
  * Event listener for variable prompt modal confirm rename button
  */
 document.getElementById("variable-prompt-modal-confirm-button").addEventListener("click", confirmedModal);
 function confirmedModal() {
    var workspaceVariables;
    var inputVal = $("#variable-name-input").val(); //get form input

    //get all variables within the workspace that the dropdown was created in
    if (renameVariableWorkspace == leftWorkspace.id) workspaceVariables = leftWorkspace.getAllVariables();
    else if(renameVariableWorkspace == rightWorkspace.id) workspaceVariables = rightWorkspace.getAllVariables();

    //if user is trying to overwrite an already named variable do not close modal and allow them to do it
    if(workspaceVariables.find(o => o.name.toLowerCase() === inputVal.toLowerCase())){
        $("#variable-prompt-modal-warning").html("Location name already exists!").css("color", "red");
        $("#variable-name-input").trigger("focus");
    } 
    else{
        $('#variable-prompt-modal').modal('hide');
        rename_variable_callback(inputVal);
    }    
 };



 /**
 * This function is contained in blockly/core/field_variable.js
 * It creates the field variable dropdown and the function is being
 * adjusted for the YUMI use case here.
 */

/**
 * Return a sorted list of variable names for variable dropdown menus.
 * Include a special option at the end for creating a new variable name.
 * @return {!Array.<!Array>} Array of variable names/id tuples.
 * @this {Blockly.FieldVariable}
 */
 Blockly.FieldVariable.dropdownCreate = function() {
    if (!this.variable_) {
      throw Error('Tried to call dropdownCreate on a variable field with no' +
          ' variable selected.');
    }
    var name = this.getText();  //gets the currently selected variable within the block
    var variableModelList = [];
    if (this.sourceBlock_ && this.sourceBlock_.workspace) {
      var variableTypes = this.getVariableTypes_();
      // Get a copy of the list, so that adding rename and new variable options
      // doesn't modify the workspace's list.
      for (var i = 0; i < variableTypes.length; i++) {
        var variableType = variableTypes[i];
        var variables =
          this.sourceBlock_.workspace.getVariablesOfType(variableType);
        variableModelList = variableModelList.concat(variables);
      }
    }
    variableModelList.sort(Blockly.VariableModel.compareByName);
  
    var options = [];
    for (var i = 0; i < variableModelList.length; i++) {
      // Set the UUID as the internal representation of the variable.
      options[i] = [variableModelList[i].name, variableModelList[i].getId()];
    }
    options.push(["Reteach Location", Blockly.Rapid.RETEACH_VARIABLE_ID]); //ADDED! Places reteach option in dropdown
    options.push([Blockly.Msg['RENAME_VARIABLE'], Blockly.RENAME_VARIABLE_ID]);
    if (Blockly.Msg['DELETE_VARIABLE']) {
      options.push(
          [
            Blockly.Msg['DELETE_VARIABLE'].replace('%1', name),
            Blockly.DELETE_VARIABLE_ID
          ]
      );
    }

    /*
    THE FOR LOOP HAS BEEN ADDED TO THIS FUNCTION!
    If a new block is deployed then the default variable name will be contained in the dropdown list.
    this loop searches through the elements of the dropdown list looking for a match with the default. 
    if found, it removes that element from the drop down. It also removes the delete option so that if
    the selected variable name matches the default variable name this means it is a new block and the
    user should only see a prompt for creating a 'New Location' within the variable dropdown
    */
    for(var i = 0; i < options.length; i++){
      if(options[i][0] == this.defaultVariableName){
        options.splice(i, 1); //splice out default variable name from list
        //if the default variable is selected you know block was just deployed so adjust dropdown accordingly        
        if(name == this.defaultVariableName){
          var j = options.length;
          while(j--){
            if(options[j][1] == Blockly.DELETE_VARIABLE_ID) options.splice(j, 1); //delete "delete variable option"
            else if(options[j][1] == Blockly.RENAME_VARIABLE_ID) options[j][0] = Blockly.Msg['RENAME_VARIABLE'].replace('Rename', "New");
            else if(options[j][1] == Blockly.Rapid.RETEACH_VARIABLE_ID) options.splice(j, 1); //delete "reteach variable option"
          }
        }
        break;      
      }
    }

    //ADDED! The purpose of this loop is to keep user from being able to change or delete the default Home Position variable
    //this is done by just removing the rename, reteach, and delete options from the drop down
    if(name == "Home Position"){
      var j = options.length;
      while(j--){
        if(options[j][1] == Blockly.DELETE_VARIABLE_ID) options.splice(j, 1); //delete "delete variable option"
        else if(options[j][1] == Blockly.RENAME_VARIABLE_ID) options.splice(j, 1);  //delete "rename variable option"
        else if(options[j][1] == Blockly.Rapid.RETEACH_VARIABLE_ID) options.splice(j, 1); //delete "reteach variable option"
      }
    }

    renameVariableWorkspace = this.sourceBlock_.workspace.id;   //ADDED! store workspace id where variable is being changed. used to check user input against workspace variables
    selectedVariable = name;  //save name of currently selected variable in dropdown in case of reteach
    return options;
  };
  

/**
 * This function is contained in blockly/core/field_variable.js
 * It handles the selection of elements in the dropdown and is being
 * adjusted for the case where the user selects "Reteach location"
 */

  /**
 * Handle the selection of an item in the variable dropdown menu.
 * Special case the 'Rename variable...' and 'Delete variable...' options.
 * In the rename case, prompt the user for a new name.
 * @param {!Blockly.Menu} menu The Menu component clicked.
 * @param {!Blockly.MenuItem} menuItem The MenuItem selected within menu.
 * @protected
 */
Blockly.FieldVariable.prototype.onItemSelected_ = function(menu, menuItem) {
  var id = menuItem.getValue();
  // Handle special cases.
  if (this.sourceBlock_ && this.sourceBlock_.workspace) {
    if (id == Blockly.RENAME_VARIABLE_ID) {
      // Rename variable.
      Blockly.Variables.renameVariable(
          this.sourceBlock_.workspace, this.variable_);
      return;
    } else if (id == Blockly.DELETE_VARIABLE_ID) {
      // Delete variable.
      this.sourceBlock_.workspace.deleteVariableById(this.variable_.getId());
      return;
    /**
     * ADDED! THIS PART WAS ADDED TO THE FUNCTION.
     * Else if handles the dropdown selection of reteach location
     */
    } else if (id == Blockly.Rapid.RETEACH_VARIABLE_ID){
      if (renameVariableWorkspace == leftWorkspace.id) arm = "LEFT";
      else if (renameVariableWorkspace == rightWorkspace.id) arm = "RIGHT";
      $('#position-modal').modal('show'); //show teach position modal
      $('#position-modal').attr('data-value', 'reteach-position');  //set data attribute of position modal to reteach-position (Used in confirm button)
      $("#position-modal-warning").html(`To reteach <b>${selectedVariable}</b> position, please move <b>${arm}</b> arm to the desired position.`);
      return;
    }
  }
  // Handle unspecial case.
  this.setValue(id);
};
