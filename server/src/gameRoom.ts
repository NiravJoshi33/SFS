import { Room, Client } from "colyseus";
import GameState from "./utils/gameState";
import { logger } from "./utils/logger";

export default class GameRoom extends Room {
  onCreate(options: any): void | Promise<any> {
    logger.info("Game room created!");
    this.setState(new GameState());
  }

  onJoin(client: Client): void | Promise<any> {
    logger.info(`Client ${client.sessionId} joined the game room!`);
  }
}
