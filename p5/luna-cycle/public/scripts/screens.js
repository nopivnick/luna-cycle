console.log("scenes.js FOUND");

let container;

let base;

let typingIndicator;

let sendMessageCuesByScene = {};
let typingIndicatorCuesByScene = {};

// let chatMessageCuesByScene = {};

function setupScreen(scene, tone) {
  setupContainer();
  base = getBase(scene, tone);
  if (lunaData.scenes[scene].isChat === true) {
    setupTypingIndicator();
  }
  // setCSS(setupParagraphs(base, i), i); // TODO: fix error when moving this here
}

function setupContainer() {
  container = createDiv();
  container.id('container');
  container.parent('mirror');
}

function getBase(scene, tone) {
  for (i = 0; i < lunaData.scenes[scene].paragraphs.length; i++) { // for every paragraph of the current scene ...
    if (lunaData.scenes[scene].paragraphs[i].snippets === null) { // if there are no tone variants ...
      base = lunaData.scenes[scene].paragraphs[i].base; // get the base sentence ...
    } else { // otherwise ...
      base = lunaData.scenes[scene].paragraphs[i].base; // get the base sentence and ...
      for (j = 0; j < lunaData.scenes[scene].paragraphs[i].snippets.length; j++) { // for every snippet in the current paragraph ...
        base = base.replace('{' + j + '}', lunaData.scenes[scene].paragraphs[i].snippets[j][tone]); // substitute the current tone
      }
    }
    console.log(base);
    if (lunaData.scenes[scene].isChat === true) { // if the current scene is a chat exchange ...
      let sendMessageCues = [];
      let sendMessageCue = 0;
      let prevSendMessageCue = 0;
      let typingIndicatorCues = [];
      let typingIndicatorCueIn = 0;
      let prevTypingIndicatorCueIn = 0;
      let typingIndicatorCueOut = 0;
      let prevTypingIndicatorCueOut = 0;
      for (m = 0; m < lunaData.scenes[scene].paragraphs.length; m++) { // for every message in the chat transcript ...
        sendMessageCue = (lunaData.scenes[scene].paragraphs[m].base.length + prevSendMessageCue); // add the length of each message to the previous and ...
        sendMessageCues.push(sendMessageCue); // add the cue to the array and ...
        prevSendMessageCue = sendMessageCue; // store the latest cue for the next loop and ...
        typingIndicatorCueIn = sendMessageCue - lunaData.scenes[scene].paragraphs[m].base.length;
        prevTypingIndicatorCueIn = typingIndicatorCueIn;
        typingIndicatorCueOut = sendMessageCue;
        prevTypingIndicatorCueOut = typingIndicatorCueOut;
        let CuesInOut = [typingIndicatorCueIn, typingIndicatorCueOut];
        typingIndicatorCues.push(CuesInOut);
      }
      sendMessageCuesByScene[scene] = sendMessageCues; // ... add the array to the message-cues-by-scene object.
      typingIndicatorCuesByScene[scene] = typingIndicatorCues;
    }

    /**
     * TODO: Sukanya's suggested approach to handling chat message cues
     * - https://github.com/nopivnick/luna-cycle/issues/21#issuecomment-818135546
     */
    // let cumulativeCharLength = 0;
    // let chatMessageCues = [];
    // if (lunaData.scenes[scene].isChat === true) { // if the current scene is a chat exchange ...
    //   if (lunaData.scenes[scene].paragraphs[i].cssClass === "message message-recd") {
    //     chatMessageCues.push({
    //       cueIndex: cumulativeCharLength,
    //       cueType: "show-typing-animation"
    //     })
    //     chatMessageCues.push({
    //       cueIndex: cumulativeCharLength + lunaData.scenes[scene].paragraphs[i].base.length,
    //       cueType: "hide-typing-animation"
    //     })
    //   }
    //   cumulativeCharLength += lunaData.scenes[scene].paragraphs[i].base.length;
    //   chatMessageCues.push({
    //     cueIndex: cumulativeCharLength,
    //     cueType: "show-message"
    //   })
    //   chatMessageCuesByScene[scene] = chatMessageCues;
    //   console.log(chatMessageCuesByScene);
    // }

    setCSS(setupParagraphs(base, i), i); // TODO: move this to setupScreen()
  }
  // console.log("sendMessageCuesByScene:");
  // console.log(sendMessageCuesByScene);
  // console.log("typingIndicatorCuesByScene:");
  // console.log(typingIndicatorCuesByScene);
  return base;
}

function setupParagraphs(base, i) {
  let paragraph = createP();
  container.child(paragraph);
  setTextColor(i); // TODO: should this be applied with selectAll() *after* the loop finishes?
  for (k = 0; k < base.length; k++) {
    let character = base.charAt(k);
    let span = createSpan(character);
    span.style('position: relative');
    setAlpha(span);
    paragraph.child(span); // make each <span>char</span> a child of the paragraph
  }
  return paragraph;
}

function setupTypingIndicator() {
  typingIndicator = createP();
  for (i = 0; i < 3; i++) {
    let span = createSpan();
    span.parent(typingIndicator);
  }
  typingIndicator.parent('container')
  typingIndicator.addClass("typing-indicator");
  typingIndicator.hide();
}

console.log("scenes.js LOADED");