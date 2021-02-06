let scene;
let scene0;
let scenes = [];
let screens = [];

let span;

let charIndex;
let previousCharIndex;
let highestCharIndex;

let encoder;
let previousEncoder = 0;

let isSpinning = false;
let isSpinningFwd = false;
let isSpinningBkwd = false;

let isAlphaOn = true;
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
      paragraph = createP();
      for (k = 0; k < scenes[i][j].length; k++) {
        let character = scenes[i][j].charAt(k);
        let span = createSpan(character);
        span.style('position: relative');
        if (isAlphaOn === true) {
          span.style('color: rgba(255, 255, 255, 0)');
        } else {
          span.style('color: rgba(255, 255, 255, 1)');
        }
        // make each <span>char</span> a child of it's respective paragraph
        paragraph.child(span);
      }
    }
  }
  characterIndex = 0;
  encoder = -1; // TODO: the first character is not visible on initial display of screen
}

function draw() {
  background(0);
  updateEncoder();
  displayScreen();
  displayEncoder();
}

function displayScreen() {
  characters = selectAll('span');
  if (encoder > previousEncoder && encoder < characters.length) {
    previousEncoder = encoder; // TODO: seems like this belongs in updateEncoder()
    updateCharIndex();
    updateAlpha();
    characters[charIndex].style('color: rgba(255, 255, 255, ' + alphaValue + ')');
  } else if (encoder < previousEncoder || encoder > characters.length) {
    previousEncoder = encoder; // TODO: seems like this belongs in updateEncoder()
    updateCharIndex();
    updateAlpha();
    for (i = 0; i < charIndex; i++) {
      characters[i].style('color: rgba(255, 255, 255, ' + alphaValue + ')');
    }
  }
}

function updateEncoder() {
  if (keyIsDown(RIGHT_ARROW)) {
    isSpinning = true;
    isSpinningFwd = true;
    isSpinningBkwd = false;
    encoder++;
    print("Encoder: " + encoder);
  } else if (keyIsDown(LEFT_ARROW)) {
    isSpinning = true;
    isSpinningFwd = false;
    isSpinningBkwd = true;
    encoder--;
    print("Encoder: " + encoder);
  } else {
    isSpinning = false;
    isSpinningFwd = false;
    isSpinningBkwd = false;
  }
  // previousEncoder = encoder; // TODO: seems like this belongs here but can't get it to work
}

function updateCharIndex() {
  if (encoder >= 0 && encoder <= characters.length) {
    charIndex = encoder;
    // print("Character Index: " + charIndex);
  } else if (encoder < 0) {
    charIndex = 0;
    // print("Character Index: " + charIndex);
  } else if (encoder > characters.length) {
    charIndex = characters.length;
    // print("Character Index: " + charIndex);
  }
  // print("Character Index: " + charIndex);
  updateHighestCharIndex();
  previousCharIndex = charIndex;
}

function updateHighestCharIndex() {
  if (charIndex > previousCharIndex) {
    highestCharIndex = charIndex;
  }
}

function updateAlpha() {
  if (isAlphaOn === false) {
    // TODO: immediately turn alphaValue on entire screen to 1 (text fully make opaque)
  } else if ((isSpinningBkwd === true) || (charIndex === characters.length && isSpinningFwd === true)) {
    alphaValue = alphaValue - 0.005;
  }
}

function displayEncoder() {
  if (isEncoderDisplayed === true) {
    fill(255, 0, 0);
    text(("Encoder: " + encoder), windowWidth / 2, windowHeight / 2);
  }
}