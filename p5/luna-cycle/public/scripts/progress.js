console.log("progress.js FOUND");

let counter = 0;
let previousCounter = 0;

let encoderDelta = 0;
let previousEncoderDelta = 0;

let characters = [];
let charIndex = -1;
let charIndexDelay = 0;

function updateCounter() {
  if (isGoTime && isMyTurn) {
    counter = (encoder - encoderDelta);
    previousCounter = (previousEncoder - previousEncoderDelta)
  } else {
    encoderDelta = encoder;
    previousEncoderDelta = previousEncoder;
  }
}

function resetCounter() {
  encoderDelta = encoder;
  previousEncoderDelta = previousEncoder;
  counter = -1;
  previousCounter = -1;
}

function updateCharIndex() {
  if (counter - charIndexDelay > charIndex) {
    charIndex = counter - charIndexDelay;
  }
  charIndex = constrain(charIndex, -1, characters.length - 1);
}

console.log("progress.js LOADED");