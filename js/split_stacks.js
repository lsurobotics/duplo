// Contains adjustments to functions needing to traverse split stacks instead of regular stacks.


// Additions to BlockSvg

/**
 * Returns the next block connected below this one, whether a physically connected block,
 * one at the top of a split stack, or null.
 */
function nextInSplitStack(block) {
  if (!block) return null;
  if (block.getNextBlock()) return block.getNextBlock();

  // Go up the blocks on your side, searching for mirrored blocks.
  var yourBlock = block;
  do {
    if (getMirror(yourBlock)) break;
    else if (yourBlock.getPreviousBlock()) yourBlock = yourBlock.getPreviousBlock();
    else break;
  } while (true);

  var otherBlock;

  //special case: first mirrored ancester is a container block
  if (yourBlock.getParent() && !yourBlock.getPreviousBlock()) {
    otherBlock = getMirror(yourBlock.getParent());
    if (!otherBlock) {
      console.error("Container block is not mirrored.");
      return null;
    }
    //1st block in otherBlock's matching input; same position as yourBlock
    otherBlock = otherBlock.getMatchingConnection(yourBlock.getParent(), yourBlock.getParent().getInputWithBlock(yourBlock).connection).getTargetBlock();
  }
  //normal case: mirrored block?
  else {
    otherBlock = getMirror(yourBlock);
  }

  // Search for first mirrored block below otherBlock on the other side.
  while (otherBlock) {
    otherBlock = otherBlock.getNextBlock();
    if (getMirror(otherBlock)) break;
  }

  if (!otherBlock) return null;
  else return getMirror(otherBlock).getTopStackBlock();
}

/**
 * Returns this block's visual parent, whether a physically connected block,
 * one at the bottom of a split stack, this block's container, or null.
 */
function parentInSplitStack(block) {
  if (!block) return null;
  if (block.getParent()) return block.getParent();

  // Go down the blocks on your side, searching for mirrored blocks.
  var yourBlock = block;
  do {
    if (getMirror(yourBlock)) break;
    else yourBlock = yourBlock.getPreviousBlock();
  } while (yourBlock);

  var otherBlock = getMirror(yourBlock);
  if (!otherBlock) return null;

  // Go up the blocks on the other side, searching for mirrored blocks.
  while (otherBlock.getPreviousBlock()) {
    otherBlock = otherBlock.getPreviousBlock();
    if (getMirror(otherBlock)) break;
  }

  //special case: first mirrored ancester is a container block
  if (otherBlock.getParent() && !otherBlock.getPreviousBlock()) {
    yourBlock = getMirror(otherBlock.getParent());
    if (!yourBlock) {
      console.error("Container block is not mirrored.");
      return null;
    }
    //1st block in yourBlock's's matching input; same position as otherBlock
    yourBlock = yourBlock.getMatchingConnection(otherBlock.getParent(), otherBlock.getParent().getInputWithBlock(otherBlock).connection).getTargetBlock();
  }
  //normal case: mirrored block?
  else {
    yourBlock = getMirror(otherBlock);
  }

  if (!yourBlock) return null;
  else return yourBlock.lastConnectionInStack().getSourceBlock();
}

/**
 * Returns the first block that visually lies in this input, whether a physically connected block,
 * one at the top of a split stack, or null.
 * @param block A mirrored container block that contains an input named `name`.
 * @param {String} name The name of the input to explore.
 */
function inputInSplitStack(block, name) {
  if (!block) return null;
  if (block.getInputTargetBlock(name)) return block.getInputTargetBlock(name);

  var containerMirror = getMirror(block);
  if (!containerMirror || !containerMirror.getInputTargetBlock(name)) return null;

  // Go down the blocks on the other side, searching for mirrored blocks.
  var otherBlock = containerMirror.getInputTargetBlock(name);
  do {
    if (getMirror(otherBlock)) break;
    else otherBlock = otherBlock.getNextBlock();
  } while (otherBlock);

  if (!otherBlock) return null;
  else return getMirror(otherBlock).getTopStackBlock();
}

