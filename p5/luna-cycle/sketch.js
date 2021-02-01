let screen;
let sceneManager;
let sceneIndex;
let sceneCount;

let loop = 0;

// const bliss = 'bliss';
// const blah = 'blah';
// const bad = 'bad';

let tone = 'bliss';

let isMirrored = false;

function setup() {
  setupCanvas();
  screen = select('body');
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
  // TODO: preload scenes with a for loop
  // for (let i = 0; i < sceneCount; i++) {
  //   sceneManager.addScene("scene" + i);
  //   print("scene" + i + " preloaded!");
  // }
  sceneManager.showScene(scene0);

  setInterval("updateSamples()", 100);
}

function draw() {

}

function setupCanvas() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
}

function drawScene() {
  // Draw something in the canvas of *every* scene
  textAlign(CENTER);
  fill(255, 0, 0);
  text("-> Every scene will get this block of code. <-", windowWidth / 2, windowHeight / 2);
  updateSpinState();
  // displaySpinState();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  print("window size: " + windowWidth + " x " + windowHeight);
}

function mirrorScreen() {
  if (isMirrored === true) {
    screen.style('transform: none');
    isMirrored = !isMirrored;
  } else {
    screen.style('transform: rotateY(180deg)');
    isMirrored = !isMirrored;
  }
  print("is text mirrored? " + isMirrored);
}

function onEnterScene() {
  // clear();
  // background(175);
  // paragraph = createP("This is " + sceneManager.scene.fnScene.name + ".");
}

function onExitScene() {
  removeElements();
}

function updateTone() {
  if (loop % 4 === 3) {
    /* Bad */
    tone = 'bad';
  } else if (loop % 2 === 0) {
    /* Blah */
    tone = 'blah';
  } else if (loop % 4 === 1) {
    /* Bliss */
    tone = 'bliss';
  }
}