let scene = 0;
let tone = 'bliss';

function setup() {
  setupCanvas();
  setupScreen(scene, tone);
}

function draw() {
  background(0);
}

function setupCanvas() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
}
