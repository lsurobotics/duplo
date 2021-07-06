function monitorLeftWorkspace(event) {
    logMessage = filterEvent(event);
    if (logMessage != null) {
        logMessage = logMessage + ', Workspace: Left'
        submitLogMessage(logMessage);    
    }
}

function monitorRightWorkspace(event) {
    logMessage = filterEvent(event);
    if (logMessage != null) {
        logMessage = logMessage + ', Workspace: Right'
        submitLogMessage(logMessage);    
    }    
}

function filterEvent(event) {
    eventWorkspace = Blockly.Workspace.getById(event.workspaceId);
    eventBlock = eventWorkspace.getBlockById(event.blockId);

    switch(event.type) {
        /* Block Events */
        case Blockly.Events.BLOCK_CREATE:
            logMessage = '<Prototype Log> Event: BLOCK_CREATE'
            break;
        case Blockly.Events.BLOCK_DELETE:
            logMessage = '<Prototype Log> Event: BLOCK_DELETE'
            break;
        case Blockly.Events.BLOCK_CHANGE:
            logMessage = '<Prototype Log> Event: BLOCK_CHANGE'
            break;
        case Blockly.Events.BLOCK_MOVE:
            logMessage = '<Prototype Log> Event: BLOCK_MOVE'
            break;
        case Blockly.Events.BLOCK_DRAG:
            logMessage = '<Prototype Log> Event: BLOCK_DRAG'
            break;
        /* Variable Events */
        case Blockly.Events.VAR_CREATE:
            logMessage = '<Prototype Log> Event: VAR_CREATE'
            logMessage = logMessage + ', Variable Name: ' + event.varName.toString()
            break;
        case Blockly.Events.VAR_DELETE:
            logMessage = '<Prototype Log> Event: VAR_DELETE'
            logMessage = logMessage + ', Variable Name: ' + event.varName.toString()
            break;
        case Blockly.Events.VAR_RENAME:
            logMessage = '<Prototype Log> Event: VAR_RENAME'
            logMessage = logMessage + ', Old Name: ' + event.oldName.toString()
            logMessage = logMessage + ', New Name: ' + event.newName.toString()
            break;
        default:
            return null;
    }
    
    if (eventBlock != null) {
        logMessage = logMessage + ', Block: ' + eventBlock.type
    }

    return logMessage;
}

newWorkspaceButton = document.getElementById("reload-button");
saveWorkspaceButton = document.getElementById("save-button"); 
openWorkspaceButton = document.getElementById("open-file-button"); 
startButton = document.getElementById("start-button");
homeButton = document.getElementById("home-button");
leftHandSwitchButton = document.getElementById("left-hand-switch-button")
rightHandSwitchButton = document.getElementById("right-hand-switch-button")
leftRightHandSwitchButton = document.getElementById("left-right-hand-switch-button")

newWorkspaceButton.addEventListener("click", function() {
    logMessage = '<Prototype Log> Event: CLICK_NEW_WORKSPACE_BUTTON'
    submitLogMessage(logMessage);
});

saveWorkspaceButton.addEventListener("click", function() {
    logMessage = '<Prototype Log> Event: CLICK_SAVE_WORKSPACE_BUTTON'
    submitLogMessage(logMessage);
});

openWorkspaceButton.addEventListener("click", function() {
    logMessage = '<Prototype Log> Event: CLICK_OPEN_WORKSPACE_BUTTON'
    submitLogMessage(logMessage);
});

startButton.addEventListener("click", function() {
    logMessage = '<Prototype Log> Event: CLICK_START_BUTTON'
    submitLogMessage(logMessage);
});

homeButton.addEventListener("click", function() {
    logMessage = '<Prototype Log> Event: CLICK_HOME_BUTTON'
    submitLogMessage(logMessage);
});

leftHandSwitchButton.addEventListener("click", function() {
    logMessage = '<Prototype Log> Event: CLICK_LEFT_HAND_SWITCH_BUTTON'
    logMessage = logMessage + ', Button Value: ' + leftHandSwitchButton.value
    submitLogMessage(logMessage);
});

rightHandSwitchButton.addEventListener("click", function() {
    logMessage = '<Prototype Log> Event: CLICK_RIGHT_HAND_SWITCH_BUTTON'
    logMessage = logMessage + ', Button Value: ' + rightHandSwitchButton.value
    submitLogMessage(logMessage);
});

leftRightHandSwitchButton.addEventListener("click", function() {
    logMessage = '<Prototype Log> Event: CLICK_LEFT_RIGHT_HAND_SWITCH_BUTTON'
    logMessage = logMessage + ', Button Value: ' + leftRightHandSwitchButton.value
    submitLogMessage(logMessage);
});

function submitLogMessage(logMessage) {
    datetime = new Date().toLocaleString()
    logMessage = logMessage + ', Date: ' + datetime.toString()
    console.log(logMessage)
    window.chrome.webview.postMessage(logMessage);
}