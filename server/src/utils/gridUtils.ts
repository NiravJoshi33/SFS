import { ALL_TOKENS, numOfCols, numOfRows } from "./gameConfig";
import { logger } from "./logger";
import { InnerArray } from "./gameState";
import { convertGridToArray2D } from "./dataUtils";
import { Room } from "colyseus";

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
        console.log(`Found match at (${x},${y})`);
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
        console.log(`Found match at (${x},${y})`);
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
  console.log("Match Data List: ", matchDataList);
  return matchDataList;
}

export function removeMatches(
  grid: number[][],
  tilesToRemove: { x: number; y: number }[]
) {
  // create a new grid to store the updated grid
  let updatedGrid = grid;
  let newlyAddedTiles: { x: number; y: number; index: number }[] = [];

  for (let x = 0; x < grid[0].length; x++) {
    let emptyTiles = 0;
    for (let y = grid.length - 1; y >= 0; y--) {
      if (tilesToRemove.find((tile) => tile.x === x && tile.y === y)) {
        emptyTiles++;
      } else {
        updatedGrid[y + emptyTiles][x] = grid[y][x]; // move tile down
      }
    }

    // add new tiles to the top of the grid
    for (let i = 0; i < emptyTiles; i++) {
      updatedGrid[i][x] = getRandomInt(0, ALL_TOKENS.length - 1);
      newlyAddedTiles.push({ x, y: i, index: updatedGrid[i][x] });
    }
  }

  return { updatedGrid, newlyAddedTiles };
}

export function isSwapPossible(grid: number[][], room: Room) {
  // check for horizontal swaps
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length - 1; x++) {
      // swap with right tile
      let temp = grid[y][x];
      grid[y][x] = grid[y][x + 1];
      grid[y][x + 1] = temp;

      // check if the swap results in a match
      let matchDataList = findMatches(grid);
      let matches = matchDataList.flatMap((matchData) => matchData.matches);

      if (matches.length > 0) {
        // swap back
        temp = grid[y][x];
        grid[y][x] = grid[y][x + 1];
        grid[y][x + 1] = temp;

        console.log(`Horizontal swap possible at (${x},${y})`);
        room.broadcast("swap-possible", { x, y });
        return {
          swapPossible: true,
          swapCandidates: { tileA: { x, y }, tileB: { x: x + 1, y } },
        };
      }

      // swap back
      temp = grid[y][x];
      grid[y][x] = grid[y][x + 1];
      grid[y][x + 1] = temp;
    }
  }

  // check for vertical swaps
  for (let x = 0; x < grid[0].length; x++) {
    for (let y = 0; y < grid.length - 1; y++) {
      // swap with tile below
      let temp = grid[y][x];
      grid[y][x] = grid[y + 1][x];
      grid[y + 1][x] = temp;

      // check if the swap results in a match
      let matchDataList = findMatches(grid);
      let matches = matchDataList.flatMap((matchData) => matchData.matches);

      if (matches.length > 0) {
        // swap back
        temp = grid[y][x];
        grid[y][x] = grid[y + 1][x];
        grid[y + 1][x] = temp;

        console.log(`Vertical swap possible at (${x},${y})`);
        room.broadcast("swap-possible", { x, y });
        return {
          swapPossible: true,
          swapCandidates: { tileA: { x, y }, tileB: { x, y: y + 1 } },
        };
      }

      // swap back
      temp = grid[y][x];
      grid[y][x] = grid[y + 1][x];
      grid[y + 1][x] = temp;
    }
  }
  return {
    swapPossible: false,
    swapCandidates: null,
  };
}
