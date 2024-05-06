const { Scene } = require("phaser");
const { ALL_TOKENS, canvasSize } = require("./utils.js");

// Grid Configurations
const numOfRows = 10;
const numOfCols = 8;
const tileSpacing = 72;
const tileScale = 0.25; // Scale down from 256px to 64px
const gridWidth = numOfCols * tileSpacing;
const gridHeight = numOfRows * tileSpacing;
const horizontalMargin = (canvasSize.width - gridWidth) / 2; //Centering Grid Horizontally
const verticalMargin = (canvasSize.height - gridHeight) / 2 + 100; // 100px offset from center

/**
 * Create a Grid of Tokens/Gems with All Functions
 * @param {Scene} game scene context
 */
function initiateGrid(scene) {
  createGrid(scene); // Create Grid without Pre-existing matches

  enableSwap(scene); // Enable Swapping Function for the Tiles
}

function createGrid(scene) {
  const grid = [];
  for (let y = 0; y < numOfRows; y++) {
    let row = []; // Array for each row
    for (let x = 0; x < numOfCols; x++) {
      // Fill each row array with number of tiles equal to columns
      let index = Phaser.Math.Between(0, ALL_TOKENS.length - 1);
      let tile = scene.add.sprite(
        horizontalMargin + x * tileSpacing,
        verticalMargin + y * tileSpacing,
        ALL_TOKENS[index]
      );
      tile.setOrigin(0);
      tile.setScale(tileScale); // Scaling 256px asset to 64px
      tile.setInteractive(); // Make tile interactive
      scene.input.setDraggable(tile); // Set the tile to draggable
      row.push(tile); // Add new tile to row array
    }
    grid.push(row); // Add new row array to grid 2 dimensional array
  }
  resolveMatches(grid);
}

function resolveMatches(grid) {
  let preexistingMatchExists = true;
  do {
    preexistingMatchExists = checkAndReplaceMatch(grid);
  } while (preexistingMatchExists === true);
}

function checkAndReplaceMatch(grid) {
  let matchExists = false;

  // Checking Matches in Rows
  for (let y = 0; y < grid.length; y++) {
    // Since our origin starts from top left corner, we will start from there and
    // check for the matches in right and down directions.
    // And since we need to check for match of at least three tiles, we can't check
    // the same for the last and second last tile. That is why we are substracting 2 from row array length.

    for (let x = 0; x < grid[y].length - 2; x++) {
      // Check for tiles with matching keys in two immediate tiles to target tile
      console.log(
        `Checking Match in Row for Target Tile at: (${x},${y}) position for tile type: ${grid[y][x].texture.key}`
      );
      if (
        grid[y][x].texture.key === grid[y][x + 1].texture.key &&
        grid[y][x].texture.key === grid[y][x + 2].texture.key
      ) {
        console.log(
          `Found Match at: (${x},${y}) position for tile type: ${grid[y][x].texture.key}`
        );
        matchExists = true;
        // Replace Matches Tiles with New One
        grid[y][x].setTexture(
          ALL_TOKENS[Phaser.Math.Between(0, ALL_TOKENS.length - 1)]
        );
        grid[y][x + 1].setTexture(
          ALL_TOKENS[Phaser.Math.Between(0, ALL_TOKENS.length - 1)]
        );
        grid[y][x + 2].setTexture(
          ALL_TOKENS[Phaser.Math.Between(0, ALL_TOKENS.length - 1)]
        );
      }
    }
  }

  // Checking Columns for Matches
  for (let x = 0; x < grid[0].length; x++) {
    for (let y = 0; y < grid.length - 2; y++) {
      console.log(
        `Checking Match in Row for Target Tile at: (${x},${y}) position for tile type: ${grid[y][x].texture.key}`
      );
      if (
        grid[y][x].texture.key === grid[y + 1][x].texture.key &&
        grid[y][x].texture.key === grid[y + 2][x].texture.key
      ) {
        console.log(
          `Checking Match in Row for Target Tile at: (${x},${y}) position for tile type: ${grid[y][x].texture.key}`
        );
        matchExists = true;
        // Replace matches tiles with new ones
        grid[y][x].setTexture(
          ALL_TOKENS[Phaser.Math.Between(0, ALL_TOKENS.length - 1)]
        );
        grid[y + 1][x].setTexture(
          ALL_TOKENS[Phaser.Math.Between(0, ALL_TOKENS.length - 1)]
        );
        grid[y + 2][x].setTexture(
          ALL_TOKENS[Phaser.Math.Between(0, ALL_TOKENS.length - 1)]
        );
      }
    }
  }
  return matchExists;
}

function enableSwap(scene) {
  // Add Drag Events to scene
  scene.input.on("drag", function (pointer, gameObject, dragX, dragY) {
    const startDrag = gameObject.getData("startDrag");

    const maxTileTravelDistance = tileSpacing;

    const movedX = Math.abs(dragX - startDrag.x); // Travelled Distance in x direction
    const movedY = Math.abs(dragY - startDrag.y); // Travelled Distance in y direction

    // If Tile has moved more in x direction, Snap it to X axis
    if (movedX > movedY) {
      // Horizontal movement
      if (movedX <= maxTileTravelDistance) {
        gameObject.x = dragX; // Let tile move within allowed distance
      } else {
        if (dragX - startDrag.x > 0) {
          // Tile is moving in right direction
          gameObject.x = startDrag.x + maxTileTravelDistance;
        } else if (dragX - startDrag.x < 0) {
          // Tile is moving in left direction
          gameObject.x = startDrag.x - maxTileTravelDistance;
        } else {
          // Tile is not moving
          gameObject.x = startDrag.x;
        }
      }
      gameObject.y = startDrag.y; // Lock y pos
    } else {
      // Vertical movement
      if (movedY <= maxTileTravelDistance) {
        gameObject.y = dragY; // Let tile move within allowed distance
      } else {
        if (dragY - startDrag.y > 0) {
          // Tile is moving in downward direction
          gameObject.y = startDrag.y + maxTileTravelDistance;
        } else if (dragY - startDrag.y < 0) {
          // Tile is moving in upward direction
          gameObject.y = startDrag.y - maxTileTravelDistance;
        } else {
          gameObject.y = startDrag.y;
        }
      }
      gameObject.x = startDrag.x; // Lock the x position
    }
  });

  scene.input.on("dragstart", function (pointer, gameObject) {
    gameObject.setDepth(1); // Bring the tile to front to stay over other tiles
    gameObject.setData("startDrag", { x: gameObject.x, y: gameObject.y });
    gameObject.setTint(0x999999); // Highlight the tile being dragged
  });

  scene.input.on("dragend", function (pointer, gameObject, dropped) {
    gameObject.clearTint(); // Remove tint on drop
    gameObject.setDepth(0); // Return the tile back to its original level
    if (!dropped) {
      gameObject.x = gameObject.input.dragStartX; // Reset Position if not dropped on valid target
      gameObject.y = gameObject.input.dragStartY;
    }
  });

  scene.input.on("drop", function (pointer, gameObject, dropZone) {
    // Calculate and swap positions
    let tempX = gameObject.x;
    let tempY = gameObject.y;
    gameObject.x = dropZone.x;
    gameObject.y = dropZone.y;
    dropZone.x = tempX;
    dropZone.y = tempY;
  });
}

module.exports = { initiateGrid };
