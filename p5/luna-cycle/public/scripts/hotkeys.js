function playtestKeyPressed() {
  print("We're in the playtestKeyPressed() function!");
  if (key === 'a') {
    toggleAlpha();
  } else if (key === 'c') {
    toggleCursor();
  } else if (key === 'e') {
    isEncoderDisplayed = !isEncoderDisplayed;
  } else if (key === 'm') {
    toggleMirror();
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
  screen = select('body'); // TODO: cleaner to either mirror a div wrapped around the multiple <p>'s or selectAll <p>'s?
  // screen = select('div');
  if (isScreenMirrored === true) {
    screen.style('transform: none');
    // canvas.style('transform: none');
    isScreenMirrored = !isScreenMirrored;
  } else {
    screen.style('transform: rotateY(180deg)');
    // canvas.style('transform: rotateY(180deg)');
    isScreenMirrored = !isScreenMirrored;
  }
//   paragraphs = selectAll('p');
//   if (isScreenMirrored === true) {
//     for (i = 0; i < paragraphs.length; i++) {
//       this.style('transform: none');
//     }
//     isScreenMirrored = !isScreenMirrored;
//   } else {
//     for (i = 0; i < paragraphs.length; i++) {
//       this.style('transform: rotateY(180deg)');
//     }
//     isScreenMirrored = !isScreenMirrored;
//   }
}
