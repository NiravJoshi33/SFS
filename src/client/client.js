export function init(url) {
  const socket = new WebSocket(url);

  socket.onopen = () => console.log("Connected to the server");
  socket.onclose = () => console.log("Disconnected from the server");
  socket.onmessage = (event) =>
    console.log("Message from server: ", event.data);
  socket.onerror = (error) => console.log("WebSocket Error:", error);

  return socket;
}

export function sendData(socket, data) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  }
}
