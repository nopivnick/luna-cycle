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

let chatMessages = [];

function updateScene() {
  if (alphaValue < 0 && isSpinningFwd) {
    sceneManager.showNextScene(); // TODO: sceneManager.showScene((previousScene + 1) % 12) or similar
  }
}

function displayProgress() {
  if (isProgressing) {
    if (alphaValue < 1) {
      increaseAlpha();
    }
    for (i = 0; i <= charIndex; i++) {
      characters[i].style(`color: rgba(${red}, ${green}, ${blue}, ${alphaValue})`);
    }
  } else if (isFading) {
    if (lunaData.scenes[scene].isChat === true) {
      for (i = 0; i < chatMessages.length; i++) {
        chatMessages[i].style(`opacity: ${alphaValue}`);
      }
    } else {
      for (i = 0; i <= charIndex; i++) {
        characters[i].style(`color: rgba(${red}, ${green}, ${blue}, ${alphaValue})`);
      }
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

function displayTypingIndicator() {
  for (i = 0; i < chatMessages.length; i++) { // For every message in the chat transcript ...
    if (chatMessages[i].elt.className === "message message-recd" && charIndex >= typingIndicatorCuesByScene[scene][i][0] && charIndex <= typingIndicatorCuesByScene[scene][i][1]) {
      typingIndicator.show();
      break;
    } else {
      typingIndicator.hide();
    }
    if (counter > sendMessageCuesByScene[scene][i]) { // TODO: is it counter or charIndex?
      chatMessages[i].show();
    }
  }

  /**
   * TODO: Sukanya's suggested approach to handling chat message cues
   * - https://github.com/nopivnick/luna-cycle/issues/21#issuecomment-818135546
   */
  // for (i = 0; i < chatMessages.length; i++) { // For every message in the chat transcript ...
  //   
  // }

}

function resetProgress() {
  alphaValue = 1; // 0 = characters on a new screen fade in incrementally, 1 = they turn opaque right away
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

function setTextColor(i) { // TODO: this should be getTextColor() and it should return the color instead of setting it
  // if (sceneManager.scene.fnScene.name === "sceneChat") {
  if (lunaData.scenes[scene].isChat === true) {
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
  if (lunaData.scenes[scene].isChat === true) { // if the current scene is a chat exchange ...
    container.addClass("messages");
    paragraph.addClass(lunaData.scenes[scene].paragraphs[i].cssClass); // ... apply the specified CSS class to the paragraph.
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