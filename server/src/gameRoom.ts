import { Room, Client } from "colyseus";
import GameState, { Player } from "./utils/gameState";
import { logger } from "./utils/logger";
import { MAX_PLAYERS } from "./utils/gameConfig";
import { areTilesAdjacent, createGrid } from "./utils/gridUtils";

export default class GameRoom extends Room {
  onCreate(options: any): void | Promise<any> {
    this.maxClients = MAX_PLAYERS;
    logger.info("Game room created!");
    this.setState(new GameState());

    // Initialize the grid
    this.state.grid = createGrid();

    // register message handlers
    this.onMessage("ready", (client: Client) => this.handleReady(client));
    this.onMessage("swap-attempt", (client: Client, message: any) =>
      this.handleSwapAttempt(client, message)
    );
  }

  onJoin(client: Client): void | Promise<any> {
    logger.info(`Client ${client.sessionId} joined the game room!`);
    this.addPlayer(client);

    if (this.clients.length === 1) {
      // Set the first player as the current player
      this.state.currentPlayer = client.sessionId;
    }

    if (this.clients.length === MAX_PLAYERS) {
      // Start the game
      this.lock();
    }
  }

  addPlayer(client: Client): void {
    console.log(`Adding player ${client.sessionId} to the game room!`);

    // Add player to the game room
    let player: Player = new Player();
    player.id = client.sessionId;

    this.state.players.push(player);

    // if player is first, enable the turn
    if (this.clients.length === 1) {
      console.log(`Player ${player.id} is the first player!`);
      player.isTurn = true;
    }
  }

  handleReady(client: Client): void {
    console.log(`Client ${client.sessionId} is ready!`);

    // Find the player and update the ready status
    let playerIndex: number = this.state.players.findIndex(
      (player: Player) => player.id === client.sessionId
    );

    this.state.players[playerIndex].isReady = true;

    // Check if all players are ready
    if (this.clients.length === MAX_PLAYERS) {
      let allPlayersReady: boolean = this.state.players.every(
        (player: Player) => player.isReady
      );

      if (allPlayersReady) {
        this.startGame();
      }
    }
  }

  startGame(): void {
    logger.info("Starting the game!");

    // change game status
    this.state.status = "playing";

    // Send the game state to all players
    this.broadcast("game-start", this.state);
  }

  handleSwapAttempt(client: Client, message: any): void {
    console.log(`Client ${client.sessionId} is attempting to swap tiles!`);
    const { tileA, tileB } = message;

    if (areTilesAdjacent(tileA, tileB) === true) {
      console.log(
        `Tiles at (${tileA.x},${tileA.y}) and (${tileB.x},${tileB.y}) are adjacent!`
      );
      // check if it's the player's turn
      const playerIndex: number = this.state.players.findIndex(
        (player: Player) => player.id === client.sessionId
      );
      const player: Player = this.state.players[playerIndex];
      console.log(player.isTurn);

      if (player.isTurn === true) {
        console.log(`Player ${player.id} is valid to swap tiles!`);
        // swap the tiles
        this.swapTiles(tileA, tileB);
      }
    }
  }

  swapTiles(tileA: { x: number; y: number }, tileB: { x: number; y: number }) {
    console.log(
      `Swapping tiles at (${tileA.x},${tileA.y}) and (${tileB.x},${tileB.y})`
    );
    const grid = this.state.grid;
    console.log(grid);
  }
}
