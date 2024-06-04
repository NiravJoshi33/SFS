import Phaser from "phaser";
import { canvasSize } from "../utils/gameConfig";
import UIManager from "../utils/uiManager";
import { convertGridToArray2D, renderGrid } from "../utils/gridUtils";
import type Server from "../services/server";
import { animateSwap, enableSwap } from "../utils/swapUtils";

export default class GameScene extends Phaser.Scene {
  uiManager: UIManager;
  grid: Phaser.GameObjects.Sprite[][] = [];
  server!: Server;
  constructor() {
    super({
      key: "GameScene",
    });

    this.uiManager = new UIManager(this);
  }

  async create(data: { server: Server }) {
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
      animateSwap(
        this,
        this.grid,
        tileA,
        tileB,
        this.server.room,
        isReverseSwap
      );
    });
  }

  addUserProfileElements(): void {
    this.uiManager.addProfilePicture(100, 200, "profile_pic", 0.5);
    this.uiManager.addProfilePicture(
      canvasSize.width - 100,
      200,
      "profilePic5",
      0.5
    );

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
}
