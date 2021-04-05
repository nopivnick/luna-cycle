console.log("display.js FOUND");

let red;
let green;
let blue;

let isProgressing = false;
let isRegressing = false;

let isFading = false;
let isFadingIn = false;
let isFadingOut = false;

let isAlphaUsed = true;
let alphaValue = 1;
let alphaFade = 0.005;

let isCursorDisplayed = false;
let isEncoderDisplayed = false;
let isScreenMirrored = false;

function updateScene() {
  if (alphaValue < 0 && isSpinningFwd) {
    // if (lunaData.scenes[scene].chatIsNext) {
    //   // TODO: save the value of the current scene here in previousScene
    //   previousScene = scene;
    //   sceneManager.showScene(sceneChat);
    // } else {
      sceneManager.showNextScene(); // TODO: sceneManager.showScene((previousScene + 1) % 12) or similar
    // }
  }
}

function displayProgress() {
  characters = selectAll('span');
  if (isProgressing) {
    if (alphaValue < 1) {
      increaseAlpha();
    }
    for (i = 0; i <= charIndex; i++) {
      characters[i].style(`color: rgba(${red}, ${green}, ${blue}, ${alphaValue})`);
    }
  } else if (isFading) {
    for (i = 0; i <= charIndex; i++) {
      characters[i].style(`color: rgba(${red}, ${green}, ${blue}, ${alphaValue})`);
    }
  }
}

function updateProgress() {
  isProgressing = isSpinningFwd && charIndex < characters.length && !isFading;
  isRegressing = isSpinningBkwd && charIndex < characters.length && !isFading;
  isFadingOut = (isSpinningBkwd && counter < charIndex) || (isSpinningFwd && (counter - charIndexDelay) > characters.length);
  isFadingIn = isSpinningFwd && counter < charIndex;
  isFading = isFadingIn || isFadingOut;
}

function resetProgress() {
  alphaValue = 0; // 0 = characters on a new screen fade in incrementally, 1 = they turn opaque
  charIndex = 0;
}

function updateAlpha() {
  if (isAlphaUsed === false) {
    alphaValue = 1;
  } else if (isFadingOut) {
    decreaseAlpha()
  } else if (isFadingIn) {
    counter = charIndex;
    increaseAlpha();
  }
}

function decreaseAlpha() {
  alphaValue -= alphaFade;
}

function increaseAlpha() {
  alphaValue += alphaFade;
}

function setColor(i) {
  // if (sceneManager.scene.fnScene.name === "sceneChat") {
    if (lunaData.scenes[scene].paragraphs[i].cssClass !== null) {
    red = 0;
    green = 0;
    blue = 0;
  } else {
    red = 50;
    green = 205;
    blue = 50;
  }
}

function setCSS(paragraph, i) {

  // if (sceneManager.scene.fnScene.name === "sceneChat") { // if this is the text exchange scene ...
  //   container.addClass("messages");
  //   paragraph.addClass(lunaChat.scenes[0].paragraphs[i].cssClass); // ... apply the specified CSS class.
  // }

  if (lunaData.scenes[scene].paragraphs[i].cssClass !== null) { // if the paragraph has special CSS styling ...
    container.addClass("messages");
    paragraph.addClass(lunaData.scenes[scene].paragraphs[i].cssClass); // ... apply the specified CSS class.
  }

}

function setAlpha(span) {
  if (isAlphaUsed === true) {
    // TODO: possible to handle alpha with a class in css?
    span.style(`color: rgba(${red}, ${green}, ${blue}, 0)`);
  } else {
    span.style(`color: rgba(${red}, ${green}, ${blue}, 1)`);
  }
}

function displayEncoder() {
  if (isEncoderDisplayed === true) {
    fill(255, 0, 0);
    text(("Encoder: " + encoder + "    " + "Counter: " + counter + "    " + "CharIndex: " + charIndex + "    " + "AlphaValue: " + alphaValue), windowWidth / 2, windowHeight / 2);
    // let counter = createP("Encoder: " + encoder); // TODO: do this in the DOM instead but canvas is -1 on the Z plane
    // counter.style('position: fixed');
    // counter.style('top: 50%');
    // counter.style('left: 50%');
    // counter.style('transform: translate(-50%, -50%)');
    // counter.style('color: red');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log("window size: " + windowWidth + " x " + windowHeight);
}

console.log("display.js lOADED");