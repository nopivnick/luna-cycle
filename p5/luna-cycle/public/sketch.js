const socket = io();

// Listen for confirmation of connection
socket.on('connect', function() {
  console.log("Connected to server.");
  console.log("Socket id: ", socket.id);
});

socket.on("state", (data) => {
  state = data;
  console.log(state);
});

socket.on("encoder", (data) => {
  // console.log(data);
  data = data.trim();
  if (data === 'tick++') {
    isProceeding === true;
    encoder++;
    console.log(data);
  } else if (data === "tick--") {
    encoder--;
    console.log(data);
  }
});


let state;

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

let isMyTurn = false;

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
  setInterval(() => {
    updateSamples()
  }, 100);
  setInterval(() => {
    updateEncoder() // TODO: should the serial communication baud be a multiple of this interval?
  }, 25);
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
  // for (i = 0; i < scenes.length; i++) { // TODO: preload scenes with a for loop
  // sceneManager.addScene(scenes[i]);
  // print(`scenes${i} preloaded!`);
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
  // updateSpinState();
  // displaySpinState();
  displayEncoder();
  displayScreen();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log("window size: " + windowWidth + " x " + windowHeight);
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

function updateTone() { // TODO: not working
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
