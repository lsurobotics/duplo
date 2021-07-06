var openFileButton = document.getElementById('open-file-button');

openFileButton.onclick = function() {
  window.chrome.webview.postMessage('OPEN_FILE');
  window.chrome.webview.addEventListener('message', openFileReceivedEvent);
}

function openFileReceivedEvent(event){
  //filename is being sent so add to workspace bar
  //(this is sent from webview first)
  if(event.data.includes(".json")){
    var filename_display = document.getElementById("workspace-filename");
    filename_display.innerHTML = `${event.data}`;
  }
  //there was an error so remove the event listener
  else if(event.data == "OPEN_FILE_ERROR"){
    window.chrome.webview.removeEventListener('message', openFileReceivedEvent);
  }
  //file contents are now being sent
  //remove event listener at end
  else{
    var file = JSON.parse(event.data);
    leftArmRobTargets = file.leftArmRobTargets;
    leftArmRobTargets["Home Position"] = leftHomePosition;  //home position defined in robtargets.js

    rightArmRobTargets = file.rightArmRobTargets;
    rightArmRobTargets["Home Position"] = rightHomePosition;  //home position defined in robtargets.js

    /*This loads the xml back into the workspace*/
    var leftWorkspace_xml = Blockly.Xml.textToDom(file.leftWorkspace_xml_text);
    Blockly.Xml.clearWorkspaceAndLoadFromXml(leftWorkspace_xml, leftWorkspace);
    var rightWorkspace_xml = Blockly.Xml.textToDom(file.rightWorkspace_xml_text);
    Blockly.Xml.clearWorkspaceAndLoadFromXml(rightWorkspace_xml, rightWorkspace);

    //get all variables within the workspaces to see if "Home Position" is there
    var leftWorkspaceVariables = leftWorkspace.getAllVariables();
    if(leftWorkspaceVariables.find(o => o.name.toLowerCase() === "Home Position") === undefined) leftWorkspace.createVariable("Home Position");

    var rightWorkspaceVariables = rightWorkspace.getAllVariables();
    if(rightWorkspaceVariables.find(o => o.name.toLowerCase() === "Home Position") === undefined) rightWorkspace.createVariable("Home Position");

    window.chrome.webview.removeEventListener('message', openFileReceivedEvent);
  }
}