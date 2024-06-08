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
    // console.log(server);
    await server.join();

    // console.log(server.room.sessionId);

    // add background image
    this.add.image(0, 0, "menuBGImg").setOrigin(0);

    // add audio
    this.sound.add("playBtnClkSound");

    // add powered by image
    this.add.image(width / 2, height / 2 + 300, "poweredBy").setScale(0.5);

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
