let base;

let red;
let green;
let blue;

function setupScreen(scene, tone) {
  for (i = 0; i < lunaData.scenes[scene].paragraphs.length; i++) { // for every paragraph of the current scene ...
    if (lunaData.scenes[scene].paragraphs[i].snippets === null) { // if there are no tone variants ...
      base = lunaData.scenes[scene].paragraphs[i].base; // get the base sentence ...
    } else { // otherwise ...
      base = lunaData.scenes[scene].paragraphs[i].base;
      for (j = 0; j < lunaData.scenes[scene].paragraphs[i].snippets.length; j++) {
        base = base.replace('{' + j + '}', lunaData.scenes[scene].paragraphs[i].snippets[j][tone]);
      }
    }
    console.log(base);
    setCSS(setupCharacters(base)); // and apply any CSS ...
  }
  // resetCursor();
}

// function getBase() { // TODO: this function is not working
//   // let base;
//   for (i = 0; i < lunaData.scenes[scene].paragraphs.length; i++) { // for every paragraph of the current scene ...
//     if (lunaData.scenes[scene].paragraphs[i].snippets !== null) { // if the base sentence has variants based on tone ...
//       base = lunaData.scenes[scene].paragraphs[i].base; // get the base sentence ...
//       for (j = 0; j < lunaData.scenes[scene].paragraphs[i].snippets.length; j++) {
//         base = base.replace('{' + j + '}', lunaData.scenes[scene].paragraphs[i].snippets[j][tone]);
//       }
//     } else {
//       base = lunaData.scenes[scene].paragraphs[i].base;
//     }
//     console.log(base);
//   }
// }

function setupCharacters(base) {
  let paragraph = createP();
  for (k = 0; k < base.length; k++) {
    let character = base.charAt(k);
    let span = createSpan(character);
    span.style('position: relative');
    setColor();
    if (isAlphaOn === true) {
      span.style('color: rgba('+red+', '+green+', '+blue+', 0)'); // TODO: better to handle alpha with a class in css? 
    } else {
      span.style('color: rgba('+red+', '+green+', '+blue+', 1)');
    }
    paragraph.child(span); // make each <span>char</span> a child of the paragraph
  }
  return paragraph;
}

function setCSS(paragraph) {
  if (lunaData.scenes[scene].paragraphs[i].cssClass !== null) { // if the paragraph has special CSS styling ...
    paragraph.addClass(lunaData.scenes[scene].paragraphs[i].cssClass); // ... apply the specified CSS class.
  }
}

function setColor() {
  if ((lunaData.scenes[scene].paragraphs[i].cssClass !== null)) {
    red = 0;
    green = 0;
    blue = 0;
  } else {
    red = 50;
    green = 205;
    blue = 50;
  }
}

function resetCursor() {
  alphaValue = 1; // otherwise characters on a new screen fade in incrementally rather than turn opaque
  charIndex = -1;
  encoder = -1;
  previousEncoder = 0;
}
