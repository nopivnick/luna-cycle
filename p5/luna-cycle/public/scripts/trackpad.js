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

// Uncomment below for p5-friendly code
// function setup() {
//   setInterval("updateSamples()", 100);
// }

// Uncomment below for vanilla javascript-friendly code
// function handleMouseEvent(event) {
//   mouseX = event.clientX;
//   mouseY = event.clientY;
// }

// let smoothedTrackpadDist = 0;

function updateSamples() {
  trackpadSamples.shift();
  trackpadSamples.push([mouseX, mouseY]);
  // Uncomment below for p5-friendly code
  // trackpadSamples.push(createVector(mouseX, mouseY));
  calcTrackpadCrossProd();
  calcTrackpadDist();
}

function calcTrackpadCrossProd() {
  // Calculate B-A vector
  let x1 = trackpadSamples[1][0] - trackpadSamples[0][0];
  let y1 = trackpadSamples[1][1] - trackpadSamples[0][1];
  // Calculate C-B vector
  let x2 = trackpadSamples[2][0] - trackpadSamples[1][0];
  let y2 = trackpadSamples[2][1] - trackpadSamples[1][1];
  // Calculate the cross product of the two vectors (B-A) x (C-B)
  cross = (x1 * y2) - (y1 * x2);
  // console.log("Trackpad Cross Product: " + cross);
}

function calcTrackpadAngle() {
  // Calculate B-A vector
  let x1 = trackpadSamples[1][0] - trackpadSamples[0][0];
  let y1 = trackpadSamples[1][1] - trackpadSamples[0][1];
  // Calculate C-B vector
  let x2 = trackpadSamples[2][0] - trackpadSamples[1][0];
  let y2 = trackpadSamples[2][1] - trackpadSamples[1][1];
  // Calculate the angle between the two vectors (B-A) x (C-B)
  trackpadAngle = atan2(y2, x2) - atan2(y1, x1);
  // console.log("Trackpad Angle: ", trackpadAngle);
}

function calcTrackpadDist() {
  let x0 = trackpadSamples[0][0]; // x position of the 1st sample
  let y0 = trackpadSamples[0][1]; // y position of the 1st sample

  let x2 = trackpadSamples[1][0]; // x position of the 3rd sample
  let y2 = trackpadSamples[2][1]; // y position of the 3rd sample
  // Calculate the distance between the 1st sample and the 3rd sample
  let trackpadDist = dist(x0, y0, x2, y2);
  // console.log("Distance: " + trackpadDist);
  // smoothedTrackpadDist = lerp(smoothedTrackpadSpeed, trackpadDist, 0.1);
}

function updateSpinState() {
  // if (cross > 0) {
  //   isSpinning = true;
  //   isSpinningFwd = true;
  //   isSpinningBkwd = false;
  //   encoder++;
  // } else if (cross < 0) {
  //   isSpinning = true;
  //   isSpinningFwd = false;
  //   isSpinningBkwd = true;
  //   encoder--;
  // } else {
  //   isSpinning = false;
  //   isSpinningFwd = false;
  //   isSpinningBkwd = false;
  // }
}

function displaySpinState() {
  if (isSpinningFwd === true) {
    // textAlign(CENTER);
    // fill(255, 0, 0);
    // text("Forward", windowWidth / 2, 10);
    // document.body.innerHTML = "Forward";
    console.log("isSpinningFwd is " + isSpinningFwd);
  } else if (isSpinningBkwd === true) {
    //   // textAlign(CENTER);
    //   // fill(255, 0, 0);
    //   // text("Backward", windowWidth / 2, 10);
    //   // document.body.innerHTML = "Backward";
    console.log("isSpinningBkwd is " + isSpinningBkwd);
  } else {
    //   // document.body.innerHTML = "Stopped";
    console.log("isSpinning is " + isSpinning);
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
