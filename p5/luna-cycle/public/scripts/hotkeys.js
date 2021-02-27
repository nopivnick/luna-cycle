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