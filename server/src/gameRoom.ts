import { Room, Client } from "colyseus";
import GameState, {
  InnerArray,
  LastSwappedTiles,
  Player,
} from "./utils/gameState";
import { logger } from "./utils/logger";
import { MAX_PLAYERS } from "./utils/gameConfig";
import {
  areTilesAdjacent,
  convertArray2DToGrid,
  convertGridToArray2D,
  createGrid,
  findMatches,
} from "./utils/gridUtils";

export default class GameRoom extends Room {
  private swapAnimationComplete = new Set<string>();

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
    this.onMessage("swap-animated", (client: Client, message: any) =>
      this.handleSwapAnimated(client, message)
    );
    this.onMessage("reverse-swap-animated", (client: Client, message: any) =>
      this.handleReverseSwapAnimated(client, message)
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

    this.state.players[this.findPlayerIndexById(client.sessionId)].isReady =
      true;

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
      const player: Player =
        this.state.players[this.findPlayerIndexById(client.sessionId)];

      if (player.isTurn === true) {
        this.broadcast("animate-swap", { tileA, tileB, isReverseSwap: false });

        // disable the player's turn
        this.state.players[this.findPlayerIndexById(client.sessionId)].isTurn =
          false;
      }
    }
  }

  findPlayerIndexById(id: string): number {
    const playerIndex: number = this.state.players.findIndex(
      (player: Player) => player.id === id
    );
    return playerIndex;
  }

  swapTiles(
    tileA: { x: number; y: number },
    tileB: { x: number; y: number }
  ): number[][] {
    console.log(
      `Swapping tiles at (${tileA.x},${tileA.y}) and (${tileB.x},${tileB.y})`
    );

    const grid: number[][] = [];
    const tempGrid = convertGridToArray2D(this.state.grid);
    tempGrid.forEach((row: any) => grid.push(Array.from(row.$items.values())));

    const temp = grid[tileA.y][tileA.x];
    grid[tileA.y][tileA.x] = grid[tileB.y][tileB.x];
    grid[tileB.y][tileB.x] = temp;

    // record last swapped tiles
    const lastSwappedTiles = new LastSwappedTiles();
    lastSwappedTiles.tileA.x = tileA.x;
    lastSwappedTiles.tileA.y = tileA.y;
    lastSwappedTiles.tileB.x = tileB.x;
    lastSwappedTiles.tileB.y = tileB.y;

    this.state.lastSwappedTiles = lastSwappedTiles;

    return grid;
  }

  handleSwapAnimated(client: Client, message: any): void {
    // swap the tiles
    const { tileA, tileB } = message;

    this.swapAnimationComplete.add(client.sessionId);

    // check if all clients have completed the swap animation
    if (this.swapAnimationComplete.size === this.clients.length) {
      this.swapAnimationComplete.clear();

      // perform server side swap
      const grid = this.swapTiles(tileA, tileB);

      // check for matches
      const matchDataList = findMatches(grid);
      let matches = matchDataList.flatMap((matchData) => matchData.matches);

      if (matches && matches.length > 0) {
        // TODO: resolve matches, add new tiles
        // TODO: update player scores
        // TODO: update grid
        // TODO: broadcast updated game state
      } else {
        // swap back the tiles
        this.swapTiles(tileB, tileA);

        // broadcast the reverse swap
        this.broadcast("animate-swap", { tileA, tileB, isReverseSwap: true });
      }
    }
  }

  handleReverseSwapAnimated(client: Client, message: any): void {
    const { tileA, tileB } = message;

    // enable the player's turn
    this.state.players[this.findPlayerIndexById(client.sessionId)].isTurn =
      true;
  }
}
