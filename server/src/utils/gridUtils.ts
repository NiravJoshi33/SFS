import { ALL_TOKENS, numOfCols, numOfRows } from "./gameConfig";
import { logger } from "./logger";
import { InnerArray } from "./gameState";

export function createGrid(): InnerArray[] {
  const grid: InnerArray[] = [];

  for (let y = 0; y < numOfRows; y++) {
    let row: InnerArray = new InnerArray();

    for (let x = 0; x < numOfCols; x++) {
      let index: number = getRandomInt(0, ALL_TOKENS.length - 1);
      row.innerArray.push(index);
    }
    grid.push(row);
  }
  console.log(grid);
  return grid;
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resolveMatches(grid: number[][]) {
  let matchExists: boolean = true;
  do {
    // keep resolving matches until there are no more matches
    matchExists = checkAndReplaceMatches(grid);
  } while (matchExists === true);
}

function checkAndReplaceMatches(grid: number[][]): boolean {
  let matchExists: boolean = false;

  for (let y = 0; y < grid.length; y++) {
    // Since our origin starts from top left corner, we will start from there and
    // check for the match in right and down directions.
    // And since we need to check for match of at least three tiles, we can't check
    // the same for the last and second last tile. That is why we are substracting 2 from row array length.
    for (let x = 0; x < grid[y].length - 2; x++) {
      if (grid[y][x] === grid[y][x + 1] && grid[y][x] === grid[y][x + 2]) {
        matchExists = true;

        // replace matched tile index with random index
        grid[y][x] = getRandomInt(0, ALL_TOKENS.length - 1);
        grid[y][x + 1] = getRandomInt(0, ALL_TOKENS.length - 1);
        grid[y][x + 2] = getRandomInt(0, ALL_TOKENS.length - 1);
      }
    }
  }

  // Checking Columns for matches
  for (let x = 0; x < grid[0].length; x++) {
    for (let y = 0; y < grid.length - 2; y++) {
      if (grid[y][x] === grid[y + 1][x] && grid[y][x] === grid[y + 2][x]) {
        logger.info(`Found Match at: (${x},${y}) position }`);
        matchExists = true;

        // Replace matches tiles with new ones
        grid[y][x] = getRandomInt(0, ALL_TOKENS.length - 1);
        grid[y + 1][x] = getRandomInt(0, ALL_TOKENS.length - 1);
        grid[y + 2][x] = getRandomInt(0, ALL_TOKENS.length - 1);
      }
    }
  }
  return matchExists;
}

export function areTilesAdjacent(
  tileA: { x: number; y: number },
  tileB: { x: number; y: number }
): boolean {
  const diffX = Math.abs(tileA.x - tileB.x);
  const diffY = Math.abs(tileA.y - tileB.y);
  return diffX + diffY === 1;
}
