console.log("sockets.js FOUND");

const socket = io();

// Listen for confirmation of connection
socket.on('connect', function () {
  console.log("Connected to server.");
  console.log("Socket id: ", socket.id);
});

socket.on("state", (data) => {
  state = JSON.parse(data);
  // console.log(state);
  updateState();
  updateCounter();
  updateDisplay();
  if (isSpinning) {
    updateCharIndex(); // TODO: why does this throw an error if not in the conditional?
  }
  updateAlpha();
});

console.log("sockets.js LOADED");
