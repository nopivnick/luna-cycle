let canvas;

let sceneManager;
let sceneNumber = null;
let sceneCount = 5;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  print("window size: " + windowWidth + " x " + windowHeight);
}

function keyPressed() {
  print("We're in the keyPressed() function!");
  playtestKeyPressed();
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

function scene0() {

  /**
   * p5.SceneManager setup function
   * 
   * Runs *once* the first time the scene is run and never again
   */
  this.setup = function () {

  }

  /**
   * p5.SceneManager enter function
   *
   * Runs each time the scene manager returns to this scene
   */
  this.enter = function () {
    onEnterScene();
  }

  /**
   * p5.SceneManager draw function
   *
   * Runs once per frame
   */
  this.draw = function () {

  }

  /**
   * p5.SceneManager exit function
   * 
   * Runs each time the scene manager leaves this scene
   */
  this.exit = function () {
    onExitScene();
  }

  // this.keyPressed = function () {
  //   // print("A key was pressed in scene" + (sceneManager.findSceneIndex() + 1) + "!");
  //   playtestKeyPressed();
  // }
}

function scene1() {

  let paragraph;

  /**
   * p5.SceneManager setup function
   * 
   * Runs *once* the first time the scene is run and never again
   */
  this.setup = function () {

  }

  /**
   * p5.SceneManager enter function
   *
   * Runs each time the scene manager returns to this scene
   */
  this.enter = function () {
    onEnterScene();
  }

  /**
   * p5.SceneManager draw function
   *
   * Runs once per frame
   */
  this.draw = function () {

  }

  /**
   * p5.SceneManager exit function
   * 
   * Runs each time the scene manager leaves this scene
   */
  this.exit = function () {
    onExitScene();
  }

  // this.keyPressed = function () {
  //   playtestKeyPressed();
  // }
}

function scene2() {
  /**
   * p5.SceneManager setup function
   * 
   * Runs *once* the first time the scene is run and never again
   */
  this.setup = function () {

  }

  /**
   * p5.SceneManager enter function
   *
   * Runs each time the scene manager returns to this scene
   */
  this.enter = function () {
    onEnterScene();
  }

  /**
   * p5.SceneManager draw function
   *
   * Runs once per frame
   */
  this.draw = function () {

  }

  /**
   * p5.SceneManager exit function
   * 
   * Runs each time the scene manager leaves this scene
   */
  this.exit = function () {
    onExitScene();
  }

  // this.keyPressed = function () {
  //   playtestKeyPressed();
  // }
}

function scene3() {
  /**
   * p5.SceneManager setup function
   * 
   * Runs *once* the first time the scene is run and never again
   */
  this.setup = function () {

  }

  /**
   * p5.SceneManager enter function
   *
   * Runs each time the scene manager returns to this scene
   */
  this.enter = function () {
    onEnterScene();
  }

  /**
   * p5.SceneManager draw function
   *
   * Runs once per frame
   */
  this.draw = function () {

  }

  /**
   * p5.SceneManager exit function
   * 
   * Runs each time the scene manager leaves this scene
   */
  this.exit = function () {
    onExitScene();
  }

  // this.keyPressed = function () {
  //   playtestKeyPressed();
  // }
}

function scene4() {
  /**
   * p5.SceneManager setup function
   * 
   * Runs *once* the first time the scene is run and never again
   */
  this.setup = function () {

  }

  /**
   * p5.SceneManager enter function
   *
   * Runs each time the scene manager returns to this scene
   */
  this.enter = function () {
    onEnterScene();
  }

  /**
   * p5.SceneManager draw function
   *
   * Runs once per frame
   */
  this.draw = function () {

  }

  /**
   * p5.SceneManager exit function
   * 
   * Runs each time the scene manager leaves this scene
   */
  this.exit = function () {
    onExitScene();
  }

  // this.keyPressed = function () {
  //   playtestKeyPressed();
  // }
}