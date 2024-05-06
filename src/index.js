import Phaser from "phaser";
import { ALL_TOKENS, canvasSize } from "./utils.js";
import { initiateGrid } from "./grid.js";

// Configuration

const config = {
  type: Phaser.CANVAS,
  width: canvasSize.width,
  height: canvasSize.height,
  parent: "game",
  physics: { default: "arcade" },
  scene: { preload, create },
};

// Loading Assets: Images, Music, Animations etc
function preload() {
  // "this" context - scene
  // contains functions and properties
  // can be viewed by typing "this" and pressing "enter" on console when game is loaded

  // Loading UI Elements
  this.load.image("bg", "assets/bg_720x1280.png");
  this.load.image("title", "assets/title_720x200_new.png");
  this.load.image("left_user_bubble", "assets/ui/left_user_bubble_300x100.png");
  this.load.image(
    "right_user_bubble",
    "assets/ui/right_user_bubble_300x100.png"
  );

  // Loop Through All Tokens from "ALL_TOKEN" array and Load Assets
  // Take care of naming convention for the following loop to work
  for (let i = 0; i < ALL_TOKENS.length; i++) {
    this.load.image(
      `${ALL_TOKENS[i]}`,
      `assets/tokens/${ALL_TOKENS[i]}_coin.png`
    );
  }
}

// Initializing Instances of Objects
function create() {
  // Add UI Elements to Scene
  this.add.image(config.width / 2, config.height / 2, "bg");
  this.add.image(config.width / 2, 100, "title").setAlpha(0.9);
  this.add.image(0, 210, "left_user_bubble").setOrigin(0, 0).setScale(1.1);
  this.add
    .image(config.width - 330, 210, "right_user_bubble")
    .setOrigin(0, 0)
    .setScale(1.1);

  // Initiate Grid without any Pre-existing Matches & Swap Function
  initiateGrid(this);
}

new Phaser.Game(config);
