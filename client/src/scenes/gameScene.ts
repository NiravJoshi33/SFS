import Phaser from "phaser";
import { canvasSize } from "../utils/gameConfig";
import UIManager from "../utils/uiManager";
import { convertGridToArray2D, renderGrid } from "../utils/gridUtils";
import type Server from "../services/server";
import { animateSwap, resolveMatches, enableSwap } from "../utils/swapUtils";

export default class GameScene extends Phaser.Scene {
  uiManager: UIManager;
  grid: Phaser.GameObjects.Sprite[][] = [];
  server!: Server;
  profilePic!: Phaser.GameObjects.Image;
  opponentProfilePic!: Phaser.GameObjects.Image;
  constructor() {
    super({
      key: "GameScene",
    });

    this.uiManager = new UIManager(this);
  }

  async create(data: { server: Server }) {
    console.log("GameScene created");
    const { server } = data;
    this.server = server;

    // add background image
    this.add.image(0, 0, "gameBGImg").setOrigin(0);
    // add title image
    this.add
      .image(canvasSize.width / 2, canvasSize.height / 2, "gameTitle")
      .setOrigin(0.5);

    this.addUserProfileElements();

    // render the grid
    console.log(this.server.room.state.grid);
    this.grid = renderGrid(
      this,
      convertGridToArray2D(this.server.room.state.grid)
    );
    enableSwap(this, this.grid, server.room);

    this.server.room.onMessage("animate-swap", (message: any) => {
      console.log("animate-swap message received");
      const { tileA, tileB, isReverseSwap } = message;
      this.grid = animateSwap(
        this,
        this.grid,
        tileA,
        tileB,
        this.server.room,
        isReverseSwap
      );
    });

    this.server.room.onMessage("tiles-removed", (message: any) => {
      console.log("tiles-removed message received");
      const { matches, newlyAddedTiles } = message;

      console.log("matches", matches);
      console.log("newlyAddedTiles", newlyAddedTiles);

      resolveMatches(this, this.grid, matches, newlyAddedTiles, server.room);
    });

    this.server.room.onMessage("reset-grid", () => {
      // destroy all the tiles & all event listeners
      this.grid.forEach((row) => {
        row.forEach((tile) => {
          if (tile) tile.destroy();
        });
      });

      // render the new grid
      this.grid = renderGrid(
        this,
        convertGridToArray2D(this.server.room.state.grid)
      );
      enableSwap(this, this.grid, server.room);
    });
  }

  addUserProfileElements(): void {
    const { playerProfilePicKey, opponentProfilePicKey } =
      this.uiManager.getProfilePicKeys(this.server.room);

    this.profilePic = this.uiManager.addProfilePicture(
      100,
      200,
      playerProfilePicKey,
      0.5
    ).profilePic;

    this.opponentProfilePic = this.uiManager.addProfilePicture(
      canvasSize.width - 100,
      200,
      opponentProfilePicKey,
      0.5
    ).profilePic;

    // const textLabelStyle = { fontSize: "20px", fontFamily: "Arial" };

    // this.uiManager.addTextLabel(
    //   175,
    //   125,
    //   "player1",
    //   textLabelStyle,
    //   180,
    //   35,
    //   5,
    //   0x000000,
    //   0x8c52ff,
    //   5
    // );

    // this.uiManager.addTextLabel(
    //   175,
    //   160,
    //   "Score: 0",
    //   textLabelStyle,
    //   180,
    //   35,
    //   5,
    //   0x000000,
    //   0x8c52ff,
    //   5
    // );

    // this.uiManager.addTextLabel(
    //   175,
    //   195,
    //   "Highscore: 0",
    //   textLabelStyle,
    //   180,
    //   35,
    //   5,
    //   0x000000,
    //   0x8c52ff,
    //   5
    // );
  }

  update() {
    // highlight the profile picture of the current player
    if (this.server.room.state.currentPlayer === this.server.room.sessionId) {
      this.profilePic.setTint(0xffffff);
      this.opponentProfilePic.setTint(0x8c52ff);
    } else {
      this.profilePic.setTint(0x8c52ff);
      this.opponentProfilePic.setTint(0xffffff);
    }
  }
}
