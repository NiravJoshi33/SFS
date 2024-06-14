import { InnerArray } from "./gameState";

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
