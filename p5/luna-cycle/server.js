/**
 * Attribution:
 * - https://github.com/ITPNYU/physcomp/blob/master/Labs/Node%20Serial%20Lab/index.js
 */

/**
 * To run server.js with serial communication type the following on the command line:
 * $ node index.js <portName>
 * where <portName> is the name of the serial port connected to the Arduino, e.g. /dev/tty.usbserial-xxxx (on OSX)
 */

const SerialPort = require('serialport'); // include the serialport library
const portName = process.argv[2]; // get the port name from the command line
var myPort = new SerialPort(portName, { // open the port ...
  baudRate: 115200 // and set baud.
});
var Readline = SerialPort.parsers.Readline; // make instance of Readline parser
var parser = new Readline(); // make a new parser to read ASCII lines
myPort.pipe(parser); // pipe the serial stream to the parser

const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let users = {
  userA: null,
  userB: null
}

let state = {
  scene: 0,
  tone: "bliss",
  turn: "userA"
  // encoder: -1,
  // previousEncoder: -1,
  // charIndex: 0
}

let scene = 0;

app.use(express.static("public"));

io.on('connection', (socket) => {
  console.log('a user connected: ' + socket.id);

  // Keep track of users
  if (users.userA && users.userB) { // If two sockets are already established ...
    socket.disconnect(); // disconnect the incoming user ...
    console.log("There are already two users.");
    console.log('a user disconnected: ' + socket.id);
  } else if (!users.userA) { // otherwise check if the first slot is available ...
    users.userA = socket.id; // and add socket to users object ...
  } else {
    users.userB = socket.id; // otherwise add socket to second slot.
  }

  console.log(users);

  socket.emit("state", state);

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




// these are the definitions for the serial events:
myPort.on('open', showPortOpen); // called when the serial port opens
myPort.on('close', showPortClose); // called when the serial port closes
myPort.on('error', showPortError); // called when there's an error with the serial port
parser.on('data', readSerialData); // called when there's new data incoming

// these are the functions called when the serial events occur:
function showPortOpen() {
  console.log("Serial port OPEN.");
  console.log("Data rate: " + myPort.baudRate);
}

function showPortClose() {
  console.log('Serial port CLOSED.');
}

function showPortError(error) {
  console.log('Serial port ERROR: ' + error);
}

function readSerialData(data) {
  console.log(data);
}

// // ------------------------ Server function
// function sendData(request) {
//   // print out the fact that a client HTTP request came in to the server:
//   console.log("Got a client request, sending them the data.");
//   // respond to the client request with the latest serial string:
//   request.respond(serialData);
// }
