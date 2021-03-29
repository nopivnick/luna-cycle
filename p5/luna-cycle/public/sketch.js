const socket = io();

// Listen for confirmation of connection
socket.on('connect', function () {
  console.log("Connected to server.");
  console.log("Socket id: ", socket.id);
});

socket.on("state", (data) => {
  state = JSON.parse(data);
  // console.log(state);
  updateState();
  updateCounter();
  updateDisplay();
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

let encoder;
let previousEncoder;

let isUserA_touchingPlate = false;
let isUserB_touchingPlate = false;
let isAandB_touchingPlates = false;

let isSpinning = false;
let isSpinningFwd = false;
let isSpinningBkwd = false;

let isGoTime = false;

let isTrackpadEncoder = false;

function setup() {
  setupCanvas();
  toggleCursor();
  setupSceneManager();
  hosted = true; // TODO: how do I get this from the server?
  if (hosted === true) {
    setInterval(() => {
      updateSamples()
    }, 100);
    setInterval(() => {
      updateTrackpadEncoder() // TODO: should the serial communication baud be a multiple of this interval?
    }, 25);
  }
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
  // displaySpinState();
  displayCounter();
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
  setupScreen(scene, tone);
  resetDisplay();
  // resetTrackpadEncoder(); TODO: incorporate trackpadEncoder 
  resetCounter();
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

function updateState() {
  encoder = state.encoder; // TODO: is there a smarter way to do this ...
  // console.log("encoder: " + encoder);
  previousEncoder = state.previousEncoder; // ... and this ...
  // console.log("previousEncoder: " + previousEncoder);
  isUserA_touchingPlate = state.isUserA_touchingPlate; // ... and this, etc.?
  isUserB_touchingPlate = state.isUserB_touchingPlate;
  isAandB_touchingPlates = state.isAandB_touchingPlates;
  isSpinning = state.isSpinning;
  // console.log("isSpinning: " + isSpinning);
  isSpinningFwd = state.isSpinningFwd;
  isSpinningBkwd = state.isSpinningBkwd;
  isGoTime = state.isGoTime;
  // console.log("isGoTime: " + isGoTime);
}
