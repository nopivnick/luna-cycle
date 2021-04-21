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

socket.on("whoAmI", (data) => {
  whoAmI = data;
  console.log("whoAmI: " + whoAmI);
});

socket.on("state", (data) => {
  state = data;
  updateState();
  console.log("state:");
  console.log(state);
  console.log("");
  console.log("whoseTurn: " + whoseTurn);
  console.log("whoAmI: " + whoAmI);
  console.log("isMyTurn: " + isMyTurn);
  console.log("isDoneReading: " + isDoneReading);
  console.log("\n");
});

socket.on("input", (data) => {
  input = JSON.parse(data);
  updateInput();
  updateOutput();
});

console.log("sockets.js LOADED");
