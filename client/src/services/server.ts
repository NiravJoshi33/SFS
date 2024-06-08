import { Client, Room } from "colyseus.js";
// import Phaser from "phaser";

export default class Server {
  private client: Client;
  public room!: Room;
  private events: Phaser.Events.EventEmitter;

  constructor() {
    this.client = new Client("ws://64.227.151.65:2567");
    this.events = new Phaser.Events.EventEmitter();
  }

  async join(): Promise<void> {
    this.room = await this.client.joinOrCreate("game-room");

    this.room.onStateChange.once(() => {
      // get initial room state
      console.log("initial room state Received");
    });
  }

  on(event: string, callback: () => void): void {
    this.events.on(event, callback);
  }
}
