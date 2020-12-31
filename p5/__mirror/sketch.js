let screen;
let isMirrored = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  screen = select('body');
}

function mirrorScreen() {
  screen.style('transform: rotateY(180deg)');
}

function draw() {
  textAlign(CENTER);
  text("Mirror", windowWidth / 2, windowHeight / 2)
}

function keyPressed() {
  if (keyCode === 77) {
    if (isMirrored == true) {
      screen.style('transform: none');
      isMirrored = !isMirrored;
    } else {
      mirrorScreen();
      isMirrored = !isMirrored;
    }
    print("is text mirrored? " + isMirrored);
  }
}