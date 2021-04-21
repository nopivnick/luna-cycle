/**
 * Attribution:
 * - https://github.com/ITPNYU/physcomp/blob/master/Labs/Node%20Serial%20Lab/index.js
 */

/**
 * To run server.js with serial communication type the following on the command line:
 * $ node index.js <portName> <true/false> <0/1/2>
 * where <portName> is the name of the serial port connected to the Arduino, e.g. /dev/cu.usbmodemXXXXX (on OSX)
 * <true/false> is whether input is coming from an Arduino
 * <0/1/2> is how many users and whether capacitive touch is in effect
 */

const playerMode = process.argv[4];
const isArduino = process.argv[3]; // get the context from the command line

const SerialPort = require('serialport'); // include the serialport library
const portName = process.argv[2]; // get the port name from the command line
const mySerialPort = new SerialPort(portName, { // open the port ...
  baudRate: 115200 // ...  and set baud.
});
var Readline = SerialPort.parsers.Readline; // make an instance of Readline parser
var parser = new Readline(); // make a new parser to read ASCII lines
mySerialPort.pipe(parser); // pipe the serial stream to the parser

const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let users = {
  userA: null,
  userB: null
};

let input = JSON.stringify({ // TODO: change variable name to sensors
  encoder: 0,
  previousEncoder: 0,
  isUserA_touchingPlate: false,
  isUserB_touchingPlate: false,
  isAandB_touchingPlates: false,
  isSpinning: false,
  isSpinningFwd: false,
  isSpinningBkwd: false
});

let state = {
  playerMode: playerMode,
  whoseTurn: "userA"
  // scene: 0,
  // tone: "bliss"
};

app.use(express.static("public"));

io.on('connection', (socket) => {
  console.log('a user connected: ' + socket.id);

  // Keep track of users
  if (users.userA && users.userB) { // If two sockets are already established ...
    socket.disconnect(); // disconnect the incoming user ...
    console.log("There are already two users.");
    console.log('a user disconnected: ' + socket.id);
  } else if (!users.userA) { // otherwise check if the first slot is available ...
    users.userA = socket.id; // and add socket to userA slot ...
    // TODO: tell user what their state should be
  } else {
    users.userB = socket.id; // otherwise add socket to userB slot.
    // TODO: tell user what their state should be
  }

  console.log(users);
  console.log("state: " + state);

  let whoAmI = getKeyByValue(users, socket.id);

  console.log("whoAmI: ", whoAmI);
  socket.emit("whoAmI", whoAmI); // tell browser tab which user they are...

  console.log("isArduino: " + isArduino);
  socket.emit("isArduino", isArduino);

  socket.emit("state", state);

  socket.emit("input", input);

  socket.on("isDoneReading", (data) => {
    console.log(getKeyByValue(users, socket.id) + " just sent isDoneReading: " + data)
    if (getKeyByValue(users, socket.id) == "userA") {
      state.whoseTurn = "userB";
      // console.log(getKeyByValue(users, socket.id) + " isDoneReading: " + data)
    }
    if (getKeyByValue(users, socket.id) == "userB") {
      state.whoseTurn = "userA";
      // console.log(getKeyByValue(users, socket.id) + " isDoneReading: " + data)
    }
    console.log("server just sent state.whoseTurn: " + state.whoseTurn);
    io.emit("state", state);
  })

  socket.on('disconnect', () => {
    console.log('a user disconnected: ' + socket.id);
    if (users.userA === socket.id) {
      users.userA = null;
    } else {
      users.userB = null;
    }
    console.log(users);
  });
});

const listener = server.listen(3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
};

/**
 * SerialPort stuff
 * 
 * Definitions for the serial events and the functions called when those serial events occur.
 */

function sendWhoseTurn() {
  mySerialPort.write(status.whoseTurn);
}

mySerialPort.on('open', showPortOpen);
parser.on('data', readSerialData);
mySerialPort.on('close', showPortClose);
mySerialPort.on('error', showPortError);

function showPortOpen() {
  console.log("Serial port OPEN.");
  console.log("Data rate: " + mySerialPort.baudRate);
}

function showPortClose() {
  console.log('Serial port CLOSED.');
}

function showPortError(error) {
  console.log('Serial port ERROR: ' + error);
}

function readSerialData(data) {
  input = data;
  // console.log(input);
  io.emit("input", input);
}

// // ------------------------ Server function
// function sendData(request) {
//   // print out the fact that a client HTTP request came in to the server:
//   console.log("Got a client request, sending them the data.");
//   // respond to the client request with the latest serial string:
//   request.respond(serialData);
// }