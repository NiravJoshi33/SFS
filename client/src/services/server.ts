import { Client } from "colyseus.js";
// import Phaser from "phaser";

export default class Server {
  private client: Client;
  // private events: Phaser.Events.EventEmitter;

  constructor() {
    this.client = new Client("ws://localhost:2567");
    // this.events = new Phaser.Events.EventEmitter();
  }

  async join() {
    const room = await this.client.joinOrCreate("game-room");

    room.onStateChange.once((state) => {
      // get initial room state
      console.log("initial room state:", state);
    });
  }
}
