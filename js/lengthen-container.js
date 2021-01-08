// Makes it so that mirrored container blocks, such as loop blocks, expand to be each other's length.

// Overrides the default RenderInfo.computeBounds_ function to change the height of matching loop blocks.
var originalComputeBounds = Blockly.blockRendering.RenderInfo.prototype.computeBounds_;

Blockly.blockRendering.RenderInfo.prototype.computeBounds_ = function() {
  originalComputeBounds.apply(this);

  // (Height of empty controls_repeat block) - (height of the empty statement input)
  var BASE_HEIGHT = Math.max(this.constants_.TOP_ROW_PRECEDES_STATEMENT_MIN_HEIGHT, this.constants_.MEDIUM_PADDING + this.constants_.FIELD_TEXT_HEIGHT + this.constants_.MEDIUM_PADDING) + this.constants_.STATEMENT_BOTTOM_SPACER + this.constants_.BOTTOM_ROW_AFTER_STATEMENT_MIN_HEIGHT + this.constants_.NOTCH_HEIGHT;

  //after the bounds have been computed, add to the end of the function w/ adjustments
  if (this.block_.type == "controls_repeat") {
    var fromLeft = (this.block_.workspace == leftWorkspace);
    var otherBlock = getMirror(this.block_);
    if (otherBlock && this.inputRows[1]) {
      // Indices for the blocks on your side and the other side, respectively.
      const your = 0;
      const other = 1;

      // The height this input statement should be on each side WITHOUT mirroring
      var height = [this.constants_.MIN_BLOCK_HEIGHT, this.constants_.MIN_BLOCK_HEIGHT];
      
      // Add the heights of each side's blocks
      var firstInputs = [inputInSplitStack(this.block_, "DO"), inputInSplitStack(otherBlock, "DO")];
      [your, other].forEach(index => {
        var block = firstInputs[index];
        //no input -> just min height
        if (!block) return;
        //connected directly to loop -> add normal height
        if (block.getParent()) height[index] = block.getHeightWidth().height;
        //split stack at top -> add normal height + extra visual space gap above
        else {
          //or more specifically... normal height - (distance to highest mirror block on this side) + (distance to top on other side)
          //                      = normal height - (normal height - highest mirror block height) + (other side height - matching mirror block height)
          //                      = highest mirror block height - matching mirror block height + other side height
          var highestMirror = block;
          do {
            if (getMirror(highestMirror)) break;
            else highestMirror = highestMirror.getNextBlock();
          } while (highestMirror);
          height[index] = highestMirror.getHeightWidth().height - getMirror(highestMirror).getHeightWidth().height + firstInputs[(index+1)%2].getHeightWidth().height;
        }
      });

      this.inputRows[1].height = Math.max(height[your], height[other]);

      //wait an instant for this block to render before rendering the other block - it will grow
      if (this.inputRows[1].height != otherBlock.height - BASE_HEIGHT) {
        setTimeout(function() {
          otherBlock.render();

          resolveBlocks(otherBlock.id, !fromLeft);
        }, 1);
      }
    }
  }




  // Visual correction for insertion markers of mutating move blocks (originally look too long)
  if (this.block_.type == 'custom_move' && this.isInsertionMarker) this.block_.updateShape_('null');
};


// This is from the Blockly library and is edited to calculate the size of a split stack. It is almost completely changed.
Blockly.BlockSvg.prototype.getHeightWidth = function() {
  var block = this;
  var endsInConnection;
  var width = 0;
  var heightToMirror = 0, heightSinceMirror = 0;
  var lowestMirror;
  const tabHeight = this.workspace.getRenderer().getConstants().NOTCH_HEIGHT;
  do {
    if (!lowestMirror) heightToMirror += block.height - tabHeight;
    else heightSinceMirror += block.height - tabHeight;

    if (getMirror(block)) {
      lowestMirror = block;
      heightToMirror += heightSinceMirror;
      heightSinceMirror = 0;
    }

    width = Math.max(width, block.width);

    endsInConnection = !!block.nextConnection;
    block = block.getNextBlock();
  }
  while (block);

  if (lowestMirror) {
    otherBlock = getMirror(lowestMirror);
    var betweenHeight = 0;
    while (otherBlock.getNextBlock()) {
      otherBlock = otherBlock.getNextBlock();
      if (getMirror(otherBlock)) {
        var nextStackHeightWidth = getMirror(otherBlock).getHeightWidth();
        return {height: heightToMirror + betweenHeight + nextStackHeightWidth.height, width: Math.max(width, nextStackHeightWidth.width)}
      }
      betweenHeight += otherBlock.height - tabHeight;
    }
  }

  return {height: heightToMirror + heightSinceMirror + (endsInConnection ? tabHeight : 0), width: width};
};