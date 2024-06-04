import Phaser from "phaser";
import { canvasSize } from "../utils/gameConfig";
import type Server from "../services/server";
import UIManager from "../utils/uiManager";

const { width, height } = canvasSize;

export default class MenuScene extends Phaser.Scene {
  // class properties
  uiManager: UIManager;
  playBtn!: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "MenuScene",
    });

    this.uiManager = new UIManager(this);
  }

  preload() {} // assets are already loaded in BootScene

  async create(data: { server: Server }) {
    const { server } = data;
    console.log(server);
    await server.join();

    // add background image
    this.add.image(0, 0, "blackBG").setOrigin(0);

    // add audio
    this.sound.add("playBtnClkSound");

    // add play button
    this.playBtn = this.uiManager.addButton(
      width / 2,
      height / 2 + 400,
      "playBtnImg",
      () => {
        this.sound.play("playBtnClkSound");

        server.room.send("ready");

        this.scene.start("LobbyScene", { server });
      }
    );

    server.room.onMessage("game-start", () => {
      console.log("game-start message received");
      this.scene.start("GameScene", { server });
    });
  }
}
