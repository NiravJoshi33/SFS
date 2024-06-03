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
