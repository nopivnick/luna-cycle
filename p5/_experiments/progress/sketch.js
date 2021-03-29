let scene = 0;
let scenes = [];
let screens = [];

let charIndex;
// let previousCharIndex;
// let highestCharIndex;

let encoder;
let previousEncoder;

let isSpinning = false;
let isSpinningFwd = false;
let isSpinningBkwd = false;

let isFading = false;
let isFadingIn = false;
let isFadingOut = false;
let isProceeding = false;

let isAlphaOn = true;
let alphaValue = 1;
let alphaFade = 0.005;

let isCounterDisplayed = true;

function preload() {
  scene0 = loadStrings('assets/text/scene0.txt');
  scene1 = loadStrings('assets/text/scene1.txt');
  scene2 = loadStrings('assets/text/scene2.txt');
}

function setup() {
  setupCanvas();
  setupScenes();
  setupScreen(scene);
}

function setupCanvas() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
}

function setupScenes() {
  scenes.push(scene0);
  scenes.push(scene1);
  scenes.push(scene2);
}

function draw() {
  background(0);
  updateEncoder(); // TODO: should this be tied to time (or serialIn?) rather than framerate?
  displayScreen();
  displayCounter();
}
