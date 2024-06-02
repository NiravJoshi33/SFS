// importing dependencies
import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";
import GameRoom from "./gameRoom";

const port = Number(process.env.PORT || 2567);

const app = express(); // create express app
app.use(cors()); // enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // enable JSON body parsing

const server = http.createServer(app); // create http server
const gameServer = new Server({ server: server, devMode: true }); // attach game server to http server

// TODO: Add your room handlers
gameServer.define("game-room", GameRoom);

// register colyseus monitor AFTER registering your room handlers
app.use("/colyseus", monitor());

gameServer.listen(port);
console.log(`Listening on ws://localhost:${port}`);
