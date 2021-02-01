function playtestKeyPressed() {
  print("We're in the playtestKeyPressed() function!");
  if (key === 'm') {
    mirrorScreen();
  } else if ((keyIsDown(SHIFT)) && ((keyCode === RIGHT_ARROW))) {
    sceneManager.showNextScene();
  } else if ((keyIsDown(SHIFT)) && ((keyCode === LEFT_ARROW))) {
    sceneManager.showPreviousScene();
  }
  print(key + " pressed!");
}