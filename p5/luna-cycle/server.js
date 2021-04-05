/**
 * Attribution:
 * - https://github.com/ITPNYU/physcomp/blob/master/Labs/Node%20Serial%20Lab/index.js
 */

/**
 * To run server.js with serial communication type the following on the command line:
 * $ node index.js <portName>
 * where <portName> is the name of the serial port connected to the Arduino, e.g. /dev/cu.usbmodemXXXXX (on OSX)
 */

const hosted = false; // "physical" or "hosted"

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
}

let input = {
  encoder: -999,
  previousEncoder: -999,
  isUserA_touchingPlate: false,
  isUserB_touchingPlate: false,
  isAandB_touchingPlates: false,
  isSpinning: false,
  isSpinningFwd: false,
  isSpinningBkwd: false
}

let status = {
  isGoTime: false,
  isUserA_myTurn: true,
  isUserB_myTurn: true,
  scene: 0,
  tone: "bliss"
}

let isUserA_touchingPlate = false;
let isUserB_touchingPlate = false;
let isAandB_touchingPlates = false;
let isSpinning = false;
let isSpinningFwd = false;
let isSpinningBkwd = false;

let isUserA_lampOn = false;
let isUserB_lampOn = false;

let isUserA_myTurn = false;
let isUserB_myTurn = false;

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

  // socket.emit("hosted", hosted);

  socket.emit("input", input);

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

/**
 * SerialPort stuff
 * 
 * Definitions for the serial events and the functions called when those serial events occur.
 */

function sendArduinoLamp() {
  if (isUserA_myTurn) {
    mySerialPort.write(status.isUserA_lampOn = true);
  }
  if (isUserB_myTurn) {
    mySerialPort.write(status.isUserB_lampOn = true);
  }
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
  // data = data.trim();
  // if (data === "tick++" || "tick--") {
  //   sendBrowserEncoder(data);
  //   console.log(data);
  // }
  // console.log(data);
  input = data;
  console.log(input);
  io.emit("input", input);
}

// // ------------------------ Server function
// function sendData(request) {
//   // print out the fact that a client HTTP request came in to the server:
//   console.log("Got a client request, sending them the data.");
//   // respond to the client request with the latest serial string:
//   request.respond(serialData);
// }