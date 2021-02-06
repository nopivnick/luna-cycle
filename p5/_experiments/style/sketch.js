function setup() {
  setupCanvas();
  setupScreen();
}

function setupCanvas() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
}

function setupScreen() {
  let paragraph0 = createP("We speak in text.");
  let paragraph1 = createP("And yet, you can't help but feel these words come effortlessly as you type them on the screen.");
  let paragraph2 = createP("Are you awake?");
  paragraph2.addClass("messages message message-recd");
  let paragraph3 = createP("Yes");
  paragraph3.addClass("messages message message-sent");
}

function draw() {
  background(0);
}
