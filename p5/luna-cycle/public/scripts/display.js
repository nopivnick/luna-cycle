console.log("display.js FOUND");

let isFading = false;
let isFadingIn = false;
let isFadingOut = false;
let isProceeding = false;

let isAlphaOn = true;
let alphaValue = 1;
let alphaFade = 0.005;

let isCursorDisplayed = false;
let isCounterDisplayed = false;
let isScreenMirrored = false;

function displayScreen() {
  characters = selectAll('span');
  if (isProceeding) {
    if (alphaValue < 1) {
      increaseAlpha();
    }
    for (i = 0; i <= charIndex; i++) {
      characters[i].style(`color: rgba(${red}, ${green}, ${blue}, ${alphaValue})`);
    }
  } else if (isFading) {
    for (i = 0; i <= charIndex; i++) {
      characters[i].style(`color: rgba(${red}, ${green}, ${blue}, ${alphaValue})`);
    }
  }
  if (alphaValue < 0 && isSpinningFwd) {
    updateScene();
  }
}

function updateDisplay() {
  if (isSpinning) {
    updateCharIndex();
  }
  isFadingOut = (isSpinningBkwd && encoder < charIndex) || (isSpinningFwd && encoder > characters.length);
  isFadingIn = isSpinningFwd && encoder < charIndex;
  isFading = isFadingOut || isFadingOut;
  isProceeding = isSpinningFwd && charIndex < characters.length && !isFading;
  updateAlpha();
}

function resetDisplay() {
  alphaValue = 1; // otherwise characters on a new screen fade in incrementally rather than turn opaque
  charIndex = -1;
}

function updateAlpha() {
  if (isAlphaOn === false) {
    alphaValue = 1;
  } else if (isFadingOut) {
    decreaseAlpha();
  } else if (isFadingIn) {
    counter = charIndex;
    increaseAlpha();
  }
}

function decreaseAlpha() {
  alphaValue -= alphaFade;
}

function increaseAlpha() {
  alphaValue += alphaFade;
}

function setCSS(paragraph, i) {
  if (lunaData.scenes[scene].paragraphs[i].cssClass !== null) { // if the paragraph has special CSS styling ...
    container.addClass("messages");
    paragraph.addClass(lunaData.scenes[scene].paragraphs[i].cssClass); // ... apply the specified CSS class.
  }
}

function setColor(i) {
  if ((lunaData.scenes[scene].paragraphs[i].cssClass !== null)) {
    red = 0;
    green = 0;
    blue = 0;
  } else {
    red = 50;
    green = 205;
    blue = 50;
  }
}

function setAlpha(span) {
  if (isAlphaOn === true) {
    // TODO: possible to handle alpha with a class in css?
    span.style(`color: rgba(${red}, ${green}, ${blue}, 0)`);
  } else {
    span.style(`color: rgba(${red}, ${green}, ${blue}, 1)`);
  }
}

function updateScene() {
  sceneManager.showNextScene();
}

function displayCounter() {
  if (isCounterDisplayed === true) {
    fill(255, 0, 0);
    text(("Encoder: " + encoder + "    " + "Counter: " + counter + "    " + "CharIndex: " + charIndex + "    " + "AlphaValue: " + alphaValue), windowWidth / 2, windowHeight / 2);
    // let counter = createP("Encoder: " + encoder); // TODO: do this in the DOM instead but canvas is -1 on the Z plane
    // counter.style('position: fixed');
    // counter.style('top: 50%');
    // counter.style('left: 50%');
    // counter.style('transform: translate(-50%, -50%)');
    // counter.style('color: red');
  }
}

console.log("display.js lOADED");
