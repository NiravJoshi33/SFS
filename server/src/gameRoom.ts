import { Room, Client } from "colyseus";
import GameState from "./utils/gameState";
import { InnerArray, LastSwappedTiles, Player } from "./utils/gameState";
import { logger } from "./utils/logger";
import { MAX_PLAYERS, numOfCols, presetScores } from "./utils/gameConfig";
import { convertArray2DToGrid, convertGridToArray2D } from "./utils/gridUtils";
import { createGrid, findMatches, removeMatches } from "./utils/gridUtils";
import { areTilesAdjacent } from "./utils/gridUtils";

export default class GameRoom extends Room {
  private swapAnimationComplete = new Set<string>();
  private gameStarted = false;

  onCreate(options: any): void | Promise<any> {
    this.maxClients = MAX_PLAYERS;

    this.setState(new GameState());

    this.state.grid = createGrid(); // Initialize the grid

    this.registerEventHandlers();
  }

  registerEventHandlers(): void {
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
    this.addPlayer(client);

    if (this.state.currentPlayer === "") {
      this.state.currentPlayer = client.sessionId;

      this.state.players[this.findPlayerIndexById(client.sessionId)].isTurn =
        true;

      console.log(this.state.currentPlayer);
      console.log(
        this.state.players[this.findPlayerIndexById(client.sessionId)].isTurn
      );
      console.log(
        this.state.players[this.findPlayerIndexById(client.sessionId)].id
      );
    }

    if (this.clients.length === MAX_PLAYERS) this.lock();
  }

  addPlayer(client: Client): void {
    let player: Player = new Player();
    player.id = client.sessionId;

    this.state.players.push(player); // Add the player to the game state
  }

  handleReady(client: Client): void {
    this.state.players[this.findPlayerIndexById(client.sessionId)].isReady =
      true; // Set the player as ready

    console.log(`Client ${client.sessionId} is ready!`);

    if (this.clients.length === MAX_PLAYERS) {
      let allPlayersReady: boolean = this.state.players.every(
        (player: Player) => player.isReady
      );

      console.log("All players ready: ", allPlayersReady);

      if (allPlayersReady && this.gameStarted === false) this.startGame();
    }
  }

  startGame(): void {
    this.state.status = "playing"; // Set the game status to playing

    console.log("Game has started!");
    this.broadcast("game-start", this.state);

    this.gameStarted = true;
  }

  handleSwapAttempt(client: Client, message: any): void {
    console.log(`Client ${client.sessionId} is attempting to swap tiles!`);
    const { tileA, tileB } = message;

    if (areTilesAdjacent(tileA, tileB) === true) {
      logger.info("Tiles are adjacent!");

      if (
        this.state.players[this.findPlayerIndexById(client.sessionId)]
          .isTurn === true
      ) {
        this.broadcast("animate-swap", { tileA, tileB, isReverseSwap: false });

        // this.state.players[this.findPlayerIndexById(client.sessionId)].isTurn =
        //   false;
      } else {
        console.log("It's not the player's turn!");
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
    console.log(`Client ${client.sessionId} has animated the swap!`);

    // swap the tiles
    const { tileA, tileB } = message;

    this.swapAnimationComplete.add(client.sessionId);

    // check if all clients have completed the swap animation
    if (this.swapAnimationComplete.size === this.clients.length) {
      this.swapAnimationComplete.clear();
      console.log("All clients have completed the swap animation!");

      const grid = this.swapTiles(tileA, tileB); // swap the tiles

      const matchDataList = findMatches(grid); // find matches
      console.log(JSON.stringify(matchDataList));
      let matches = matchDataList.flatMap((matchData) => matchData.matches);

      if (matches && matches.length > 0) {
        const { updatedGrid, newlyAddedTiles } = removeMatches(grid, matches);

        this.rewardScore(matchDataList, client);

        this.state.grid = convertArray2DToGrid(updatedGrid);

        this.broadcast("tiles-removed", {
          updatedState: this.state,
          matches,
          newlyAddedTiles,
        });
      } else {
        // swap back the tiles
        const updatedGrid = this.swapTiles(tileB, tileA);

        this.state.grid = convertArray2DToGrid(updatedGrid); // update the grid

        // broadcast the reverse swap
        console.log("Broadcasting reverse swap!");
        this.broadcast("animate-swap", { tileA, tileB, isReverseSwap: true });
      }
    }
  }

  handleReverseSwapAnimated(client: Client, message: any): void {
    const { tileA, tileB } = message;

    this.state.players[this.findPlayerIndexById(client.sessionId)].isTurn =
      true; // re-enable the player's turn
  }

  rewardScore(
    matchDataList: {
      numOfMatches: number;
      matches: { x: number; y: number }[];
    }[],
    client: Client
  ): void {
    let score = 0;

    console.log(
      "Player score before update: ",
      this.state.players[this.findPlayerIndexById(client.sessionId)].score
    );

    // Find the player and update the score
    const playerIndex = this.findPlayerIndexById(client.sessionId);

    matchDataList.forEach((matchData) => {
      switch (matchData.numOfMatches) {
        case 3:
          score += presetScores.threeMatch;
          break;
        case 4:
          score += presetScores.fourMatch;
          break;
        case 5:
          score += presetScores.fiveMatch;
          break;
        case numOfCols || numOfCols + 1:
          score += presetScores.railGun;
          break;
        default:
          break;
      }
    });

    // check if the player is the current player
    console.log("Current player: ", this.state.currentPlayer);
    console.log("Client session ID: ", client.sessionId);
    console.log("Player turn", this.state.players[playerIndex].isTurn);

    if (client.sessionId === this.state.currentPlayer) {
      this.state.players[playerIndex].score += score;
    } else {
      console.log("Player is not the current player!");
    }

    console.log(
      "Player score after update: ",
      this.state.players[playerIndex].score
    );
  }
}
