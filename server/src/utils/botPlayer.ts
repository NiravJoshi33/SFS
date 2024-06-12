// This class represents a bot player plays as opponent in case in sufficient time
// opponent player doesn't join. This can also be implemented to continue and not block
// the game for the first player when for any reason opponent disconnects.

import { Player } from "./gameState";

export class BotPlayer {
  private player: Player;

  constructor() {
    this.player = new Player();
    this.player.isBot = true;
    this.player.isTurn = false;
    this.player.isReady = true;
    this.player.id = "bot";
    this.player.username = "Bot";
  }

  getPlayer(): Player {
    return this.player;
  }
}
