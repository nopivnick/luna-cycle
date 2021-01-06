let sceneManager;
let sceneIndex = null;
let sceneCount = null;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
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
  // TODO: preload scenes with a for loop
  // for (let i = 0; i < sceneCount; i++) {
  //   sceneManager.addScene("scene" + i);
  //   print("scene" + i + " preloaded!");
  // }

  sceneManager.showScene(scene0);
}

function playtestKeyPressed() {
  print("We're in the playtestKeyPressed() function!");
  if (keyCode === RIGHT_ARROW) {
    sceneManager.showNextScene();
  } else if (keyCode === LEFT_ARROW) {
    sceneManager.showPreviousScene();
  }
  print(key + " pressed!");
}

function onEnterScene() {
  clear();
  // background(175);
  paragraph = createP("This is " + sceneManager.scene.fnScene.name + ".");
}

function onExitScene() {
  removeElements();
}