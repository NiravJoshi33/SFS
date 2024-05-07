import { Scene, Loader, GameObjects } from "phaser";
import { ALL_TOKENS, canvasSize } from "./utils";
import {
  numOfCols,
  numOfRows,
  horizontalMargin,
  verticalMargin,
  tileSpacing,
  tileScale,
} from "./utils";
import { enableSwap } from "./swap";

/**
 * Instantiate a new grid without pre-existing matches & enable swap functionality
 * @param {Scene} scene
 * @param {any} swap_music
 */
export function initiateGrid(scene, swap_music) {
  let grid = createGrid(scene);

  enableSwap(scene, grid, swap_music);
}

/**
 * Create a new grid and replace any pre-existing matches until there are no matches
 * @param {Scene} scene Phaser Game Scene
 */
function createGrid(scene) {
  const grid = [];
  for (let y = 0; y < numOfRows; y++) {
    let row = []; // Array for row
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
  // After initial grid is created, check for any pre-existing matches and resolve them
  resolveMatches(grid);
  return grid;
}

/**
 * Check for pre-existing matches and resolve them until no matches are found
 * @param {Array<Array>} grid Initial grid
 */
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
