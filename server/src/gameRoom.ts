import { Room, Client } from "colyseus";

export default class GameRoom extends Room {
  onCreate(options: any): void | Promise<any> {
    console.log("Game room created!", options);
  }

  onJoin(client: Client): void | Promise<any> {
    console.log("Client joined!");
    console.log(client);
  }
}
