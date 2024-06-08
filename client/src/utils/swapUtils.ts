import Phaser from "phaser";
import { swapTriggerDistance, horizontalMargin } from "./gameConfig";
import { verticalMargin, numOfCols, numOfRows } from "./gameConfig";
import { tileSpacing, tileScale, ALL_TOKENS } from "./gameConfig";
import { type Room } from "colyseus.js";
import { spriteGridToindexGrid, validateGridState } from "./gridUtils";

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
  isReverseSwap === false
    ? console.log("animating swap")
    : console.log("animating reverse swap");
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

        // console.log(
        //   `animated swap between ${tileA.x}, ${tileA.y}, type: ${
        //     grid[tileA.y][tileA.x].texture.key
        //   } and ${tileB.x}, ${tileB.y}, type: ${
        //     grid[tileB.y][tileB.x].texture.key
        //   }`
        // );

        if (isReverseSwap === false) {
          room.send("swap-animated", { tileA, tileB });
        } else {
          console.log(
            "Are Client & Server Grids in Sync?",
            validateGridState(grid, room.state.grid)
          );
          // console.log("Grid After Animating Reverse Swap:");
          // console.table(spriteGridToindexGrid(grid));
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

        // console.log(
        //   `animated swap between ${tileA.x}, ${tileA.y}, type: ${
        //     grid[tileA.y][tileA.x].texture.key
        //   } and ${tileB.x}, ${tileB.y}, type: ${
        //     grid[tileB.y][tileB.x].texture.key
        //   }`
        // );

        if (isReverseSwap === false) {
          room.send("swap-animated", { tileA, tileB });
        } else {
          console.log(
            "Are Client & Server Grids in Sync?",
            validateGridState(grid, room.state.grid)
          );
          // console.log("Grid After Animating Reverse Swap:");
          // console.table(spriteGridToindexGrid(grid));
          room.send("reverse-swap-animated", { tileA, tileB });
        }
      }
    },
  });

  return grid;
}

export function resolveMatches(
  scene: Phaser.Scene,
  grid: Phaser.GameObjects.Sprite[][],
  tilesToDestroy: { x: number; y: number }[],
  newlyAddedTiles: { x: number; y: number; index: number }[],
  room: Room
) {
  // destroy the matched tiles
  animateTileBreak(scene, grid, tilesToDestroy, newlyAddedTiles, room);
}

function animateTileBreak(
  scene: Phaser.Scene,
  grid: Phaser.GameObjects.Sprite[][] | null[][],
  tilesToDestroy: { x: number; y: number }[],
  newlyAddedTiles: { x: number; y: number; index: number }[],
  room: Room
): void {
  console.log("animating tile break");
  let tweenCount = 0;

  for (let tile of tilesToDestroy) {
    scene.tweens.add({
      targets: grid[tile.y][tile.x],
      scaleX: 0,
      scaleY: 0,
      duration: 200,
      ease: "Linear",
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        grid[tile.y][tile.x] = null;
        tweenCount++;
        if (tweenCount === tilesToDestroy.length) {
          animateTileDrop(scene, grid, newlyAddedTiles, tilesToDestroy, room);
        }
      },
    });
  }
}

function animateTileDrop(
  scene: Phaser.Scene,
  grid: Phaser.GameObjects.Sprite[][] | null[][],
  newlyAddedTiles: { x: number; y: number; index: number }[],
  tilesToDestroy: { x: number; y: number }[],
  room: Room
): void {
  console.log("animating tile drop");
  const tweenTimeline = scene.tweens.createTimeline();
  tweenTimeline.on("complete", () => {
    spawnNewTiles(scene, grid, newlyAddedTiles, room);
  });

  // First, remove the tiles to be destroyed
  for (const { x, y } of tilesToDestroy) {
    if (grid[y][x] !== null) {
      grid[y][x]?.destroy();
      grid[y][x] = null;
    }
  }

  for (let x = 0; x < numOfCols; x++) {
    let fallingTiles = 0;
    for (let y = numOfRows - 1; y >= 0; y--) {
      if (grid[y][x] == null) {
        fallingTiles++;
      } else if (fallingTiles > 0) {
        // if a non-null tile is found after a null tile
        // first drop the tile in grid array
        let tile = grid[y][x];
        grid[y][x] = null;
        grid[y + fallingTiles][x] = tile;

        // then drop the sprite in the scene
        if (tile !== null) {
          let tween = {
            targets: tile,
            y: tile.y + fallingTiles * tileSpacing,
            duration: 100 * fallingTiles,
            ease: "Power2",
          };

          tweenTimeline.add(tween);
        }
      }
    }
  }

  tweenTimeline.play();
}

function spawnNewTiles(
  scene: Phaser.Scene,
  grid: Phaser.GameObjects.Sprite[][] | null[][],
  newlyAddedTiles: { x: number; y: number; index: number }[],
  room: Room
): void {
  console.log("spawning new tiles");

  let replenishedTiles = 0;

  for (let tile of newlyAddedTiles) {
    const newTile = scene.add.sprite(
      horizontalMargin + tile.x * tileSpacing,
      verticalMargin + tile.y * tileSpacing,
      ALL_TOKENS[tile.index]
    );
    newTile.setOrigin(0);
    newTile.setScale(tileScale);
    newTile.setInteractive();
    scene.input.setDraggable(newTile);

    grid[tile.y][tile.x] = newTile;

    scene.tweens.add({
      targets: newTile,
      y: verticalMargin + tile.y * tileSpacing,
      duration: 100 * tile.y,
      ease: "Power2",
      onComplete: () => {
        replenishedTiles++;
        if (replenishedTiles === newlyAddedTiles.length) {
          let isGridValid = validateGridState(grid, room.state.grid);
          console.table({ isGridValid: isGridValid });
          room.send("drop-animated");

          console.table(spriteGridToindexGrid(grid));
        }
      },
    });
  }
}
