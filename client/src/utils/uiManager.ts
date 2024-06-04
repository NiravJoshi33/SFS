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

  addTextLabel(
    x: number,
    y: number,
    text: string,
    style: Phaser.Types.GameObjects.Text.TextStyle,
    labelWidth: number,
    labelHeight: number,
    cornerRadius: number,
    backgroundColor: number,
    borderColor: number,
    borderWidth: number
  ) {
    const graphics = this.scene.add.graphics();

    // draw the background
    graphics.fillStyle(backgroundColor, 1);
    graphics.fillRoundedRect(x, y, labelWidth, labelHeight, cornerRadius);

    // draw the border
    graphics.lineStyle(borderWidth, borderColor);
    graphics.strokeRoundedRect(x, y, labelWidth, labelHeight, cornerRadius);

    // calculate the position of the text
    const textX = x + 5;
    const textY = y + labelHeight / 2;
    const textLabel = this.scene.add
      .text(textX, textY, text, style)
      .setOrigin(0, 0.5);

    return { graphics, textLabel };
  }
}
