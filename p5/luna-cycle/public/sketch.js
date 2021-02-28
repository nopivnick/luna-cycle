let canvas;

let screen;

let scene = 0;
let sceneManager;
let sceneIndex;
let sceneCount = 17;

let loopCounter = 0;

// const bliss = 'bliss';
// const blah = 'blah';
// const bad = 'bad';

let tone = 'bliss';

// let characters = [];
let charIndex;
// let previousCharIndex;
// let highestCharIndex;

let encoder;
let previousEncoder;

let trackpadDistance = 0;
let prevTrackpadDistance = 0;
const ENCODER_INTERVAL = 20;

let isSpinning = false;
let isSpinningFwd = false;
let isSpinningBkwd = false;

let isFading = false;
let isFadingIn = false;
let isFadingOut = false;
let isProceeding = false;

let isAlphaOn = true;
// let alphaValue = 1;
let alphaFade = 0.005;

let isCursorDisplayed = false;
let isEncoderDisplayed = false;

let isScreenMirrored = false;

function setup() {
  setupCanvas();
  toggleCursor();
  setupSceneManager();
  // setInterval("updateSamples()", 100);
  setInterval(() => {
    updateSamples()
    updateEncoder() // TODO: should the serial communication baud be a multiple of this interval?
  }, 100);
}

function draw() {

}

function setupCanvas() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
}

function setupSceneManager() {
  sceneManager = new SceneManager();
  sceneManager.wire();
  // Preload scenes. Preloading is normally optional
  // ... but needed if showNextScene() is used.
  // The order in which scenes are added (preloaded) 
  // determines the scene's index in the scenes array.
  sceneManager.addScene(scene0);
  sceneManager.addScene(scene1);
  sceneManager.addScene(scene2);
  sceneManager.addScene(scene3);
  sceneManager.addScene(scene4);
  sceneManager.addScene(scene5);
  sceneManager.addScene(scene6);
  sceneManager.addScene(scene7);
  sceneManager.addScene(scene8);
  sceneManager.addScene(scene9);
  sceneManager.addScene(scene10);
  sceneManager.addScene(scene11);
  sceneManager.addScene(scene12);
  sceneManager.addScene(scene13);
  sceneManager.addScene(scene14);
  sceneManager.addScene(scene15);
  sceneManager.addScene(scene16);
  // for (i = 0; i < sceneCount; i++) { // TODO: preload scenes with a for loop
  // sceneManager.addScene(`scene${i}`);
  // print(`scene${i} preloaded!`);
  // }
  sceneManager.showScene(scene0);
}

/**
 * p5.SceneManager draw function
 * 
 * Draws something in *all* scenes
 */
function drawScene() {
  background(0);
  // toggleAlpha();
  updateSpinState();
  // displaySpinState();
  displayEncoder();
  displayScreen();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log("window size: " + windowWidth + " x " + windowHeight);
}


function toggleAlpha() {
  if (isAlphaOn === false) {
    screen = select('body');
    screen.style(`color: rgba(${red}, ${green}, ${blue}, 1)`);
    isAlphaOn = !isAlphaOn;
  } else {
    screen = select('body');
    screen.style(`color: rgba(${red}, ${green}, ${blue}, 0)`);
    isAlphaOn = !isAlphaOn;
  }
}

function toggleCursor() {
  if (isCursorDisplayed === false) {
    screen = select('body');
    screen.style('cursor: none')
    isCursorDisplayed = !isCursorDisplayed;
  } else {
    screen = select('body');
    screen.style('cursor: auto')
    isCursorDisplayed = !isCursorDisplayed;
  }
}

function toggleMirror() {
  screen = select('body'); // TODO: cleaner to mirror a div wrapped around the multiple <p>'s?
  // screen = select('div');
  if (isScreenMirrored === true) {
    screen.style('transform: none');
    // canvas.style('transform: none');
    isScreenMirrored = !isScreenMirrored;
  } else {
    screen.style('transform: rotateY(180deg)');
    // canvas.style('transform: rotateY(180deg)');
    isScreenMirrored = !isScreenMirrored;
  }
  // paragraphs = selectAll('p');
  // if (isScreenMirrored === true) {
  //   for (i = 0; i < paragraphs.length; i++) {
  //     this.style('transform: none');
  //   }
  //   isScreenMirrored = !isScreenMirrored;
  // } else {
  //   for (i = 0; i < paragraphs.length; i++) {
  //     this.style('transform: rotateY(180deg)');
  //   }
  //   isScreenMirrored = !isScreenMirrored;
  // }
}

function getSceneNum() {
  scene = sceneManager.findSceneIndex(sceneManager.scene.fnScene);
}

function onEnterScene() {
  console.log(sceneManager.scene.fnScene.name);
  getSceneNum();
  // let div = createDiv(); // TODO: fix this
  // text = setupScreen(scene, tone);
  // div.child(text);
  setupScreen(scene, tone);
  resetCursor();
}

function onExitScene() {
  removeElements();
  if (scene == sceneManager.scenes.length - 1) {
    loopCounter++;
    updateTone();
  }
}

function updateTone() {
  if (loopCounter % 4 === 3) {
    /* Bad */
    tone = 'bad';
  } else if (loopCounter % 2 === 0) {
    /* Blah */
    tone = 'blah';
  } else if (loopCounter % 4 === 1) {
    /* Bliss */
    tone = 'bliss';
  }
}