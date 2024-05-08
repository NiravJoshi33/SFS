import { Scene } from "phaser";
import {
  swapTriggerDistance,
  horizontalMargin,
  verticalMargin,
  tileSpacing,
  numOfRows,
  numOfCols,
  ALL_TOKENS,
  tileScale,
} from "./utils";
import { userState } from "./utils";
import { createGrid } from "./grid_utils";

/**
 * Enable swapping of tiles
 * @param {Scene} scene Game scene
 * @param {Array<Array>} grid 2D Array of grid
 * @param {audio object} swap_music Swap sound effect
 */
export function enableSwap(scene, grid, swap_music) {
  scene.input.on("drag", function (pointer, gameObject, dragX, dragY) {
    const startDrag = gameObject.getData("startDrag");
    const movedX = Math.abs(startDrag.x - dragX);
    const movedY = Math.abs(startDrag.y - dragY);

    let axisOfMovement = movedX > movedY ? "horizontal" : "vertical";

    if (!gameObject.getData("swapTriggered")) {
      // Check if swap was already triggered

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

        console.log(
          `Attempting swap in ${direction} direction on ${axisOfMovement} axis`
        );
        if (userState.canSwap == true) {
          let swapTarget = getSwapTarget(
            gameObject,
            grid,
            axisOfMovement,
            direction
          );

          if (swapTarget) {
            swapTiles(gameObject, swapTarget, scene, grid);
            swap_music.play();
            gameObject.setData("swapTriggered", true); // Set swap as triggered to avoid rechecking
          }
        } else if (userState.canSwap == false) {
          alert(`Your turn is over. Allow other player to finish their turn.`);
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

/**
 * Returns the swap target for the given game object, grid, axis of movement, and direction.
 *
 * @param {GameObject} gameObject - The game object to find the swap target for.
 * @param {Array<Array>} grid - The grid containing the game objects.
 * @param {string} axisOfMovement - The axis of movement ('x' or 'y').
 * @param {string} direction - The direction of movement ('up', 'down', 'left', or 'right').
 * @returns {GameObject|null} - The swap target game object, or null if no swap target is found.
 */
function getSwapTarget(gameObject, grid, axisOfMovement, direction) {
  // Calculate the end position based on where the drag ended
  let targetTile, originalPixelPosX, originalPixelPosY;

  originalPixelPosX = gameObject.getData("startDrag").x;
  originalPixelPosY = gameObject.getData("startDrag").y;

  const originalGridPosX = Math.floor(
    (originalPixelPosX - horizontalMargin) / tileSpacing
  );
  const originalGridPosY = Math.floor(
    (originalPixelPosY - verticalMargin) / tileSpacing
  );

  if (axisOfMovement === "horizontal") {
    direction === "right"
      ? (targetTile = grid[originalGridPosY][originalGridPosX + 1])
      : (targetTile = grid[originalGridPosY][originalGridPosX - 1]);
  } else if (axisOfMovement === "vertical") {
    direction === "downward"
      ? (targetTile = grid[originalGridPosY + 1][originalGridPosX])
      : (targetTile = grid[originalGridPosY - 1][originalGridPosX]);
  }
  return targetTile;
}

/**
 * Swaps the position of two tiles in the grid.
 *
 * @param {GameObject} gameObject - The original tile to swap
 * @param {GameObject} targetTile - The target tile to swap with.
 * @param {Scene} scene - The game scene.
 * @param {Array<Array>} grid - The grid containing the tiles.
 */
function swapTiles(tile1, tile2, scene, grid) {
  console.log(`Swapping ${tile1.texture.key} with ${tile2.texture.key}`);

  // Calculate grid positions from pixel coordinates
  const tile1GridPos = getGridPosition(tile1.x, tile1.y);
  const tile2GridPos = getGridPosition(tile2.x, tile2.y);

  // Swap positions in the grid data structure
  let tempTile = grid[tile1GridPos.y][tile1GridPos.x];
  grid[tile1GridPos.y][tile1GridPos.x] = grid[tile2GridPos.y][tile2GridPos.x];
  grid[tile2GridPos.y][tile2GridPos.x] = tempTile;

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
    onComplete: function () {
      // After the animation is complete, check for matches
      let matches = checkForMatches(grid);
      if (matches && matches.length > 0) {
        console.log(`Found ${matches.length} matches in grid`);
        removeMatchedTiles(matches, scene, grid);
      } else {
        // If no matches, swap the tiles back
        scene.tweens.add({
          targets: tile1,
          x: tile2.x,
          y: tile2.y,
          duration: 300,
          ease: "Power2",
          onComplete: function () {
            // Swap the tiles back in the grid data structure
            grid[tile1GridPos.y][tile1GridPos.x] = tile1;
            grid[tile2GridPos.y][tile2GridPos.x] = tile2;
          },
        });

        scene.tweens.add({
          targets: tile2,
          x: tile1.x,
          y: tile1.y,
          duration: 300,
          ease: "Power2",
          onComplete: function () {
            // Swap the tiles back in the grid data structure
            grid[tile1GridPos.y][tile1GridPos.x] = tile1;
            grid[tile2GridPos.y][tile2GridPos.x] = tile2;
          },
        });
      }
    },
  });
}

/**
 * Returns the grid position of a tile based on its pixel coordinates.
 *
 * @param {number} x - The pixel x-coordinate of the tile.
 * @param {number} y - The pixel y-coordinate of the tile.
 * @returns {Object} - The grid position of the tile.
 */
function getGridPosition(x, y) {
  return {
    x: Math.floor((x - horizontalMargin) / tileSpacing),
    y: Math.floor((y - verticalMargin) / tileSpacing),
  };
}

/**
 * Check for matches in the grid and resolve them.
 *
 * @param {Array<Array<GameObject>>} grid - The grid to check for matches.
 */
function checkForMatches(grid) {
  const matches = [];
  let matchData;

  // Check for horizontal matches
  for (let y = 0; y < numOfRows; y++) {
    for (let x = 0; x < numOfCols - 2; x++) {
      console.log(`Checking matches for selected tile at: y: ${y}, x: ${x}`);
      if (
        grid[y][x] &&
        grid[y][x + 1] &&
        grid[y][x + 2] &&
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

  // Check for vertical matches
  for (let x = 0; x < numOfCols; x++) {
    for (let y = 0; y < numOfRows - 2; y++) {
      if (
        grid[y][x] &&
        grid[y + 1][x] &&
        grid[y + 2][x] &&
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
  return matches;
}

/**
 * Remove matched tiles from the grid and refill the grid.
 *
 * @param {Array<Object>} matches - An array of match data objects.
 * @param {Scene} scene - The game scene.
 * @param {Array<Array<GameObject>>} grid - The grid containing the tiles.
 */
function removeMatchedTiles(matches, scene, grid) {
  let fadeOutCount = 0;

  matches.forEach((match) => {
    match.matchedTiles.forEach((tile) => {
      let tileGridPos = getGridPosition(tile.x, tile.y);

      scene.time.delayedCall(400, () => {
        fadeOutCount++;

        scene.tweens.add({
          targets: tile,
          alpha: 0, // Fades out the tile
          duration: 500,
          ease: "Power2",
          onComplete: () => {
            tile.destroy(); // Destroy the tile after fading out
            grid[tileGridPos.y][tileGridPos.x] = null; // Remove the tile from grid data structure

            fadeOutCount--;
            // userState.canSwap = false;

            if (fadeOutCount === 0) {
              dropTiles(grid, scene);
            }
          },
        });
      });
    });
  });
}

/**
 * Drop tiles in the grid to fill empty spaces.
 *
 * @param {Array<Array<GameObject>>} grid - The grid containing the tiles.
 * @param {Scene} scene - The game scene.
 */
function dropTiles(grid, scene) {
  console.log(`Dropping tiles!`);

  // Retrieving the sound effect
  let tap = scene.data.get("tap");

  // Loop through each column
  for (let x = 0; x < numOfCols; x++) {
    let emptySpaces = 0;

    // Loop through each cell in column from bottom to top
    for (let y = numOfRows - 1; y >= 0; y--) {
      if (grid[y][x] == null) {
        console.log(`Found empty space at y: ${y}, x: ${x}`);
        emptySpaces++;
      } else if (emptySpaces > 0) {
        let tile = grid[y][x];
        grid[y][x] = null;
        grid[y + emptySpaces][x] = tile;

        // Animate the tile falling
        scene.tweens.add({
          targets: tile,
          y: tile.y + emptySpaces * tileSpacing,
          duration: 100 * emptySpaces,
          ease: "Power2",
          onComplete: () => {
            tap.play();
          },
        });
      }
    }

    // Refill the empty spaces at the top
    for (let i = 0; i < emptySpaces; i++) {
      let tile = scene.add.sprite(
        horizontalMargin + x * tileSpacing,
        verticalMargin - tileSpacing * (i + 1),
        ALL_TOKENS[Phaser.Math.Between(0, ALL_TOKENS.length - 1)]
      );
      console.log(`New tile created: ${tile.texture.key}`);
      tile.setOrigin(0).setScale(tileScale).setInteractive();
      scene.input.setDraggable(tile);
      grid[i][x] = tile;

      // Animate the tile falling
      scene.tweens.add({
        targets: tile,
        y: verticalMargin + i * tileSpacing,
        duration: 100 * emptySpaces,
        ease: "Power2",
        onComplete: () => {
          tap.play();
          let isSuccessfulSwapPossible = checkForPotentialMatches(grid);
          if (isSuccessfulSwapPossible === false || !isSuccessfulSwapPossible) {
            console.log("No potential matches found. Reshuffling tiles.");
            createGrid(scene);
          }
        },
      });
    }
  }
}

/**
 * Check for potential matches in the grid.
 *
 * @param {Array<Array<GameObject>>} grid - The grid containing the tiles.
 */
function checkForPotentialMatches(grid) {
  for (let y = 0; y < numOfRows; y++) {
    for (let x = 0; x < numOfCols; x++) {
      // Check all four directions
      for (let [dy, dx] of [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]) {
        // Index of the swap target tile
        let ny = y + dy;
        let nx = x + dx;
        // Swap tiles
        if (ny >= 0 && ny < numOfRows && nx >= 0 && nx < numOfCols) {
          let tempTile = grid[y][x];
          grid[y][x] = grid[ny][nx];
          grid[ny][nx] = tempTile;
          // Check for match
          let matches = checkForMatches(grid);
          // Swap back
          tempTile = grid[y][x];
          grid[y][x] = grid[ny][nx];
          grid[ny][nx] = tempTile;
          // If match found, return true
          if (matches && matches.length > 0) {
            console.log(
              `Potential match found at y: ${y}, x: ${x} with tile at y: ${ny}, x: ${nx}`
            );
            return true;
          }
        }
      }
    }
  }
}
