const Phaser = require("phaser");
const { ALL_TOKENS, canvasSize } = require("../shared/utils.js");
const { initiateGrid } = require("../shared/grid_management.js");
const { imageAssets, audioAssets } = require("../shared/assets.js");
const client = require("./client.js");
const { enableSwap } = require("../shared/swap.js");

let socket = client.init("ws://localhost:8085");

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

  // Loading Images
  for (const assetKey in imageAssets) {
    this.load.image(assetKey, imageAssets[assetKey]);
  }

  // Loop Through All Tokens from "ALL_TOKEN" array and Load Assets
  // Take care of naming convention for the following loop to work
  for (let i = 0; i < ALL_TOKENS.length; i++) {
    this.load.image(
      `${ALL_TOKENS[i]}`,
      `assets/tokens/${ALL_TOKENS[i]}_coin.png`
    );
  }

  // Loading audio
  for (const assetKey in audioAssets) {
    this.load.audio(assetKey, audioAssets[assetKey]);
  }

  // Error handling
  this.load.on("complete", () => console.log(`All assets loaded successfully`));
  this.load.on("loaderror", () => console.log(`Error loading assets`));
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

  // Send request to server to create a new grid
  client.sendData(socket, {
    type: "createGridRequest",
    data: {},
  });

  socket.onmessage = function (message) {
    console.log(`Received message from server: ${message.data}`);
    let parsedMessage = JSON.parse(message);
    if (parsedMessage.type === "createGridResponse") {
      let grid = parsedMessage.data.gridStatus;
      enableSwap(grid);
    }
  };
}

new Phaser.Game(config);
