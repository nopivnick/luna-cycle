console.log("encoder.js FOUND");

function updateTrackpadEncoder() {
  previousEncoder = encoder
  if (keyIsDown(RIGHT_ARROW) || cross > 0) {
    isSpinning = true;
    isSpinningFwd = true;
    isSpinningBkwd = false;
    encoder++;
  } else if (keyIsDown(LEFT_ARROW) || cross < 0) {
    isSpinning = true;
    isSpinningFwd = false;
    isSpinningBkwd = true;
    encoder--;
  } else {
    isSpinning = false;
    isSpinningFwd = false;
    isSpinningBkwd = false;
  }
  if (isSpinning) {
    updateCharIndex();
  }
  isFadingOut = (isSpinningBkwd && encoder < charIndex) || (isSpinningFwd && encoder > characters.length);
  isFadingIn = isSpinningFwd && encoder < charIndex;
  isFading = isFadingOut || isFadingOut;
  isProceeding = isSpinningFwd && charIndex < characters.length && !isFading;
  updateAlpha();
  // console.log("isSpinning: " + isSpinning);
  // console.log("encoder: " + encoder);
  // console.log("cross: " + cross);
}

function resetEncoder() {
  encoder = -1;
  previousEncoder = 0;
}

console.log("encoder.js lOADED");
