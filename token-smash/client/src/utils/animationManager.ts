import Phaser from "phaser";

export class AnimationManager {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  animateNotification(
    target:
      | Phaser.GameObjects.Image
      | Phaser.GameObjects.Text
      | Phaser.GameObjects.Sprite,
    endX: number,
    duration: number,
    ease: string,
    delay?: number,
    onComplete?: () => void
  ) {
    delay = delay || 0;
    setTimeout(() => {
      this.scene.tweens.add({
        targets: target,
        duration: duration,
        ease: ease,
        x: endX,
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });
    }, delay);
  }
}
