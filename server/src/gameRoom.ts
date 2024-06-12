import { Room, Client } from "colyseus";
import GameState from "./utils/gameState";
import { InnerArray, LastSwappedTiles, Player } from "./utils/gameState";
import { logger } from "./utils/logger";
import { MAX_PLAYERS, numOfCols, presetScores } from "./utils/gameConfig";
import { createGrid, findMatches, removeMatches } from "./utils/gridUtils";
import { areTilesAdjacent, isSwapPossible } from "./utils/gridUtils";
import { convertArray2DToGrid, convertGridToArray2D } from "./utils/dataUtils";
import { sampleProfilePicKeys } from "./utils/gameConfig";
import { BotPlayer } from "./utils/botPlayer";

export default class GameRoom extends Room {
  private swapAnimationComplete = new Set<string>();
  private dropAnimationComplete = new Set<string>();
  private gameStarted = false;
  private isBotGame = false;

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

    this.onMessage("initiate-bot-game", (client: Client) =>
      this.startBotGame(client)
    );
  }

  onJoin(client: Client): void | Promise<any> {
    console.log(`Client ${client.sessionId} joined the room!`);

    this.addPlayer(client);

    if (this.state.currentPlayer === "") this.startTurn(client);

    if (this.clients.length === MAX_PLAYERS) this.lock();
  }

  onLeave(client: Client): void | Promise<any> {
    console.log(`Client ${client.sessionId} left the room!`);

    this.removePlayer(client);
  }

  addPlayer(client: Client, isBot: boolean = false): void {
    console.log("Add Player is called");
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

  removePlayer(client: Client): void {
    // remove player from the game state
    this.state.players = this.state.players.filter(
      (player: Player) => player.id !== client.sessionId
    );
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

    // wait for all human clients to complete the swap animation

    if (this.isBotGame === true) {
      console.log("Bot game");
      this.swapAnimationComplete.add("bot");
      console.log(this.swapAnimationComplete.size);
    }

    if (this.swapAnimationComplete.size === MAX_PLAYERS) {
      this.swapAnimationComplete.clear();
      console.log("All clients have completed the swap animation!");

      const grid = this.swapTiles(tileA, tileB); // swap the tiles

      this.state.grid = convertArray2DToGrid(grid); // update the grid

      console.log("Grid After Swap on Server Side:");
      console.table(grid);

      const matchDataList = findMatches(grid); // find matches
      console.log(JSON.stringify(matchDataList));
      let matches = matchDataList.flatMap((matchData) => matchData.matches);

      if (matches && matches.length > 0) {
        const { updatedGrid, newlyAddedTiles } = removeMatches(grid, matches);

        this.rewardScore(matchDataList);

        this.state.grid = convertArray2DToGrid(updatedGrid);

        console.table(updatedGrid);

        this.broadcast("tiles-removed", {
          updatedState: this.state,
          matches,
          newlyAddedTiles,
        });
      } else {
        // swap back the tiles
        const updatedGrid = this.swapTiles(tileB, tileA);
        console.log("Grid After Reverse Swap on Server Side:");
        console.table(updatedGrid);

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
    }[]
  ): void {
    let score = 0;
    const currentUserId = this.state.currentPlayer;

    console.log(
      "Player score before update: ",
      this.state.players[this.findPlayerIndexById(currentUserId)].score
    );

    // Find the player and update the score
    const playerIndex = this.findPlayerIndexById(currentUserId);

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

    this.state.players[playerIndex].score += score;

    console.log(
      "Player score after update: ",
      this.state.players[playerIndex].score
    );
  }

  handleDropAnimated(client: Client): void {
    console.log(`Client ${client.sessionId} has animated the drop!`);

    this.dropAnimationComplete.add(client.sessionId);

    if (this.isBotGame === true) {
      this.dropAnimationComplete.add("bot");
    }

    if (this.dropAnimationComplete.size === MAX_PLAYERS) {
      this.dropAnimationComplete.clear();

      let matchDataList = findMatches(convertGridToArray2D(this.state.grid));
      let matches = matchDataList.flatMap((matchData) => matchData.matches);

      if (matches && matches.length > 0) {
        let { updatedGrid, newlyAddedTiles } = removeMatches(
          convertGridToArray2D(this.state.grid),
          matches
        );

        this.rewardScore(matchDataList);

        this.state.grid = convertArray2DToGrid(updatedGrid);

        this.broadcast("tiles-removed", {
          updatedState: this.state,
          matches,
          newlyAddedTiles,
        });
      } else {
        let swapPossible = isSwapPossible(
          convertGridToArray2D(this.state.grid),
          this
        ).swapPossible;
        if (swapPossible === false) {
          console.log("No possible matches! Resetting the grid!");
          while (swapPossible === false) {
            this.state.grid = createGrid();
            swapPossible = isSwapPossible(
              convertGridToArray2D(this.state.grid),
              this
            ).swapPossible;
          }
          // broadcast the new grid
          this.broadcast("reset-grid", this.state);
        }

        this.nextTurn();
      }
    }
  }

  nextTurn() {
    const currentPlayerIndex = this.findPlayerIndexById(
      this.state.currentPlayer
    );

    this.state.players[currentPlayerIndex].isTurn = false;

    // get the other player
    const nextPlayerIndex =
      (currentPlayerIndex + 1) % this.state.players.length;

    this.state.players[nextPlayerIndex].isTurn = true;
    this.state.currentPlayer = this.state.players[nextPlayerIndex].id;

    // in case the next player is a bot, perform bot turn on server side
    if (this.state.currentPlayer === "bot") {
      setTimeout(async () => {
        // first get the candidate tiles where swap is possible
        const swapCandidates = isSwapPossible(
          convertGridToArray2D(this.state.grid),
          this
        ).swapCandidates;

        if (swapCandidates !== null) {
          const { tileA, tileB } = swapCandidates;
          this.broadcast("animate-swap", {
            tileA,
            tileB,
            isReverseSwap: false,
          });
        }
      }, 5);
    }
  }

  startTurn(client: Client) {
    const playerIndex = this.findPlayerIndexById(client.sessionId);

    this.state.players[playerIndex].isTurn = true;
    this.state.currentPlayer = client.sessionId;
  }

  enableTurn(client: Client) {
    const playerIndex = this.findPlayerIndexById(client.sessionId);
    this.state.players[playerIndex].isTurn = true;

    const nextPlayerIndex = (playerIndex + 1) % this.state.players.length;
    this.state.players[nextPlayerIndex].isTurn = false;
  }

  disableTurnForAllPlayers() {
    this.state.players.forEach((player: Player) => (player.isTurn = false));
  }

  setProfilePicKey(): void {
    if (this.state.players.length === 1) {
      this.state.players[0].profilePicKey = sampleProfilePicKeys[0];
      console.log(sampleProfilePicKeys[0]);
    } else {
      if (this.isBotGame === true) {
        this.state.players[1].profilePicKey = "botProfilePic";
      } else {
        this.state.players[1].profilePicKey = sampleProfilePicKeys[1];
      }
    }
  }

  startBotGame(client: Client): void {
    if (this.state.players.length === 1) {
      this.isBotGame = true;

      // initiate the bot player
      const botPlayer = new BotPlayer();

      // add the bot player to the game state
      this.state.players.push(botPlayer.getPlayer());
      console.log("Bot is added");
      console.log(this.state.players.length);
      this.setProfilePicKey();
      console.log(this.state.players[1].score);
      console.log(this.state.players[1].id);
      console.log(this.state.players[1].profilePicKey);
      console.log(this.state.players[1].isTurn);
      console.log(this.state.players[1].isReady);

      // start the game
      this.startGame();
    }
  }
}
