// importing dependencies
import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";
import GameRoom from "./gameRoom";
import dotenv from "dotenv";
dotenv.config();

const port = Number(process.env.PORT || 2567);
const serverEndpoint = process.env.SERVER_ENDPOINT || `ws://localhost:${port}`;

const app = express(); // create express app

// CORS oprions
const corsOptions = {
  origin: serverEndpoint,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions)); // enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // enable JSON body parsing

const server = http.createServer(app); // create http server
const gameServer = new Server({ server: server, devMode: true }); // attach game server to http server

// add health check route
app.get("/health", (req, res) => {
  console.log("Health check");
  res.status(200).send("WELCOME TO THE SERVER. SERVER IS UP AND RUNNING.");
});

// handle preflight requests
app.options("*", cors(corsOptions));

// TODO: Add your room handlers
gameServer.define("game-room", GameRoom);

// register colyseus monitor AFTER registering your room handlers
app.use("/colyseus", monitor());

gameServer.listen(port);
console.log(`Listening on port ${port}`);
