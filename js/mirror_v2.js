// Array of accepted blocks
var mirroredBlocks = ['custom_close', 'custom_open'];

function createBlockEvent(leftWorkspaceEvent) {
    if (leftWorkspaceEvent instanceof Blockly.Events.BlockCreate) {
        var leftBlock = leftWorkspace.getBlockById(leftWorkspaceEvent.blockId);
        // If the block does not exists or the block is not a mirrored type block, return.
        if (!leftBlock || !mirroredBlocks.includes(leftBlock.type)) {
            return;
        } else {
            // Otherwise, create the block on the right workspace.
            var rightBlock = rightWorkspace.newBlock(leftBlock.type, leftBlock.id);
            rightBlock.initSvg();
            rightBlock.render();
            rightBlock.moveTo(leftBlock.getRelativeToSurfaceXY());
        }
    }
}

function moveBlockEvent(primaryWorkspaceEvent) {
    if (primaryWorkspaceEvent instanceof Blockly.Events.BlockMove) {
        /* Checks which workspace is moving blocks. We call as "primary"
           the workspace where the block is being moved, and "secondary"
           the workspace where the block is being mirrored. */
        if (primaryWorkspaceEvent.workspaceId === leftWorkspace.id) {
            var primaryWorkspace = leftWorkspace;
            var secondaryWorkspace = rightWorkspace;
        } else {
            var primaryWorkspace = rightWorkspace;
            var secondaryWorkspace = leftWorkspace;
        }

        var primaryBlock = primaryWorkspace.getBlockById(primaryWorkspaceEvent.blockId);

        // If the block does not exists or the block is not a mirrored type block, return.
        if (!primaryBlock || !mirroredBlocks.includes(primaryBlock.type)) {
            return;
        } else {
            Blockly.Events.disable();
            var primaryWorkspaceJSON = primaryWorkspaceEvent.toJson();
            var secondaryEvent = Blockly.Events.fromJson(primaryWorkspaceJSON, secondaryWorkspace);
            secondaryEvent.run(true);
            Blockly.Events.enable();
        }
    }
}

function dragFromStartEvent(leftWorkspaceEvent) {
    if (leftWorkspaceEvent instanceof Blockly.Events.Ui) {
        // If the block is being dragged from the toolbox
        if (leftWorkspaceEvent.element == "dragStart") {
            var leftBlock = rightWorkspace.getBlockById(leftWorkspaceEvent.blockId);

            // If the block does not exists or the block is not a mirrored type block, return.
            if (!leftBlock || !mirroredBlocks.includes(leftBlock.type)) {
                return;
            } else {
                //startX = pageX;
                //startY = pageY;
                //offsetX = 0;
                //offsetY = 0;
                dragger = new Blockly.BlockDragger(leftBlock, rightWorkspace);
                dragger.startBlockDrag(new Blockly.utils.Coordinate(0, 0), false);
            }
        }
       return;
    }
}

function deleteBlockEvent(rightWorkspaceEvent) {
     if (rightWorkspaceEvent instanceof Blockly.Events.Delete) {
        var leftBlock = leftWorkspace.getBlockById(rightWorkspaceEvent.blockId);

        // If the block does not exists, ignore the delete event.
        if (!leftBlock) {
            return;
        }

        // If the block is not a mirrored type block, return.
        if (!mirroredBlocks.includes(leftBlock.type)) {
            return; 
        } else {
            // Otherwise, delete the block on the left workspace.
            leftBlock.dispose();
        }
    }
}