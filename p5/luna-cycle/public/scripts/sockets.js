console.log("sockets.js FOUND");

const socket = io();

// Listen for confirmation of connection
socket.on('connect', function () {
  console.log("Connected to server.");
  console.log("Socket id: ", socket.id);
});

socket.on("input", (data) => {
  input = JSON.parse(data);
  // console.log(input);
  updateInput();
  updateCounter();
  if (isSpinning) {
    updateCharIndex(); // TODO: why does this throw an error if not inside the conditional?
  }
  updateProgress();
  updateAlpha();
});

console.log("sockets.js LOADED");
