console.log("progress.js FOUND");

let counter = 0;
let previousCounter = 0;

let tempEncoder = 0;
let tempPreviousEncoder = 0;

let characters = [];
let charIndex;
let charIndexDelay = 100;

function updateCounter() {
  counter = (encoder - tempEncoder);
  previousCounter = (previousEncoder - tempPreviousEncoder)
}

function resetCounter() {
  tempEncoder = encoder;
  tempPreviousEncoder = previousEncoder;
  counter = 0;
  previousCounter = 0;
}

function updateCharIndex() {
  if (counter - charIndexDelay > charIndex) {
    charIndex = counter - charIndexDelay;
  }
  charIndex = constrain(charIndex, 0, characters.length - 1);
}

console.log("progress.js LOADED");