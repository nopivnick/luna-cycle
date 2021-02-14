let scene = 0;
let scenes = [];
let screens = [];

let charIndex;
// let previousCharIndex;
// let highestCharIndex;

let encoder;
let previousEncoder;

let isSpinning = false;
let isSpinningFwd = false;
let isSpinningBkwd = false;

let isFading = false;
let isFadingIn = false;
let isFadingOut = false;
let isProceeding = false;

let isAlphaOn = true;
let alphaValue = 1;
let alphaFade = 0.005;

let isEncoderDisplayed = true;

function preload() {
  scene0 = loadStrings('assets/text/scene0.txt');
  scene1 = loadStrings('assets/text/scene1.txt');
  scene2 = loadStrings('assets/text/scene2.txt');
}

function setup() {
  setupCanvas();
  setupScenes();
  setupScreen(scene);
}

function setupCanvas() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
}

function setupScenes() {
  scenes.push(scene0);
  scenes.push(scene1);
  scenes.push(scene2);
}

function setupScreen(scene) {
  removeElements();
  for (i = 0; i < scenes[scene].length; i++) {
    let paragraph = createP();
    for (j = 0; j < scenes[scene][i].length; j++) {
      let character = scenes[scene][i].charAt(j);
      let span = createSpan(character);
      span.style('position: relative');
      if (isAlphaOn === true) {
        span.style('color: rgba(50, 205, 50, 0)'); // TODO: better to handle alpha with a class in css? 
      } else {
        span.style('color: rgba(50, 205, 50, 1)');
      }
      // make each <span>char</span> a child of it's respective paragraph
      paragraph.child(span);
    }
  }
  resetCursor();
}

function resetCursor() {
  alphaValue = 1; // otherwise characters on a new screen fade in incrementally rather than turn opaque
  charIndex = -1;
  encoder = -1;
  previousEncoder = 0;
}

function draw() {
  background(0);
  updateEncoder(); // TODO: should this be tied to time (or serialIn?) rather than framerate?
  displayScreen();
  displayEncoder();
}

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

function displayEncoder() {
  if (isEncoderDisplayed === true) {
    fill(255, 0, 0);
    text(("Encoder: " + encoder), windowWidth / 2, windowHeight / 2);
  }
}