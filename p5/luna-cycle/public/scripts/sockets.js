console.log("sockets.js FOUND");

const socket = io();

// Listen for confirmation of connection
socket.on('connect', function () {
  console.log("Connected to server.");
  console.log("Socket id: ", socket.id);
});

socket.on("isArduino", (data) => {
  if (data === "false") {
    isArduino = false;
  } else if (data === "true") {
    isArduino = true;
  }
  console.log("isArduino: " + isArduino);
});

socket.on("input", (data) => {
  input = JSON.parse(data);
  updateInput();
  updateOutput();
});

console.log("sockets.js LOADED");
