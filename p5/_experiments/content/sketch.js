const bliss = 'bliss';
const blah = 'blah';
const bad = 'bad';

const tones = ['bliss', 'blah', 'bad'];

const sceneCount = 11;

function setup() {
  setupCanvas();
  createDiv(setupScreen0HTML(bliss));
  createDiv(setupScreen0HTML(blah));
  createDiv(setupScreen0HTML(bad));
  console.log(setupScreen0(bliss));
  console.log(setupScreen0(blah));
  console.log(setupScreen0(bad));
}

function draw() {
  background(0);
}

function setupCanvas() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
}