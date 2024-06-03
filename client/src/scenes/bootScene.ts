// importing dependencies
import Phaser from "phaser";
import { audioAssetMap, imageAssetMap, profilePicMap } from "../utils/assets";
import { ALL_TOKENS } from "../utils/gameConfig";
import Server from "../services/server";

export class BootScene extends Phaser.Scene {
  server!: Server;
  loadBar!: Phaser.GameObjects.Graphics;
  progressBar!: Phaser.GameObjects.Graphics;

  constructor() {
    super({
      key: "BootScene",
    });
  }

  init() {
    this.server = new Server();
  }

  preload() {
    this.createBars(); // create loading bars
    this.setLoadEvents(); // set load events
    this.loadAssets(); // load assets
  }

  createBars() {
    // 'Loading...' text
    this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "Loading...",
        { font: "32px Arial", color: "#ffffff" }
      )
      .setOrigin(0.5);

    // loading bar background
    this.loadBar = this.add.graphics();
    this.loadBar.fillStyle(0x0088aa, 0.8);
    this.loadBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 + 300,
      this.cameras.main.width / 2 + 4,
      20
    );

    // create a loading bar
    this.progressBar = this.add.graphics();
  }

  setLoadEvents() {
    this.load.on("progress", this.onFileProgress, this);
    this.load.on("complete", this.onComplete, this);
  }

  onFileProgress(value: number) {
    this.progressBar.clear();
    this.progressBar.fillStyle(0xd40000, 1);
    this.progressBar.fillRect(
      this.cameras.main.width / 4,
      this.cameras.main.height / 2 + 300,
      (this.cameras.main.width / 2) * value,
      16
    );
  }

  onComplete() {
    console.log("All assets loaded");
    this.scene.launch("MenuScene", { server: this.server });
  }

  loadAssets() {
    for (let asset in imageAssetMap) {
      this.load.image(imageAssetMap[asset].key, imageAssetMap[asset].path);
    }

    ALL_TOKENS.forEach((token) => {
      this.load.image(token, `assets/tokens/${token}_coin.png`);
    });

    for (let asset in profilePicMap) {
      this.load.image(profilePicMap[asset].key, profilePicMap[asset].path);
    }

    for (let asset in audioAssetMap) {
      this.load.audio(audioAssetMap[asset].key, audioAssetMap[asset].path);
    }
  }
}
