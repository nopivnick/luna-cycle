let screen;
let isMirrored = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Uncomment to test with p5 DOM element
  // let paragraph = createP("Mirror");
  // paragraph.style('text-align: center');
  screen = select('body');
}

function draw() {
  // Uncomment to test with p5 text() function
  textAlign(CENTER, CENTER);
  text("Mirror", windowWidth / 2, windowHeight / 2);
}

function keyPressed() {
  if (key === 'm') {
    mirrorScreen();
  }
}

function mirrorScreen() {
  if (isMirrored == true) {
    screen.style('transform: none');
    isMirrored = !isMirrored;
  } else {
    screen.style('transform: rotateY(180deg)');
    isMirrored = !isMirrored;
  }
  print("is text mirrored? " + isMirrored);
}