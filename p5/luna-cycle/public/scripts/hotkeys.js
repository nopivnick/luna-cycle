console.log("hotkeys.js FOUND");

let screen;

function hotKeyPressed() {
  print("We're in the hotKeyPressed() function!");
  if (key === 'a') {
    toggleAlpha();
  } else if (key === 'c') {
    toggleCursor();
  } else if (key === 'e') {
    isEncoderDisplayed = !isEncoderDisplayed;
  } else if (key === 'm') {
    toggleMirror();
  } else if (key === 't') {
    toggleTrackpad();
  } else if ((keyIsDown(SHIFT)) && ((keyCode === RIGHT_ARROW))) {
    // TODO: add logic to accommodate whether the next scene is the text exchange
    sceneManager.showNextScene();
  } else if ((keyIsDown(SHIFT)) && ((keyCode === LEFT_ARROW))) {
    sceneManager.showPreviousScene();
  }
  print(key + " pressed!");
}

function toggleAlpha() {
  if (isAlphaUsed === false) {
    screen = select('body');
    screen.style(`color: rgba(${red}, ${green}, ${blue}, 1)`);
    isAlphaUsed = !isAlphaUsed;
  } else {
    screen = select('body');
    screen.style(`color: rgba(${red}, ${green}, ${blue}, 0)`);
    isAlphaUsed = !isAlphaUsed;
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
