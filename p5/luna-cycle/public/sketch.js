let state;

let canvas;

let scene = 0;
let previousScene = 0;
let sceneManager;
let sceneIndex;

let loopCounter = 0;

let tone = 'bliss';

let encoder = 0;
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

// Standard p5 draw() function
// 
// not used when using p5.SceneManager
//
//function draw() {
//
// }

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
// TODO: consider storing scenes as anonymous functions in an array 
//       in order to preload in sketch.js with a for loop
// scenes = [];
// scene[0] = function () {
//   // p5.SceneManager functions go here
// }
// scene[1] = function () {
//   // p5.SceneManager functions go here
// }
// // etc.
  sceneManager.showScene(scene0);
}

/**
 * p5.SceneManager draw function
 * 
 * Draws something in *all* scenes
 */
function drawScene() {
  background(0);
  displayEncoder();
  animateScreen();
  updateScene();
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

function getSceneNum() {
  scene = sceneManager.findSceneIndex(sceneManager.scene.fnScene);
}

function updateState() {
  encoder = state.encoder; // TODO: is there a smarter way to do this ...
  previousEncoder = state.previousEncoder; // ... and this ...
  isUserA_touchingPlate = state.isUserA_touchingPlate; // ... and this, etc.?
  isUserB_touchingPlate = state.isUserB_touchingPlate;
  isAandB_touchingPlates = state.isAandB_touchingPlates;
  isSpinning = state.isSpinning;
  isSpinningFwd = state.isSpinningFwd;
  isSpinningBkwd = state.isSpinningBkwd;
  isGoTime = state.isGoTime;
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