import Phaser from "phaser";
import { canvasSize } from "./utils/gameConfig";

// defining game configuration
const config = {
  type: Phaser.AUTO, // Phaser will decide how to render our game (WebGL or Canvas)
  width: canvasSize.width,
  height: canvasSize.height,
  scene: [],
  scale: {
    mode: Phaser.Scale.FIT, // Fit the game to the window
    autoCenter: Phaser.Scale.CENTER_BOTH, // Center the game on the window
  },
};

// creating a new game instance
const game = new Phaser.Game(config);
