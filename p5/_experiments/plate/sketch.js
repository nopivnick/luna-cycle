let ticks = 0; // ticks come from the rotary encoder via Arduino over serial
let pot = 0; // values come from the potentiometer via Arduino over serial, the actual value is read off the Steenbeck speed switch, in this example the assumption is it's a value between 0 and 1023
let stateCurrentIndex = 0;
let stateIndexCount = 5; // number of screens aka 'states'
let stateCharLength = 0; // number of characters in a given stateIndex as calculated by string()
let stateDelay = 0; // a length of time or other calculation representing how long the state remains before changing)


function setup() {
  noCanvas();
}

function draw() {
  pot = 0; // serial read the Arduino value
  ticks += (pot - 512) / 512; // this math gives us a value between 0 and 1

  if (ticks >= (stateCharLength + stateDelay)) {
    nextState(); // function to move to the next screen aka 'state'
    ticks = 0; // TODO: if I reset ticks on the p5 side, what do I do with ticks on the Arduino side?
  } else if (ticks <= (stateCharLength + stateDelay)) {
    priorState(); // function to move to the proceeding screen aka 'state
    ticks = 0;
  }
}

// functions to control which state to change to

function nextState() {
  // clear text on screen
  ((stateIndexCount + stateCurrentIndex) + 0.5) % stateIndexCount
}

function priorState() {
  // clear text on screen
  ((stateIndexCount + stateCurrentIndex) - 0.5) % stateIndexCount
}