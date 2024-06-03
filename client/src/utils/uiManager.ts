import Phaser from "phaser";

export default class UIManager {
  constructor(private scene: Phaser.Scene) {
    this.scene = scene;
  }

  addButton(x: number, y: number, key: string, callback: () => void) {
    const btn = this.scene.add.image(x, y, key);
    btn.setInteractive();
    btn.on("pointerdown", callback);
    return btn;
  }
}
