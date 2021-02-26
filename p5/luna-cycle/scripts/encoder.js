function updateEncoder() {
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
}

function displayEncoder() {
  if (isEncoderDisplayed === true) {
    fill(255, 0, 0);
    text(("Encoder: " + encoder), windowWidth / 2, windowHeight / 2);
    // let counter = createP("Encoder: " + encoder); // TODO: do this in the DOM instead but canvas is -1 on the Z plane
    // counter.style('position: fixed');
    // counter.style('top: 50%');
    // counter.style('left: 50%');
    // counter.style('transform: translate(-50%, -50%)');
    // counter.style('color: red');
  }
}
