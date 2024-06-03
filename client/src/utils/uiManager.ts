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

  addProfilePicture(x: number, y: number, key: string, scale: number) {
    // add profile picture
    const profilePic = this.scene.add.image(x, y, key);
    profilePic.setScale(scale);
    profilePic.setOrigin(0.5);

    // add frame around profile picture
    const frame = this.scene.add.image(x, y, "pfp_frame");
    frame.setScale(scale);
    frame.setOrigin(0.5);

    return { profilePic, frame };
  }
}
