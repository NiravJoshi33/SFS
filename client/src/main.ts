import Phaser from "phaser";
import { canvasSize } from "./utils/gameConfig";
import { BootScene } from "./scenes/bootScene";
import MenuScene from "./scenes/menuScene";

// defining game configuration
const config = {
  type: Phaser.AUTO, // Phaser will decide how to render our game (WebGL or Canvas)
  width: canvasSize.width,
  height: canvasSize.height,
  scene: [BootScene, MenuScene],
  scale: {
    mode: Phaser.Scale.FIT, // Fit the game to the window
    autoCenter: Phaser.Scale.CENTER_BOTH, // Center the game on the window
  },
};

// creating a new game instance
export const game = new Phaser.Game(config);
