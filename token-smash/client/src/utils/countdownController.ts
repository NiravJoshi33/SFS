import { colors } from "./colors";
import { canvasSize } from "./gameConfig";

export class CountdownController {
  private scene: Phaser.Scene;
  private duration!: number;
  private timerEvent?: Phaser.Time.TimerEvent;
  private finishedCallback?: () => void;
  private loadingBar!: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  start(
    duration: number,
    loadingBar: Phaser.GameObjects.Graphics,
    callback?: () => void
  ) {
    // if any timer is running, stop it
    this.stop();

    this.loadingBar = loadingBar;

    this.finishedCallback = callback;

    this.duration = duration;
    this.timerEvent = this.scene.time.addEvent({
      delay: this.duration,
      callback: () => {
        this.stop();

        if (this.finishedCallback) {
          this.finishedCallback();
        }
      },
      callbackScope: this,
      loop: false,
    });
  }

  stop() {
    if (this.timerEvent) {
      this.timerEvent.destroy();
      this.timerEvent = undefined;
    }
  }

  update() {
    // if timer is not running, do nothing
    if (!this.timerEvent || this.duration <= 0) {
      return;
    }

    // calculate the remaining time & update the label
    const elapsedTime = this.timerEvent?.getElapsed();
    // const remainingTime = this.duration - elapsedTime;
    // const timeInSeconds = remainingTime / 1000;

    // this.label.setText(`${timeInSeconds.toFixed(1)} seconds`); // display remaining time

    // update the loading bar
    this.loadingBar.clear();
    this.loadingBar.fillStyle(colors.violet, 1);
    this.loadingBar.fillRect(
      this.loadingBar.x,
      this.loadingBar.y,
      canvasSize.width * (elapsedTime / this.duration),
      16
    );
  }
}
