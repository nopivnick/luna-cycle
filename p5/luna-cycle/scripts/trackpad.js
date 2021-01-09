/**
 * Attribution:
 * - https://www.reddit.com/r/gamedev/comments/413733/how_to_detect_rotation_s_direction_clockwise_or/
 * - https://github.com/X123M3-256/X123M3-256.github.io/blob/master/rotationtest.html
 */

console.log("trackpad.js FOUND");

// Uncomment below for vanilla javascript-friendly code
// let mouseX = 0;
// let mouseY = 0;

let trackpadSamples = [
  [0, 0],
  [0, 0],
  [0, 0]
];

let cross = 0;

let counter = 0;

// Uncomment below for p5-friendly code
// function setup() {
//   setInterval("updateSamples()", 100);
// }

// Uncomment below for vanilla javascript-friendly code
// function handleMouseEvent(event) {
//   mouseX = event.clientX;
//   mouseY = event.clientY;
// }

function updateSamples() {
  trackpadSamples.shift();
  trackpadSamples.push([mouseX, mouseY]);
  calculateCrossProduct();
}

function calculateCrossProduct() {
  // Calculate B-A vector
  let x1 = trackpadSamples[1][0] - trackpadSamples[0][0];
  let y1 = trackpadSamples[1][1] - trackpadSamples[0][1];
  // Calculate C-B vector
  let x2 = trackpadSamples[2][0] - trackpadSamples[1][0];
  let y2 = trackpadSamples[2][1] - trackpadSamples[1][1];
  // Calculate the cross product of the two vectors (B-A) x (C-B)
  cross = (x1 * y2) - (y1 * x2);
  displayPlateRotation();
}

function displayPlateRotation() {
  if (cross > 0) {
    isSpinningFwd = true;
    document.body.innerHTML = "Forward";
    // Uncomment below for vanilla javascript-friendly code
    console.log("isSpinningFwd is " + isSpinningFwd);
    // Uncomment below for p5-friendly code
    // print("isSpinningFwd is " + isSpinningFwd);
  } else if (cross < 0) {
    isSpinningBkwd = true;
    document.body.innerHTML = "Backward";
    // Uncomment below for vanilla javascript-friendly code
    console.log("isSpinningBkwd is " + isSpinningBkwd);
    // Uncomment below for p5-friendly code
    // print("isSpinningBkwd is " + isSpinningBkwd);
  } else {
    isSpinning = false;
    document.body.innerHTML = "Stopped";
    // Uncomment below for vanilla javascript-friendly code
    console.log("isSpinning is " + isSpinning);
    // Uncomment below for p5-friendly code
    // print("isSpinning is " + isSpinning);
  }
}

// Uncomment below for p5-friendly code
// function mouseMoved() {
//   print("Mouse is moving!");
//   setInterval("updateSamples()", 100);
//   // prevent default
//   return false;
// }

// Uncomment below for vanilla javascript-friendly code
// function initTrackpad() {
  // document.addEventListener("mousemove", handleMouseEvent);
  // setInterval("updateSamples()", 100);
// }

console.log("trackpad.js LOADED.");