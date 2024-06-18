import Phaser from "phaser";
import { canvasSize } from "../utils/gameConfig";
import UIManager from "../utils/uiManager";
import { convertGridToArray2D, renderGrid } from "../utils/gridUtils";
import type Server from "../services/server";
import { animateSwap, resolveMatches, enableSwap } from "../utils/swapUtils";
import { colors } from "../utils/colors";
import { AnimationManager } from "../utils/animationManager";

const { white, gray } = colors;
const { width, height } = canvasSize;

export default class GameScene extends Phaser.Scene {
  // class variables
  uiManager: UIManager;
  grid: Phaser.GameObjects.Sprite[][] = [];
  server!: Server;
  profilePic!: Phaser.GameObjects.Image;
  opponentProfilePic!: Phaser.GameObjects.Image;
  playerUsername!: Phaser.GameObjects.Text;
  opponentUsername!: Phaser.GameObjects.Text;
  playerScore!: Phaser.GameObjects.Text;
  opponentScore!: Phaser.GameObjects.Text;
  playerHighscore!: Phaser.GameObjects.Text;
  opponentHighscore!: Phaser.GameObjects.Text;
  botMatchNote!: Phaser.GameObjects.Image;
  isBotMatchNoteAnimated: boolean = false;
  gridResetNote!: Phaser.GameObjects.Image;
  animationManager: AnimationManager;
  constructor() {
    super({
      key: "GameScene",
    });

    this.uiManager = new UIManager(this);
    this.animationManager = new AnimationManager(this);
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

    this.botMatchNote = this.add
      .image(
        width + 200, // width - 180
        height - 100,
        "botMatchNote"
      )
      .setDepth(1000)
      .setScale(1.5)
      .setOrigin(0.5);

    this.gridResetNote = this.add.image(
      width + 300, // width - 180
      height - 100,
      "gridResetNote"
    );
    this.gridResetNote.setDepth(1000).setScale(1.5).setOrigin(0.5);

    // render the grid
    // console.log(this.server.room.state.grid);
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

      // console.log("matches", matches);
      // console.log("newlyAddedTiles", newlyAddedTiles);

      resolveMatches(this, this.grid, matches, newlyAddedTiles, server.room);
    });

    this.server.room.onMessage("reset-grid", (state) => {
      // destroy all the tiles & all event listeners
      console.log("reset-grid message received");
      this.grid.forEach((row) => {
        row.forEach((tile) => {
          if (tile) tile.destroy();
        });
      });

      // console.log("Client Grid After Destroying");
      // console.table(this.grid);

      const newServerGrid = state.grid;

      // render the new grid
      this.grid = renderGrid(this, convertGridToArray2D(newServerGrid));
      enableSwap(this, this.grid, server.room);

      this.animationManager.animateNotification(
        this.gridResetNote,
        width - 250,
        800,
        "Power2",
        0,
        () => {
          this.isBotMatchNoteAnimated = true;

          this.animationManager.animateNotification(
            this.gridResetNote,
            width + 300,
            800,
            "Power2",
            1000
          );
        }
      );
    });

    // this.server.room.onMessage("swap-possible", (message: any) => {
    //   const { x, y } = message;

    //   this.grid.forEach((row) => {
    //     row.forEach((tile) => {
    //       if (tile) {
    //         tile.clearTint();
    //       }
    //     });
    //   });

    //   const tile = this.grid[y][x];
    //   tile.setTint(0x8c52ff);
    // });
  }

  addUserProfileElements(): void {
    let playerProfilePicKey;
    let opponentProfilePicKey;

    playerProfilePicKey = this.uiManager.getProfilePicKeys(
      this.server.room
    ).playerProfilePicKey;
    opponentProfilePicKey = this.uiManager.getProfilePicKeys(
      this.server.room
    ).opponentProfilePicKey;

    // add user & opponent profile info box
    this.add.image(170, 200, "playerInfoBox").setOrigin(0.5);
    this.profilePic = this.add
      .image(70, 200, playerProfilePicKey)
      .setOrigin(0.5)
      .setScale(0.3);
    this.add.image(width - 170, 200, "opponentInfoBox").setOrigin(0.5);
    this.opponentProfilePic = this.add
      .image(width - 70, 200, opponentProfilePicKey)
      .setOrigin(0.5)
      .setScale(0.3);

    this.playerUsername = this.add
      .text(210, 163, "Player-1", {
        font: "16px Arial",
      })
      .setOrigin(0.5);
    this.opponentUsername = this.add
      .text(width - 210, 163, "Player-2", {
        font: "16px Arial",
      })
      .setOrigin(0.5);

    this.playerScore = this.add
      .text(240, 185, "0", {
        font: "16px Arial",
      })
      .setOrigin(0.5);
    this.opponentScore = this.add
      .text(width - 190, 185, "0", {
        font: "16px Arial",
      })
      .setOrigin(0.5);

    this.playerHighscore = this.add
      .text(265, 207, "0", {
        font: "16px Arial",
      })
      .setOrigin(0.5);
    this.opponentHighscore = this.add
      .text(width - 175, 207, "0", {
        font: "16px Arial",
      })
      .setOrigin(0.5);

    const storeButton = this.add
      .image(canvasSize.width - 100, 50, "storeIcon")
      .setScale(0.1)
      .setInteractive();
    storeButton.setDepth(1000);

    storeButton.on("pointerdown", () => this.scene.launch("GameStoreScene"));
  }

  update() {
    // highlight the profile picture of the current player
    if (this.server.room.state.currentPlayer === this.server.room.sessionId) {
      this.profilePic.setTint(white);
      this.opponentProfilePic.setTint(gray);
    } else {
      this.profilePic.setTint(gray);
      this.opponentProfilePic.setTint(white);
    }

    // update the score
    const playerIndex = this.server.room.state.players.findIndex(
      (player: any) => player.id === this.server.room.sessionId
    );

    const opponentIndex = playerIndex === 0 ? 1 : 0;

    const playerScore = this.server.room.state.players[playerIndex].score;
    const playerHighscore =
      this.server.room.state.players[playerIndex].highscore;
    const playerUsername = this.server.room.state.players[playerIndex].id;

    if (this.server.room.state.players.length === 2) {
      const opponentScore = this.server.room.state.players[opponentIndex].score;
      const opponentHighscore =
        this.server.room.state.players[opponentIndex].highscore;
      const opponentUsername = this.server.room.state.players[opponentIndex].id;

      this.opponentScore.setText(opponentScore.toString());
      this.opponentHighscore.setText(opponentHighscore.toString());
      this.opponentUsername.setText(opponentUsername);
    }

    this.playerScore.setText(playerScore.toString());
    this.playerHighscore.setText(playerHighscore.toString());
    this.playerUsername.setText(playerUsername);

    // slid and show the bot match notification
    if (
      this.server.room.state.isBotGame === true &&
      this.isBotMatchNoteAnimated === false
    ) {
      // animate the slide of the bot match notification

      this.animationManager.animateNotification(
        this.botMatchNote,
        width - 180,
        800,
        "Power2",
        0,
        () => {
          this.isBotMatchNoteAnimated = true;

          setTimeout(() => {
            this.animationManager.animateNotification(
              this.botMatchNote,
              width + 200,
              800,
              "Power2",
              1000
            );
          }, 1000);
        }
      );
    }
  }
}
