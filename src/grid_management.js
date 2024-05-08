import { createGrid } from "./grid_utils";
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
