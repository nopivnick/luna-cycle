function updateCharIndex() {
  if (encoder > charIndex) {
    charIndex = encoder;
  }
  charIndex = constrain(charIndex, 0, characters.length - 1);
}

function updateAlpha() {
  if (isAlphaOn === false) {
    alphaValue = 1;
  } else if (isFadingOut) {
    decreaseAlpha();
  } else if (isFadingIn) {
    encoder = charIndex;
    increaseAlpha();
  }
}

function decreaseAlpha() {
  alphaValue -= alphaFade;
}

function increaseAlpha() {
  alphaValue += alphaFade;
}

function updateScene() {
  if (scene < scenes.length - 1) {
    scene++;
  } else {
    scene = 0;
  }
  setupScreen(scene);
}

function displayScreen() {
  characters = selectAll('span');
  if (isProceeding) {
    if (alphaValue < 1) {
      increaseAlpha();
    }
    for (i = 0; i <= charIndex; i++) {
      characters[i].style('color: rgba(50, 205, 50, ' + alphaValue + ')');
    }
  } else if (isFading) {
    for (i = 0; i <= charIndex; i++) {
      characters[i].style('color: rgba(50, 205, 50, ' + alphaValue + ')');
    }
  }
  if (alphaValue < 0 && isSpinningFwd) {
    updateScene();
  }
}
