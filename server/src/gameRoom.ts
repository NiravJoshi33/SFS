import { Room, Client } from "colyseus";
import GameState from "./utils/gameState";
import { InnerArray, LastSwappedTiles, Player } from "./utils/gameState";
import { logger } from "./utils/logger";
import { MAX_PLAYERS, numOfCols, presetScores } from "./utils/gameConfig";
import { createGrid, findMatches, removeMatches } from "./utils/gridUtils";
import { areTilesAdjacent, isSwapPossible } from "./utils/gridUtils";
import { convertArray2DToGrid, convertGridToArray2D } from "./utils/dataUtils";
import { sampleProfilePicKeys } from "./utils/gameConfig";

export default class GameRoom extends Room {
  private swapAnimationComplete = new Set<string>();
  private dropAnimationComplete = new Set<string>();
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
      this.processSwapAttempt(client, message)
    );

    this.onMessage("swap-animated", (client: Client, message: any) =>
      this.handleSwapAnimated(client, message)
    );

    this.onMessage("reverse-swap-animated", (client: Client, message: any) =>
      this.handleReverseSwapAnimated(client, message)
    );

    this.onMessage("drop-animated", (client: Client) =>
      this.handleDropAnimated(client)
    );
  }

  onJoin(client: Client): void | Promise<any> {
    console.log(`Client ${client.sessionId} joined the room!`);
    this.addPlayer(client);

    if (this.state.currentPlayer === "") this.startTurn(client);

    if (this.clients.length === MAX_PLAYERS) this.lock();
  }

  addPlayer(client: Client): void {
    let player: Player = new Player();
    player.id = client.sessionId;

    if (this.state.players.length <= 2) {
      this.state.players.push(player); // Add the player to the game state
    } else {
      logger.error("Cannot add more than 2 players!");
      new Error("Cannot add more than 2 players!");
    }

    this.setProfilePicKey();
  }

  handleReady(client: Client): void {
    this.state.players[this.findPlayerIndexById(client.sessionId)].isReady =
      true; // Set the player as ready

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

    this.broadcast("game-start", this.state);

    this.gameStarted = true; // to avoid starting the game multiple times
  }

  processSwapAttempt(client: Client, message: any): void {
    console.log(`Client ${client.sessionId} is attempting to swap tiles!`);
    const { tileA, tileB } = message;

    if (areTilesAdjacent(tileA, tileB) === true) {
      logger.info("Tiles are adjacent!");

      if (
        this.state.players[this.findPlayerIndexById(client.sessionId)]
          .isTurn === true
      ) {
        this.broadcast("animate-swap", { tileA, tileB, isReverseSwap: false });

        this.disableTurnForAllPlayers(); // no player input while animation is playing
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
        this.broadcast("animate-swap", { tileA, tileB, isReverseSwap: true });
      }
    }
  }

  handleReverseSwapAnimated(client: Client, message: any): void {
    const { tileA, tileB } = message;

    if (this.state.currentPlayer === client.sessionId) {
      this.enableTurn(client);
    }
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

  handleDropAnimated(client: Client): void {
    console.log(`Client ${client.sessionId} has animated the drop!`);

    this.dropAnimationComplete.add(client.sessionId);

    if (this.dropAnimationComplete.size === this.clients.length) {
      this.dropAnimationComplete.clear();

      let matchDataList = findMatches(convertGridToArray2D(this.state.grid));
      let matches = matchDataList.flatMap((matchData) => matchData.matches);

      if (matches && matches.length > 0) {
        let { updatedGrid, newlyAddedTiles } = removeMatches(
          convertGridToArray2D(this.state.grid),
          matches
        );

        this.rewardScore(matchDataList, client);

        this.state.grid = convertArray2DToGrid(updatedGrid);

        this.broadcast("tiles-removed", {
          updatedState: this.state,
          matches,
          newlyAddedTiles,
        });
      } else {
        if (isSwapPossible(convertGridToArray2D(this.state.grid)) === false) {
          while (
            isSwapPossible(convertGridToArray2D(this.state.grid)) === false
          ) {
            this.state.grid = createGrid();
          }
          // broadcast the new grid
          this.broadcast("reset-grid", this.state);
        }

        this.endTurn(client);
      }
    }
  }

  endTurn(client: Client) {
    const playerIndex = this.findPlayerIndexById(client.sessionId);

    this.state.players[playerIndex].isTurn = false;

    // get the other player
    const otherPlayerIndex = (playerIndex + 1) % this.state.players.length;

    this.state.players[otherPlayerIndex].isTurn = true;
    this.state.currentPlayer = this.state.players[otherPlayerIndex].id;
  }

  startTurn(client: Client) {
    const playerIndex = this.findPlayerIndexById(client.sessionId);

    this.state.players[playerIndex].isTurn = true;
    this.state.currentPlayer = client.sessionId;
  }

  enableTurn(client: Client) {
    const playerIndex = this.findPlayerIndexById(client.sessionId);
    this.state.players[playerIndex].isTurn = true;

    const otherPlayerIndex = (playerIndex + 1) % this.state.players.length;
    this.state.players[otherPlayerIndex].isTurn = false;
  }

  disableTurnForAllPlayers() {
    this.state.players.forEach((player: Player) => (player.isTurn = false));
  }

  setProfilePicKey(): void {
    if (this.state.players.length === 1) {
      this.state.players[0].profilePicKey = sampleProfilePicKeys[0];
    } else {
      this.state.players[1].profilePicKey = sampleProfilePicKeys[1];
    }
  }
}
