import Phaser from "phaser";
import { ALL_TOKENS, numOfCols, numOfRows, tileSpacing } from "./gameConfig";
import { horizontalMargin, verticalMargin, tileScale } from "./gameConfig";

export function renderGrid(scene: Phaser.Scene, gridArrangement: number[][]) {
  const grid: Phaser.GameObjects.Sprite[][] = [];

  for (let y = 0; y < numOfRows; y++) {
    let row: Phaser.GameObjects.Sprite[] = [];
    for (let x = 0; x < numOfCols; x++) {
      let index: number = gridArrangement[y][x];

      // select a token using the index from token array
      let tile: Phaser.GameObjects.Sprite = scene.add.sprite(
        horizontalMargin + x * tileSpacing,
        verticalMargin + y * tileSpacing,
        ALL_TOKENS[index]
      );
      tile.setOrigin(0);
      tile.setScale(tileScale);
      tile.setInteractive();
      scene.input.setDraggable(tile); // make the token draggable
      row.push(tile); // add the index to the row array
    }
    grid.push(row); // add the row array to the grid array
  }
  return grid;
}

export function convertGridToArray2D(grid: any[]): number[][] {
  const gridArray: number[][] = [];
  console.log(grid);

  for (let innerArray of grid) {
    gridArray.push(innerArray.innerArray);
  }
  console.log(gridArray);
  return gridArray;
}

export function validateGridState(
  clientGrid: Phaser.GameObjects.Sprite[][] | null[][],
  serverGrid: any[]
): boolean {
  // convert the server grid to a 2D array
  const serverGridArray: number[][] = convertGridToArray2D(serverGrid);

  // iterate over the client grid and compare it with the server grid
  for (let y = 0; y < numOfRows; y++) {
    for (let x = 0; x < numOfCols; x++) {
      if (clientGrid[y][x] !== null) {
        if (
          clientGrid[y][x]?.texture.key !== ALL_TOKENS[serverGridArray[y][x]]
        ) {
          return false;
        }
      }
    }
  }

  return true;
}
