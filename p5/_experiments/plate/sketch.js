let counter = 0; // ticks come from the rotary encoder via Arduino over serial
let sceneIndex = 0;
let sceneCount = 5; // number of screens aka 'scenes'
let sceneCharLength = 0; // number of characters in a given stateIndex as calculated by string()
let sceneDelay = 0; // a length of time or other calculation representing how long the state remains before changing)


function setup() {
  noCanvas();
}

function draw() {
  counter += (pot - 512) / 512; // this math gives us a value between 0 and 1

  if (counter >= (sceneCharLength + sceneDelay)) {
    showNextScene(); // function to move to the next screen aka 'state'
    counter = 0; // TODO: if I reset ticks on the p5 side, what do I do with ticks on the Arduino side?
  } else if (counter <= (sceneCharLength + sceneDelay)) {
    showPreviousScene(); // function to move to the proceeding screen aka 'state
    counter = 0;
  }
}

// functions to control which state to change to

function showNextScene() {
  // clear screen
  ((sceneCount + sceneIndex) + 0.5) % sceneCount
}

function showPreviousScene() {
  // clear screen
  ((sceneCount + sceneIndex) - 0.5) % sceneCount
}