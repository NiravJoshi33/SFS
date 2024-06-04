import Phaser from "phaser";
import { swapTriggerDistance, horizontalMargin } from "./gameConfig";
import { verticalMargin, numOfCols, numOfRows } from "./gameConfig";
import { tileSpacing } from "./gameConfig";
import { type Room } from "colyseus.js";

export function enableSwap(
  scene: Phaser.Scene,
  grid: Phaser.GameObjects.Sprite[][],
  room: Room
) {
  scene.input.on(
    "dragstart",
    (_: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite) =>
      handleDragStart(gameObject)
  );

  scene.input.on(
    "dragend",
    (_: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite) => {
      handleDragEnd(gameObject);
    }
  );

  scene.input.on(
    "drag",
    (
      _: Phaser.Input.Pointer,
      gameObject: Phaser.GameObjects.Sprite,
      dragX: number,
      dragY: number
    ) => {
      handleDrag(gameObject, dragX, dragY, grid, room);
    }
  );
}

function handleDragStart(gameObject: Phaser.GameObjects.Sprite) {
  console.log("drag start");

  gameObject.setData("start-drag", { x: gameObject.x, y: gameObject.y });
  gameObject.setDepth(1); // bring the token to the top
  gameObject.setTint(0x999999); // tint the token
}

function handleDragEnd(gameObject: Phaser.GameObjects.Sprite) {
  console.log("drag end");
  gameObject.setDepth(0); // return the token to its original depth
  gameObject.clearTint(); // clear the tint
}

function handleDrag(
  gameObject: Phaser.GameObjects.Sprite,
  dragX: number,
  dragY: number,
  grid: Phaser.GameObjects.Sprite[][],
  room: Room
) {
  let swapTarget: Phaser.GameObjects.Sprite | undefined;

  const startDragPos: { x: number; y: number } =
    gameObject.getData("start-drag");

  // calculate the distance moved by tile
  const movedX: number = Math.abs(startDragPos.x - dragX);
  const movedY: number = Math.abs(startDragPos.y - dragY);

  // determine axis of movement
  let axisOfMovement: string = movedX > movedY ? "horizontal" : "vertical";

  if (!gameObject.getData("swapTriggered")) {
    if (
      (axisOfMovement === "horizontal" && movedX > swapTriggerDistance) ||
      (axisOfMovement === "vertical" && movedY > swapTriggerDistance)
    ) {
      const direction: string =
        axisOfMovement === "horizontal"
          ? dragX - startDragPos.x > 0
            ? "right"
            : "left"
          : dragY - startDragPos.y > 0
          ? "down"
          : "up";

      // get the tile that the current tile is swapping with
      swapTarget = getSwapTarget(gameObject, grid, direction);

      if (swapTarget) {
        const selectedTileGridPos = getGridPosition(
          startDragPos.x,
          startDragPos.y
        );
        const swapTargetGridPos = getGridPosition(swapTarget.x, swapTarget.y);

        console.log("sending swap request");

        room.send("swap-attempt", {
          tileA: selectedTileGridPos,
          tileB: swapTargetGridPos,
        });

        gameObject.setData("swapTriggered", true);
      }
    }
  }
}

function getSwapTarget(
  gameObject: Phaser.GameObjects.Sprite,
  grid: Phaser.GameObjects.Sprite[][],
  direction: string
): Phaser.GameObjects.Sprite | undefined {
  let swapTarget: Phaser.GameObjects.Sprite | undefined;

  // get the initial position of the current tile
  const selectedTileInitPos = gameObject.getData("start-drag");
  const { x, y } = getGridPosition(
    selectedTileInitPos.x,
    selectedTileInitPos.y
  );

  // get the target position of the current tile
  if (direction === "right" && x < numOfCols - 1) {
    swapTarget = grid[y][x + 1];
  } else if (direction === "left" && x > 0) {
    swapTarget = grid[y][x - 1];
  } else if (direction === "down" && y < numOfRows - 1) {
    swapTarget = grid[y + 1][x];
  } else if (direction === "up" && y > 0) {
    swapTarget = grid[y - 1][x];
  }

  return swapTarget;
}

function getGridPosition(x: number, y: number) {
  return {
    x: Math.floor((x - horizontalMargin) / tileSpacing),
    y: Math.floor((y - verticalMargin) / tileSpacing),
  };
}

export function animateSwap(
  scene: Phaser.Scene,
  grid: Phaser.GameObjects.Sprite[][],
  tileA: { x: number; y: number },
  tileB: { x: number; y: number },
  room: Room,
  isReverseSwap: boolean
) {
  let tweenAAnimated = false;
  let tweenBAnimated = false;

  const tileAPosition = grid[tileA.y][tileA.x];
  const tileBPosition = grid[tileB.y][tileB.x];

  scene.tweens.add({
    targets: tileAPosition,
    x: tileBPosition.x,
    y: tileBPosition.y,
    duration: 200,
    ease: "Linear",
    repeat: 0,
    yoyo: false,
    onComplete: () => {
      tweenAAnimated = true;
      if (tweenAAnimated && tweenBAnimated) {
        // update the grid
        const temp = grid[tileA.y][tileA.x];
        grid[tileA.y][tileA.x] = grid[tileB.y][tileB.x];
        grid[tileB.y][tileB.x] = temp;

        if (isReverseSwap === false) {
          room.send("swap-animated", { tileA, tileB });
        } else {
          room.send("reverse-swap-animated", { tileA, tileB });
        }
      }
    },
  });

  scene.tweens.add({
    targets: tileBPosition,
    x: tileAPosition.x,
    y: tileAPosition.y,
    duration: 200,
    ease: "Linear",
    repeat: 0,
    yoyo: false,
    onComplete: () => {
      tweenBAnimated = true;
      if (tweenAAnimated && tweenBAnimated) {
        // update the grid
        const temp = grid[tileA.y][tileA.x];
        grid[tileA.y][tileA.x] = grid[tileB.y][tileB.x];
        grid[tileB.y][tileB.x] = temp;

        if (isReverseSwap === false) {
          room.send("swap-animated", { tileA, tileB });
        } else {
          room.send("reverse-swap-animated", { tileA, tileB });
        }
      }
    },
  });
}
