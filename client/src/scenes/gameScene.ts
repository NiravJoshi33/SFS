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
  playerUsername!: Phaser.GameObjects.Text;
  opponentUsername!: Phaser.GameObjects.Text;
  playerScore!: Phaser.GameObjects.Text;
  opponentScore!: Phaser.GameObjects.Text;
  playerHighscore!: Phaser.GameObjects.Text;
  opponentHighscore!: Phaser.GameObjects.Text;
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

    this.server.room.onMessage("reset-grid", (state) => {
      // destroy all the tiles & all event listeners
      console.log("reset-grid message received");
      this.grid.forEach((row) => {
        row.forEach((tile) => {
          if (tile) tile.destroy();
        });
      });

      console.log("Client Grid After Destroying");
      console.table(this.grid);

      const newServerGrid = state.grid;

      // render the new grid
      this.grid = renderGrid(this, convertGridToArray2D(newServerGrid));
      enableSwap(this, this.grid, server.room);
    });

    this.server.room.onMessage("swap-possible", (message: any) => {
      const { x, y } = message;

      this.grid.forEach((row) => {
        row.forEach((tile) => {
          if (tile) {
            tile.clearTint();
          }
        });
      });

      const tile = this.grid[y][x];
      tile.setTint(0x8c52ff);
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

    this.add
      .image(260, 150, "usernameBox")
      .setOrigin(0.5)
      .setDisplaySize(170, 25);

    this.playerUsername = this.add
      .text(260, 150, "Player-1", { fontSize: "16px" })
      .setOrigin(0.5);

    this.add.image(260, 175, "scoreBox").setOrigin(0.5).setDisplaySize(170, 25);
    this.playerScore = this.add
      .text(280, 175, "0", { fontSize: "16px" })
      .setOrigin(0.5);

    this.add
      .image(260, 200, "highscoreBox")
      .setOrigin(0.5)
      .setDisplaySize(170, 25);
    this.playerHighscore = this.add
      .text(295, 200, "0", { fontSize: "16px" })
      .setOrigin(0.5);

    this.add
      .image(canvasSize.width - 260, 150, "usernameBox")
      .setOrigin(0.5)
      .setDisplaySize(170, 25);
    this.opponentUsername = this.add
      .text(canvasSize.width - 260, 150, "Player-2", {
        fontSize: "16px",
      })
      .setOrigin(0.5);

    this.add
      .image(canvasSize.width - 260, 175, "scoreBox")
      .setOrigin(0.5)
      .setDisplaySize(170, 25);
    this.opponentScore = this.add
      .text(canvasSize.width - 235, 175, "0", { fontSize: "16px" })
      .setOrigin(0.5);

    this.add
      .image(canvasSize.width - 260, 200, "highscoreBox")
      .setOrigin(0.5)
      .setDisplaySize(170, 25);
    this.opponentHighscore = this.add
      .text(canvasSize.width - 220, 200, "0", { fontSize: "16px" })
      .setOrigin(0.5);
      const storeButton = this.add.text(100, 100, 'Open Game Store', { color: '#FFF'})
       // Set background to see it clearly
      
    .setInteractive()
    storeButton.setDepth(1000);
    storeButton.setBackgroundColor('#ff0000');
    storeButton.on('pointerdown', () => this.scene.launch('GameStoreScene'));
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

    // update the score
    const playerIndex = this.server.room.state.players.findIndex(
      (player: any) => player.id === this.server.room.sessionId
    );

    const opponentIndex = playerIndex === 0 ? 1 : 0;

    const playerScore = this.server.room.state.players[playerIndex].score;
    const playerHighscore =
      this.server.room.state.players[playerIndex].highscore;
    const playerUsername = this.server.room.state.players[playerIndex].id;
    const opponentScore = this.server.room.state.players[opponentIndex].score;
    const opponentHighscore =
      this.server.room.state.players[opponentIndex].highscore;
    const opponentUsername = this.server.room.state.players[opponentIndex].id;

    this.playerScore.setText(playerScore.toString());
    this.opponentScore.setText(opponentScore.toString());
    this.playerHighscore.setText(playerHighscore.toString());
    this.opponentHighscore.setText(opponentHighscore.toString());
    this.playerUsername.setText(playerUsername);
    this.opponentUsername.setText(opponentUsername);
  }
}
