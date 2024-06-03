import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene",
    });
  }

  create() {
    this.add.text(20, 20, "Game Scene", {
      font: "32px Arial",
      color: "#ffffff",
    });
  }
}
