import Phaser from "phaser";
import { canvasSize } from "./utils/gameConfig";
import { BootScene } from "./scenes/bootScene";
import MenuScene from "./scenes/menuScene";
import LobbyScene from "./scenes/lobbyScene";
import GameScene from "./scenes/gameScene";

// defining game configuration
const config = {
  type: Phaser.AUTO, // Phaser will decide how to render our game (WebGL or Canvas)
  width: canvasSize.width,
  height: canvasSize.height,
  scene: [BootScene, MenuScene, LobbyScene, GameScene],
  scale: {
    mode: Phaser.Scale.FIT, // Fit the game to the window
    autoCenter: Phaser.Scale.CENTER_BOTH, // Center the game on the window
  },
  dom: {
    createContainer: true, // Create a div element to hold the game canvas
  },
};

// creating a new game instance
export const game = new Phaser.Game(config);