/**
 * Returns the last connection in the very last split stack connecting beneath this block, or null if it ends without a next connection.
 */
function lastConnectionInSplitStack(topBlock) {
  if (!topBlock) return null;
  var lowestMirror = null;
  var block = topBlock;
  if (getMirror(block)) lowestMirror = getMirror(block);
  while (block.nextConnection) {
    if (!block.nextConnection.targetBlock() && !lowestMirror) {
      // Found a next connection with nothing on the other side, and there are no mirrored blocks to turn to.
      return block.nextConnection;
    }
    else if (!block.nextConnection.targetBlock()) {
      // You ran out of connections, but this could be a split stack.
      break;
    }
    block = block.nextConnection.targetBlock();
    if (getMirror(block)) lowestMirror = getMirror(block);
  }
  if (lowestMirror) {
    var otherBlock = lowestMirror;
    while(otherBlock.getNextBlock()) {
      otherBlock = otherBlock.getNextBlock();
      if (getMirror(otherBlock)) return lastConnectionInSplitStack(getMirror(otherBlock));
    }
    return block.nextConnection;
  }

  // Ran out of next connections.
  return null;
}


/**
 * Returns whether or not the stack beginning with `topBlock` contains any mirrored blocks.
 */
function isMirroringStack(topBlock) {
  do {
    if (getMirror(topBlock)) return true;
    topBlock = topBlock.getNextBlock();
  } while (topBlock);
  return false;
}




// Adjustments to functions

// The function change for lastOnStack chooses the last connection on a split stack for dragging.
Blockly.InsertionMarkerManager.prototype.initAvailableConnections_ = function() {
  var available = this.topBlock_.getConnections_(false);
  // Also check the last connection on this stack
  var lastOnStack = lastConnectionInSplitStack(this.topBlock_); // Function changed from this.topBlock_.lastConnectionInStack(). ONLY CHANGE
  if (lastOnStack && lastOnStack != this.topBlock_.nextConnection) {
    available.push(lastOnStack);
    if (!this.topBlock_.nextConnection.targetBlock()) available.splice(available.indexOf(this.topBlock_.nextConnection), 1); // Removes extra connection
    this.lastOnStack_ = lastOnStack;
    this.lastMarker_ = this.createMarkerBlock_(lastOnStack.getSourceBlock());
  }
  return available;
};

// Allows split stacks to render ancestors in the same way that normal stacks do.
Blockly.BlockSvg.prototype.render = function(opt_bubble) {
  if (this.renderIsInProgress_) {
    return;  // Don't allow recursive renders.
  }
  this.renderIsInProgress_ = true;
  try {
    this.rendered = true;
    Blockly.utils.dom.startTextWidthCache();

    if (this.isCollapsed()) {
      this.updateCollapsed_();
    }
    this.workspace.getRenderer().render(this);
    this.updateConnectionLocations_();

    if (opt_bubble !== false) {
      var parentBlock = parentInSplitStack(this); // Function changed from this.getParent(). ONLY CHANGE
      if (parentBlock) {
        parentBlock.render(true);
      } else {
        // Top-most block. Fire an event to allow scrollbars to resize.
        this.workspace.resizeContents();
      }
    }

    Blockly.utils.dom.stopTextWidthCache();
    this.updateMarkers_();
  } finally {
    this.renderIsInProgress_ = false;
  }
};

// Allows for container blocks to begin with a split stack.
Blockly.Generator.prototype.statementToCode = function(block, name) {
  var targetBlock = inputInSplitStack(block, name); // Function changed from block.getInputTargetBlock(name). ONLY CHANGE
  var code = this.blockToCode(targetBlock);
  // Value blocks must return code and order of operations info.
  // Statement blocks must only return code.
  if (typeof code != 'string') {
    throw TypeError('Expecting code from statement block: ' +
        (targetBlock && targetBlock.type));
  }
  if (code) {
    code = this.prefixLines(/** @type {string} */ (code), this.INDENT);
  }
  return code;
};