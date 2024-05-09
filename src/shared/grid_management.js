import { createGrid } from "./grid_utils";
import { enableSwap } from "./swap";

/**
 * Instantiate a new grid without pre-existing matches & enable swap functionality
 * @param {Scene} scene Game scene
 * @param {Phaser.Sound.WebAudioSound} swap_music Swap sound effect
 */
export function initiateGrid(scene, swap_music) {
  // Create a new grid for the scene
  let grid = createGrid(scene);

  // Enable swap functionality
  enableSwap(scene, grid, swap_music);

  return grid;
}
