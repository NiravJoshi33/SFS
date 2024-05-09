const WebSocket = require("ws");
const { createGrid } = require("../shared/grid_utils");

const server = new WebSocket.Server({ port: 8085 });

server.on("connection", (socket) => {
  console.log("Client connected!");

  socket.on("message", (message) => {
    console.log(`Received:`, message);
    // Echo the message back to client
    socket.send(`Received: ${message}`);
    if (!message) {
      socket.send("Empty message received");
    } else {
      const parsedMessage = JSON.parse(message);

      let messageType = parsedMessage.type;

      if (messageType === "createGridRequest") {
        let grid = createGrid();
        socket.send(
          JSON.stringify({
            type: "createGridResponse",
            data: {
              gridStatus: grid,
            },
          })
        );
      }
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected.");
  });
});

console.log("Server started on ws://localhost:8085");
