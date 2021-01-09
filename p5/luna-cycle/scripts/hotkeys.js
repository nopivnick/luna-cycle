function playtestKeyPressed() {
  print("We're in the playtestKeyPressed() function!");
  if (key === 'm') {
    mirrorScreen();
  } else if (keyCode === RIGHT_ARROW) {
    sceneManager.showNextScene();
  } else if (keyCode === LEFT_ARROW) {
    sceneManager.showPreviousScene();
  }
  print(key + " pressed!");
}