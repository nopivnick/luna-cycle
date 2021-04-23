// let user; // a or b

let whoAmI; // userA or userB

let playerMode; // 0 (1 User no touch); 1 (1 user w/ touch); 2 (2 users w/ touch)

let input;

let isArduino = true;

let canvas;

let scene = 0;
let previousScene = 0;
let sceneManager;
let sceneIndex;

let loopCounter = 1;

let tone = 'bliss';

let encoder = 0;
let previousEncoder;

let isUserA_touchingPlate = false;
let isUserB_touchingPlate = false;
// let isAandB_touchingPlates = false;

let isSpinning = false;
let isSpinningFwd = false;
let isSpinningBkwd = false;

let isTableReady = false;

let state;

let whoseTurn;

let isMyTurn = false;

let isDoneReading = false;
// let prevIsDoneReading = false;

let isGoTime = false;

let isTrackpadEncoder = false;

function setup() {
  // let params = getURLParams();
  // user = params.user;
  setupCanvas();
  toggleCursor();
  setupSceneManager();
  if (isArduino === false) {
    setInterval(() => {
      updateTrackpadSamples()
    }, 100);
    setInterval(() => {
      updateTrackpadEncoder() // TODO: should the serial communication baud be a multiple of this interval?
    }, 25);
  }
  // console.log("I am: user " + user);
}

/**
 * Standard p5 draw() function
 * 
 * Superseded by drawScene() when using p5.SceneManager
 */
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
  if (!state) {
    return;
  }
  updateState();
  updateIsMyTurn();
  background(0);
  displayEncoder();
  if (isArduino == false) {
    updateOutput();
  }
  displayProgress();
  displayTypingIndicator();
  updateIsDoneReading();
  updateScene();
}

function onEnterScene() {
  console.log(sceneManager.scene.fnScene.name);
  getSceneNum();
  setupScreen(scene, tone);
  resetProgress();
  resetCounter();
  chatMessages = selectAll('.message');
  for (i = 0; i < chatMessages.length; i++) {
    chatMessages[i].hide();
  }
  characters = selectAll('span');
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

function updateInput() {
  encoder = input.encoder; // TODO: is there a smarter way to do this ...
  previousEncoder = input.previousEncoder; // ... and this ...
  isUserA_touchingPlate = input.isUserA_touchingPlate; // ... and this, etc.?
  isUserB_touchingPlate = input.isUserB_touchingPlate;
  // isAandB_touchingPlates = input.isAandB_touchingPlates;
  isSpinning = input.isSpinning;
  isSpinningFwd = input.isSpinningFwd;
  isSpinningBkwd = input.isSpinningBkwd;
}

function updateState() {
  playerMode = state.playerMode;
  whoseTurn = state.whoseTurn;
  // scene = state.scene;
  // tone = state.tone;
  if (playerMode == 0) {        // 1 User no touch
    isTableReady = isSpinning;
  } else if (playerMode == 1) { // 1 User w/ touch
    isTableReady = isSpinning && isUserA_touchingPlate;
  } else if (playerMode == 2) { // 2 Users w/ touch
    isTableReady = isSpinning && isUserA_touchingPlate && isUserB_touchingPlate;
  }
  isGoTime = isTableReady;
}

function updateIsMyTurn() {
  if (whoseTurn == whoAmI) {
    isMyTurn = true;
  } else {
    isMyTurn = false;
  }
}

function updateIsDoneReading() {
  if (alphaValue < 0 && (charIndex == characters.length - 1) && isMyTurn && isDoneReading === false) {
    isDoneReading = true;
    socket.emit("isDoneReading", isDoneReading); // tell the server I've reached the end of the screen
    isDoneReading = false;
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

function updateOutput() {
  updateCounter();
  if (isSpinning) {
    updateCharIndex(); // TODO: why does this throw an error if not inside the conditional?
  }
  updateProgress();
  updateAlpha();
}
