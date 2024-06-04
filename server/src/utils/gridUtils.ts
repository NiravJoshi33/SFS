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

  resolveMatches(convertGridToArray2D(grid));

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

export function convertGridToArray2D(grid: InnerArray[]): number[][] {
  const gridArray: number[][] = [];

  for (let innerArray of grid) {
    gridArray.push(innerArray.innerArray);
  }
  return gridArray;
}

export function convertArray2DToGrid(gridArray: number[][]): InnerArray[] {
  const grid: InnerArray[] = [];

  for (let row of gridArray) {
    let innerArray: InnerArray = new InnerArray();
    for (let index of row) {
      innerArray.innerArray.push(index);
    }
    grid.push(innerArray);
  }
  return grid;
}

export function findMatches(grid: number[][]) {
  let matchDataList: {
    numOfMatches: number;
    matches: { x: number; y: number }[];
  }[] = [];
  let matches: { x: number; y: number }[] = [];
  let wipeCompleteRow: boolean = false;
  let wipeCompleteCol: boolean = false;

  // check for horizontal matches
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length - 2; x++) {
      if (grid[y][x] === grid[y][x + 1] && grid[y][x] === grid[y][x + 2]) {
        matches.push({ x, y });
        matches.push({ x: x + 1, y });
        matches.push({ x: x + 2, y });

        // check for more matches in the same row
        let i = x + 3;
        if (i < grid[y].length && grid[y][x] === grid[y][i]) {
          matches = []; // reset matches

          for (let x = 0; x < grid[y].length; x++) {
            matches.push({ x, y }); // add all row to matches
          }
          wipeCompleteRow = true;
        }

        matchDataList.push({ numOfMatches: matches.length, matches });
        matches = []; // reset matches

        if (wipeCompleteRow === true) {
          wipeCompleteRow = false;
          break;
        }

        x = i - 1; // skip the next two tiles
        // here i is incremented until the match condition fails.
        // after the match condition fails, we need to start checking again for the new matches from that tile.
        // now in the last loop that failed the check, i was incremented by 1, so we need to go back one step
        // to consider that tile for the new match condition.
      }
    }
  }

  // check for vertical matches
  for (let x = 0; x < grid[0].length; x++) {
    for (let y = 0; y < grid.length - 2; y++) {
      if (grid[y][x] === grid[y + 1][x] && grid[y][x] === grid[y + 2][x]) {
        matches.push({ x, y });
        matches.push({ x, y: y + 1 });
        matches.push({ x, y: y + 2 });

        // check for more matches in the same column
        let i = y + 3;
        if (i < grid.length && grid[y][x] === grid[i][x]) {
          matches = []; // reset matches

          for (let y = 0; y < grid.length; y++) {
            matches.push({ x, y }); // add all column to matches
          }
          wipeCompleteCol = true;
        }

        matchDataList.push({ numOfMatches: matches.length, matches });
        matches = []; // reset matches

        if (wipeCompleteCol === true) {
          wipeCompleteCol = false;
          break;
        }

        y = i - 1; // skip the next two tiles
      }
    }
  }

  return matchDataList;
}
