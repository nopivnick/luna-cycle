console.log("progress.js FOUND");

function updateCharIndex() {
  if (counter > charIndex) {
    charIndex = counter;
  }
  charIndex = constrain(charIndex, 0, characters.length - 1);
  // console.log("encoder: " + encoder);
  // console.log("charIndex: " + charIndex);
}

function updateCounter() {
  counter = (encoder - tempEncoder);
  previousCounter = (previousEncoder - tempPreviousEncoder)
  console.log(counter);
}

function resetCounter() {
  tempEncoder = encoder;
  tempPreviousEncoder = previousEncoder;
  counter = 0;
  previousCounter = 0;
}

console.log("progress.js LOADED");