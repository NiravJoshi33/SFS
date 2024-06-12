import { Schema, type, ArraySchema } from "@colyseus/schema";
import { timerConfig } from "./gameConfig";

// beyond the usual types, colyseus doesn't support complex/composite types directly
// so we have to define these composite types as classes that extend Schema and use them in our schema
// Reference: https://docs.colyseus.io/state/schema/#arrayschema

// InnerArray: for defining inner array of the 2D array grid
export class InnerArray extends Schema {
  @type(["number"]) innerArray = new ArraySchema<number>();
}

// SpecialMovesInvetory: for defining specialMovesInventory object
class SpecialMovesInventory extends Schema {
  @type("number") grenade: number = 0;
  @type("number") railgun: number = 0;
  @type("number") nuke: number = 0;
}

// Player: for defining player object
export class Player extends Schema {
  @type("string") id: string = "";
  @type("string") username: string = "";
  @type("number") score: number = 0;
  @type("number") highscore: number = 0;
  @type("number") totalScore: number = 0;
  @type("boolean") isTurn: boolean = false;
  @type("boolean") isWinner: boolean = false;
  @type("boolean") isReady: boolean = false;
  @type("boolean") isBot: boolean = false;
  @type("string") profilePicKey: string = "";
  @type(SpecialMovesInventory) specialMovesInventory =
    new SpecialMovesInventory();
}

// Tile: for defining tile object
class Tile extends Schema {
  @type("number") x: number = 999; // 999 is a placeholder value as 0 is a valid value
  @type("number") y: number = 999;
}

// LastSwappedTiles: for defining lastSwappedTiles object
export class LastSwappedTiles extends Schema {
  @type(Tile) tileA = new Tile();
  @type(Tile) tileB = new Tile();
}

export default class GameState extends Schema {
  @type("string") currentPlayer: string = "";
  @type("string") winner: string = "";
  @type([InnerArray]) grid = new ArraySchema<InnerArray>();
  @type([Player]) players = new ArraySchema<Player>();
  @type(LastSwappedTiles) lastSwappedTiles = new LastSwappedTiles();
  @type("string") status: string =
    "waiting for players" || "playing" || "game over";
  @type("number") lobbyTimeOut: number = timerConfig.lobbyTimeOut;
  @type("number") turnTimeOut: number = timerConfig.turnTimeOut;

  constructor() {
    super();
    this.currentPlayer = "";
    this.winner = "";
    this.grid = new ArraySchema<InnerArray>();
    this.players = new ArraySchema<Player>();
    this.lastSwappedTiles = new LastSwappedTiles();
    this.status = "waiting for players";
    this.lobbyTimeOut = timerConfig.lobbyTimeOut;
    this.turnTimeOut = timerConfig.turnTimeOut;
  }
}
