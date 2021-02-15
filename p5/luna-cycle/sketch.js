let screen;

let scene = 0;
let sceneManager;
let sceneIndex;
let sceneCount;

let loopCounter = 0;

// const bliss = 'bliss';
// const blah = 'blah';
// const bad = 'bad';

let tone = 'bliss';

let isMirrored = false;

function setup() {
  setupCanvas();
  setupSceneManager();
  screen = select('body');
  setInterval("updateSamples()", 100);
}

function draw() {

}

function setupCanvas() {
  let canvas = createCanvas(windowWidth, windowHeight);
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
  // TODO: preload scenes with a for loop
  // for (let i = 0; i < sceneCount; i++) {
  //   sceneManager.addScene("scene" + i);
  //   print("scene" + i + " preloaded!");
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
  updateSpinState();
  // displaySpinState();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log("window size: " + windowWidth + " x " + windowHeight);
}

function mirrorScreen() {
  if (isMirrored === true) {
    screen.style('transform: none');
    isMirrored = !isMirrored;
  } else {
    screen.style('transform: rotateY(180deg)');
    isMirrored = !isMirrored;
  }
  console.log("is text mirrored? " + isMirrored);
}

function getSceneNum() {
  scene = sceneManager.scene.fnScene.name;
  scene = scene.slice(5);
}

function onEnterScene() {
  console.log(sceneManager.scene.fnScene.name);
  getSceneNum();
  setupScreen(scene, tone); // TODO: createDiv(setupScreen(scene, tone)) ?
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