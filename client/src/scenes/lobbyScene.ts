// importing dependencies
import Phaser from "phaser";
import { canvasSize } from "../utils/gameConfig";
import UIManager from "../utils/uiManager";
import type Server from "../services/server";
import { profilePicMap } from "../utils/assets";

export default class LobbyScene extends Phaser.Scene {
  // class properties
  uiManager: UIManager;
  server!: Server;
  userProfile!: Phaser.GameObjects.Image;
  userFrame!: Phaser.GameObjects.Image;
  opponentProfile!: Phaser.GameObjects.Image;
  opponentFrame!: Phaser.GameObjects.Image;
  opponentProfileArr: string[] = [];
  shuffledOpponentProfileArr: string[] = [];
  imageIndex: number = 0;
  isChangingImage: boolean = false;

  constructor() {
    super({
      key: "LobbyScene",
    });

    this.uiManager = new UIManager(this);
  }

  preload() {} // assets are already loaded in BootScene

  async create(data: { server: Server }) {
    const { server } = data;
    this.server = server;

    for (let asset in profilePicMap) {
      this.opponentProfileArr.push(asset);
    }
    Phaser.Utils.Array.Shuffle(this.opponentProfileArr);

    // add background image
    this.add.image(0, 0, "blackBG").setOrigin(0);

    this.add
      .text(canvasSize.width / 2, 200, "Lobby Scene", {
        color: "#0f0",
        fontSize: "64px",
      })
      .setOrigin(0.5);

    const playerProfilePicKey = this.uiManager.getProfilePicKeys(
      this.server.room
    )?.playerProfilePicKey;

    let { profilePic, frame } = this.uiManager.addProfilePicture(
      200,
      canvasSize.height / 2,
      playerProfilePicKey,
      0.5
    );

    this.userProfile = profilePic;
    this.userFrame = frame;

    // add opponent profile picture
    let opponentProfilePicWithFrame = this.uiManager.addProfilePicture(
      canvasSize.width - 200,
      canvasSize.height / 2,
      this.opponentProfileArr[this.imageIndex],
      0.5
    );

    // add VS text
    this.add
      .text(canvasSize.width / 2, canvasSize.height / 2, "VS", {
        color: "#0f0",
        fontSize: "64px",
      })
      .setOrigin(0.5);

    this.add.text(
      canvasSize.width / 2 - 200,
      canvasSize.height / 2 + 200,
      "Waiting for players...",
      {
        color: "#0f0",
        fontSize: "32px",
      }
    );

    this.opponentProfile = opponentProfilePicWithFrame.profilePic;
    this.opponentFrame = opponentProfilePicWithFrame.frame;
  }

  update() {
    if (
      this.server.room.state.status === "waiting for players" &&
      !this.isChangingImage
    ) {
      this.imageIndex = (this.imageIndex + 1) % this.opponentProfileArr.length;

      this.isChangingImage = true;
      this.time.delayedCall(200, () => {
        this.opponentProfile.setTexture(
          this.opponentProfileArr[this.imageIndex]
        );
        this.isChangingImage = false;
      });
    }
  }
}
