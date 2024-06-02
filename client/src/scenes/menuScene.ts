import Phaser from "phaser";
import { canvasSize } from "../utils/gameConfig";
import type Server from "../services/server";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MenuScene",
    });
  }

  preload() {} // assets are already loaded in BootScene

  async create(data: { server: Server }) {
    const { server } = data;
    console.log(server);
    server.join();

    // add background image
    this.add.image(0, 0, "menuBGImg").setOrigin(0);

    // add play button
    const playBtn = this.add.image(canvasSize.width / 2, 500, "playBtnImg");
    playBtn.setInteractive();

    // add audio
    this.sound.add("playBtnClkSound");

    // play button click event
    playBtn.on("pointerdown", () => {
      //   this.scene.start("GameScene");
      console.log("play button clicked");
      this.sound.play("playBtnClkSound");
    });
  }
}
