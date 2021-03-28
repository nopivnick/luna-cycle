function updateEncoder() {
  previousEncoder = encoder
  if (keyIsDown(RIGHT_ARROW)) {
    isSpinning = true;
    isSpinningFwd = true;
    isSpinningBkwd = false;
    encoder++;
  } else if (keyIsDown(LEFT_ARROW)) {
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
}

function displayCounter() {
  if (isCounterDisplayed === true) {
    fill(255, 0, 0);
    text(("Encoder: " + encoder), windowWidth / 2, windowHeight / 2);
  }
}
