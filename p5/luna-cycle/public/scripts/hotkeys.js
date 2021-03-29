console.log("hotkeys.js FOUND");

function hotKeyPressed() {
  print("We're in the hotKeyPressed() function!");
  if (key === 'a') {
    toggleAlpha();
  } else if (key === 'c') {
    toggleCursor();
  } else if (key === 'e') {
    isCounterDisplayed = !isCounterDisplayed;
  } else if (key === 'm') {
    toggleMirror();
  } else if (key === 't') {
    toggleTrackpad();
  } else if ((keyIsDown(SHIFT)) && ((keyCode === RIGHT_ARROW))) {
    sceneManager.showNextScene();
  } else if ((keyIsDown(SHIFT)) && ((keyCode === LEFT_ARROW))) {
    sceneManager.showPreviousScene();
  }
  print(key + " pressed!");
}

function toggleAlpha() {
  if (isAlphaOn === false) {
    screen = select('body');
    screen.style(`color: rgba(${red}, ${green}, ${blue}, 1)`);
    isAlphaOn = !isAlphaOn;
  } else {
    screen = select('body');
    screen.style(`color: rgba(${red}, ${green}, ${blue}, 0)`);
    isAlphaOn = !isAlphaOn;
  }
}

function toggleCursor() {
  if (isCursorDisplayed === false) {
    screen = select('body');
    screen.style('cursor: none')
    isCursorDisplayed = !isCursorDisplayed;
  } else {
    screen = select('body');
    screen.style('cursor: auto')
    isCursorDisplayed = !isCursorDisplayed;
  }
}

function toggleMirror() {
  // screen = select('body'); // TODO: cleaner to either mirror a div wrapped around the multiple <p>'s or selectAll <p>'s?
  screen = select('#mirror');
  if (isScreenMirrored === true) {
    screen.style('transform: none');
    isScreenMirrored = !isScreenMirrored;
  } else {
    screen.style('transform: rotateY(180deg)');
    isScreenMirrored = !isScreenMirrored;
  }
}

function toggleTrackpad() {
  if (isTrackpadEncoder === true) {
    // TODO: trackpad acts as encoder
    isTrackpadEncoder = !isTrackpadEncoder;
  } else {
    isTrackpadEncoder = !isTrackpadEncoder;
  }
}

console.log("hotkeys.js LOADED");
