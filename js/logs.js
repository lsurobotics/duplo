function monitorLeftWorkspace(event) {
    console.log(event.type)

    switch(event.type) {
        /* Block Events */
        case Blockly.Events.BLOCK_CREATE:
            console.log('Event: BLOCK_CREATE')
        case Blockly.Events.BLOCK_DELETE:
            console.log('Event: BLOCK_DELETE')
        case Blockly.Events.BLOCK_CHANGE:
            console.log('Event: BLOCK_CHANGE')    
        case Blockly.Events.BLOCK_MOVE:
            console.log('Event: BLOCK_MOVE')
        case Blockly.Events.BLOCK_DRAG:
            console.log('Event: BLOCK_DRAG')    
        /* Variable Events */
        case Blockly.Events.VAR_CREATE:
            console.log('Event: VAR_CREATE')
        case Blockly.Events.VAR_DELETE:
            console.log('Event: VAR_DELETE')
        case Blockly.Events.VAR_RENAME:
            console.log('Event: VAR_RENAME')
        /* Other Events */
        case Blockly.Events.CLICK:
            console.log('Event: CLICK')
        case Blockly.Events.TRASHCAN_OPEN:
            console.log('Event: TRASHCAN_OPEN')
    }
}

function monitorRightWorkspace(event) {
}