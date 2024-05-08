import Phaser from "phaser";
import { ALL_TOKENS, canvasSize } from "./utils.js";
import { initiateGrid } from "./grid_management.js";

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
  this.load.image("dp1", "assets/sample_user_data/sample_dp1.png");
  this.load.image("dp2", "assets/sample_user_data/sample_dp2.png");

  // Loop Through All Tokens from "ALL_TOKEN" array and Load Assets
  // Take care of naming convention for the following loop to work
  for (let i = 0; i < ALL_TOKENS.length; i++) {
    this.load.image(
      `${ALL_TOKENS[i]}`,
      `assets/tokens/${ALL_TOKENS[i]}_coin.png`
    );
  }

  // Loading audio
  this.load.audio("main_music", "assets/audio/main_music.mp3");
  this.load.audio("swipe", "assets/audio/swipe.mp3");
  this.load.audio("tap", "assets/audio/ball_tap.wav");
}

// Initializing Instances of Objects
function create() {
  // Add UI Elements to Scene
  this.add.image(config.width / 2, config.height / 2, "bg");
  this.add.image(config.width / 2, 100, "title").setAlpha(0.9);
  const user1_bubble = this.add
    .image(0, 210, "left_user_bubble")
    .setOrigin(0, 0)
    .setScale(1.1);
  const user2_bubble = this.add
    .image(config.width - 330, 210, "right_user_bubble")
    .setOrigin(0, 0)
    .setScale(1.1);

  const dp1 = this.add
    .image(user1_bubble.x + 5, user1_bubble.y + 5, "dp1")
    .setOrigin(0)
    .setScale(1.1);

  const dp2 = this.add
    .image(canvasSize.width - 105, user2_bubble.y + 5, "dp2")
    .setOrigin(0)
    .setScale(1.1);

  // Add audio
  let mainMusic = this.sound.add("main_music", { loop: true });
  let swipe = this.sound.add("swipe", { loop: false });
  let tap = this.sound.add("tap", { loop: false });
  this.data.set("tap", this.sound.get("tap"));

  // mainMusic.play();

  // Initiate Grid without any Pre-existing Matches & Swap Function
  initiateGrid(this, swipe);
}

new Phaser.Game(config);
