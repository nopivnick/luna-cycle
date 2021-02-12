let scene;
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

let isAlphaDisplayed = true;
let alphaValue = 1;

let isEncoderDisplayed = true;

function preload() {
  scene = loadStrings('assets/text/scene0.txt');
}

function setup() {
  setupCanvas();
  setupScenes();
  setupScreens();
}

function setupCanvas() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
}

function setupScenes() {
  scenes.push(scene);
}

function setupScreens() {
  for (i = 0; i < scenes.length; i++) {
    for (j = 0; j < scenes[i].length; j++) {
      let paragraph = createP();
      for (k = 0; k < scenes[i][j].length; k++) {
        let character = scenes[i][j].charAt(k);
        let span = createSpan(character);
        span.style('position: relative');
        if (isAlphaDisplayed === true) {
          span.style('color: rgba(255, 255, 255, 0)'); // MIMI: better to handle alpha in css? 
        } else {
          span.style('color: rgba(255, 255, 255, 1)');
        }
        // make each <span>char</span> a child of it's respective paragraph
        paragraph.child(span);
      }
    }
  }
  charIndex = -1;
  encoder = -1; // TODO: the first character is not visible on initial display of screen if set to 0
  previousEncoder = 0;
}

function draw() {
  background(0);
  updateEncoder(); // TODO: should this be tied to time (or serialIn?) rather than framerate?
  displayScreen();
  displayEncoder();
}

function displayScreen() {
  characters = selectAll('span');
  if (isProceeding) {
    characters[charIndex].style('color: rgba(255, 255, 255, ' + alphaValue + ')');
  } else if (isFading) {
    for (i = 0; i <= charIndex; i++) {
      characters[i].style('color: rgba(255, 255, 255, ' + alphaValue + ')');
    }
  }
}

function updateEncoder() {
  previousEncoder = encoder
  if (keyIsDown(RIGHT_ARROW)) {
    isSpinning = true;
    isSpinningFwd = true;
    isSpinningBkwd = false;
    encoder++;
    // print("Encoder: " + encoder);
  } else if (keyIsDown(LEFT_ARROW)) {
    isSpinning = true;
    isSpinningFwd = false;
    isSpinningBkwd = true;
    encoder--;
    // print("Encoder: " + encoder);
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
  if (isFadingOut) {
    alphaValue -= 0.005;
  } else if (isFadingIn) {
    alphaValue += 0.005; // try higher value or try encoder = charIndex and alphaValue = 1;
  }
  if (alphaValue < 0) {
    // Move to next scene OR move to previous hidden scene
    // setupScreen();
  }
}

function updateCharIndex() {
  if (encoder > charIndex) {
    charIndex = encoder;
  }
  charIndex = constrain(charIndex, 0, characters.length - 1);
}

function updateAlpha() {
  if (isAlphaDisplayed === false) {
    // TODO: immediately turn alphaValue on entire screen to 1 (make text opaque)
  } else if ((isSpinningBkwd === true) || (charIndex === characters.length - 1 && isSpinningFwd === true)) {
  } else if (encoder > charIndex) {
    alphaValue = alphaValue - 0.005;
  }
}

function displayEncoder() {
  if (isEncoderDisplayed === true) {
    fill(255, 0, 0);
    text(("Encoder: " + encoder), windowWidth / 2, windowHeight / 2);
  }
}