let screen;
let isMirrored = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  screen = select('body');
}

function draw() {
  textAlign(CENTER);
  text("Mirror", windowWidth / 2, windowHeight / 2)
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