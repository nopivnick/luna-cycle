let pot; // values come from the potentiometer via Arduino over serial, the actual value is read off the Steenbeck speed switch, in this example the assumption is it's a value between 0 and 1023

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
