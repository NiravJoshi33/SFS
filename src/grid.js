import { Scene } from "phaser";
import { ALL_TOKENS, canvasSize } from "./utils.js";

// Grid Configurations
const numOfRows = 10;
const numOfCols = 8;
const tileSpacing = 72;
const tileScale = 0.25; // Scale down from 256px to 64px
const gridWidth = numOfCols * tileSpacing;
const gridHeight = numOfRows * tileSpacing;
const horizontalMargin = (canvasSize.width - gridWidth) / 2; //Centering Grid Horizontally
const verticalMargin = (canvasSize.height - gridHeight) / 2 + 100; // 100px offset from center
const swapTriggerDistance = tileSpacing * 0.5; // After the cursor travels this distance, swap is triggered

/**
 * Create a Grid of Tokens/Gems with All Functions
 * @param {Scene} game scene context
 */
export function initiateGrid(scene, swipe_music) {
  let grid = createGrid(scene); // Create Grid without Pre-existing matches

  enableSwap(scene, grid, swipe_music); // Enable Swapping Function for the Tiles
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
  return grid;
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

function enableSwap(scene, grid, swipe_music) {
  // Add Drag Events to scene
  scene.input.on("drag", function (pointer, gameObject, dragX, dragY) {
    const startDrag = gameObject.getData("startDrag");
    const movedX = Math.abs(dragX - startDrag.x);
    const movedY = Math.abs(dragY - startDrag.y);
    let axisOfMovement = movedX > movedY ? "horizontal" : "vertical";

    if (!gameObject.getData("swapTriggered")) {
      // Check if swap wasn't already triggered
      if (
        (axisOfMovement === "horizontal" && movedX >= swapTriggerDistance) ||
        (axisOfMovement === "vertical" && movedY >= swapTriggerDistance)
      ) {
        const direction =
          axisOfMovement === "horizontal"
            ? dragX - startDrag.x > 0
              ? "right"
              : "left"
            : dragY - startDrag.y > 0
            ? "downward"
            : "upward";
        console.log(`Swap attempted in ${axisOfMovement} direction`);
        let swapTarget = findSwapTarget(
          gameObject,
          grid,
          axisOfMovement,
          direction
        );
        if (swapTarget) {
          swapTiles(gameObject, swapTarget, scene, grid);
          swipe_music.play();
          gameObject.setData("swapTriggered", true); // Set swap as triggered

          // Check for the matches
          let matches;
          matches = checkForMatches(grid);
          if (matches && matches.length > 0) {
            console.log(`Found ${matches.length} matches in grid`);

            matches.forEach((match) => {
              match.matchedTiles.forEach((tile) => {
                removeTile(tile, scene, grid);
                refillGrid(grid, scene);
              });
            });

            matches = [];
          }
        } else {
          console.log(`Matches: ${matches.length}`);
          console.log(`No matches found, reverting the swap`);
        }
      }
    }
  });

  scene.input.on("dragstart", function (pointer, gameObject) {
    gameObject.setDepth(1); // Bring the tile to front to stay over other tiles
    gameObject.setData("startDrag", { x: gameObject.x, y: gameObject.y });
    gameObject.setTint(0x999999); // Highlight the tile being dragged
  });

  scene.input.on("dragend", function (pointer, gameObject) {
    gameObject.clearTint(); // Remove tint on drop
    gameObject.setDepth(0); // Return the tile back to its original level
    gameObject.setData("swapTriggered", false); // Reset swap triggered status
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

function findSwapTarget(gameObject, grid, movementAxis, movementDirection) {
  // Calculate end position based on where the drag ended
  let targetTile, originalPixelPosX, originalPixelPosY;

  originalPixelPosX = gameObject.getData("startDrag").x;
  originalPixelPosY = gameObject.getData("startDrag").y;

  const originalGridPosX = Math.floor(
    (originalPixelPosX - horizontalMargin) / tileSpacing
  );
  const originalGridPosY = Math.floor(
    (originalPixelPosY - verticalMargin) / tileSpacing
  );

  if (movementAxis === "horizontal") {
    if (
      movementDirection === "right" //&&
      // originalGridPosX >= 0 &&
      // originalPixelPosX < numOfCols - 1
    ) {
      targetTile = grid[originalGridPosY][originalGridPosX + 1];
    } else if (
      movementDirection === "left" //&&
      // originalGridPosX > 0 &&
      // originalGridPosX <= numOfCols - 1
    ) {
      targetTile = grid[originalGridPosY][originalGridPosX - 1];
    }
  } else if (movementAxis === "vertical") {
    if (
      movementDirection === "downward" //&&
      // originalGridPosY >= 0 &&
      // originalGridPosY < numOfRows - 1
    ) {
      targetTile = grid[originalGridPosY + 1][originalGridPosX];
    } else if (
      movementDirection === "upward" //&&
      // originalGridPosY > 0 &&
      // originalGridPosY <= numOfRows - 1
    ) {
      targetTile = grid[originalGridPosY - 1][originalGridPosX];
    }
  }

  return targetTile;
}

function swapTiles(tile1, tile2, scene, grid) {
  console.log(`Swapping ${tile1.texture.key} with ${tile2.texture.key}`);
  // Calculate grid positions from pixels
  const pos1 = getGridPos(tile1.x, tile1.y);
  const pos2 = getGridPos(tile2.x, tile2.y);

  // Swap positions in the grid data structure

  let tempTile = grid[pos1.y][pos1.x];
  grid[pos1.y][pos1.x] = grid[pos2.y][pos2.x];
  grid[pos2.y][pos2.x] = tempTile;

  // Animate tile movement
  scene.tweens.add({
    targets: tile1,
    x: tile2.x,
    y: tile2.y,
    duration: 300,
    ease: "Power2",
  });

  scene.tweens.add({
    targets: tile2,
    x: tile1.x,
    y: tile1.y,
    duration: 300,
    ease: "Power2",
  });
}

function getGridPos(x, y) {
  return {
    x: Math.floor((x - horizontalMargin) / tileSpacing),
    y: Math.floor((y - verticalMargin) / tileSpacing),
  };
}

function checkForMatches(grid) {
  const matches = [];
  let matchData;

  // Check horizontal matches
  for (let y = 0; y < numOfRows; y++) {
    for (let x = 0; x < numOfCols - 2; x++) {
      if (
        grid[y][x].texture.key === grid[y][x + 1].texture.key &&
        grid[y][x].texture.key === grid[y][x + 2].texture.key
      ) {
        matchData = {
          matchedTiles: [grid[y][x], grid[y][x + 1], grid[y][x + 2]],
          direction: "horizontal",
        };
        matches.push(matchData);
      }
    }
  }

  // Check vertical matches
  for (let x = 0; x < numOfCols; x++) {
    for (let y = 0; y < numOfRows - 2; y++) {
      if (
        grid[y][x].texture.key === grid[y + 1][x].texture.key &&
        grid[y][x].texture.key === grid[y + 2][x].texture.key
      ) {
        matchData = {
          matchedTiles: [grid[y][x], grid[y + 1][x], grid[y + 2][x]],
          direction: "vertical",
        };
        matches.push(matchData);
      }
    }
  }
  console.log(matches);
  return matches;
}

function removeTile(tile, scene, grid) {
  // Create a fade out tween for the tile
  let tileGridPos = getGridPos(tile.x, tile.y);

  scene.time.delayedCall(400, () => {
    scene.tweens.add({
      targets: tile,
      alpha: 0, // Fades out the tile
      duration: 500,
      ease: "Power2",
      onComplete: () => {
        tile.destroy(); // Destroys the tile object entirely
        grid[tileGridPos.y][tileGridPos.x] = null;
        console.log(
          `Tile at position (${tileGridPos.x}, ${tileGridPos.y}) set to null`
        );
        console.log(grid);
        refillGrid(grid, scene);
      },
    });
  });
}

function refillGrid(grid, scene) {
  // Loop through each column
  console.log(`Attempting to refill grid`);
  console.log(`Grid: ${grid}`);
  console.log(`Grid size: ${grid.length} x ${grid[0].length}`);
  for (let x = 0; x < numOfCols; x++) {
    let emptySpaces = 0; // We will check and fill columns one by one
    for (let y = numOfRows - 1; y >= 0; y--) {
      // Check from the bottom row
      if (grid[y][x] === null) {
        // If the grid position is empty
        console.log(
          `Found empty tile at x: ${x}, y: ${y}, replacing it with tiles above`
        );
        emptySpaces++;
      } else if (emptySpaces > 0) {
        // If the grid position has tile and there are empty positions below it
        // Move the tile down
        const tile = grid[y][x];
        grid[y + emptySpaces][x] = tile; // Move the tile by the number of empty spaces
        grid[y][x] = null;

        // Animate tile falling
        scene.tweens.add({
          targets: tile,
          y: tile.y + emptySpaces * tileSpacing,
          duration: 300,
          ease: "Power2",
        });
      } else {
        console.log(`Found no empty tiles to fill`);
      }
    }

    // Generate new tiles at the top where there are empty spaces
    for (let i = 0; i < emptySpaces; i++) {
      // We need as many new tiles as empty spaces
      let index = Phaser.Math.Between(0, ALL_TOKENS.length - 1);
      let newTile = scene.add
        .sprite(
          horizontalMargin + x * tileSpacing,
          verticalMargin - (i + 1) * tileSpacing,
          ALL_TOKENS[index]
        )
        .setOrigin(0)
        .setScale(tileScale)
        .setInteractive();

      grid[i][x] = newTile;

      // Animate the new tiles falling into place
      scene.tweens.add({
        targets: newTile,
        y: verticalMargin + (emptySpaces + i) * tileSpacing,
        duration: 300,
        ease: "Power2",
      });
    }
  }
}
