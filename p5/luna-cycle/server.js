const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static("public"));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const listener = http.listen(3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
