function setupScreen(scene) {
  removeElements();
  for (i = 0; i < scenes[scene].length; i++) {
    let paragraph = createP();
    for (j = 0; j < scenes[scene][i].length; j++) {
      let character = scenes[scene][i].charAt(j);
      let span = createSpan(character);
      span.style('position: relative');
      if (isAlphaOn === true) {
        span.style('color: rgba(50, 205, 50, 0)'); // TODO: better to handle alpha with a class in css? 
      } else {
        span.style('color: rgba(50, 205, 50, 1)');
      }
      // make each <span>char</span> a child of it's respective paragraph
      paragraph.child(span);
    }
  }
  resetCursor();
}

function resetCursor() {
  alphaValue = 1; // otherwise characters on a new screen fade in incrementally rather than turn opaque
  charIndex = -1;
  encoder = -1;
  previousEncoder = 0;
}
