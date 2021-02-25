let base;

let red;
let green;
let blue;

function setupScreen(scene, tone) {
  // getBase(); // TODO: should this be it's own function?
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

// function getBase() { // TODO: perhaps this function should have the `scene` & `tone` parameters?
//   for (i = 0; i < lunaData.scenes[scene].paragraphs.length; i++) { // for every paragraph of the current scene ...
//     if (lunaData.scenes[scene].paragraphs[i].snippets === null) { // if there are no tone variants ...
//       base = lunaData.scenes[scene].paragraphs[i].base; // get the base sentence ...
//     } else { // otherwise ...
//       base = lunaData.scenes[scene].paragraphs[i].base;
//       for (j = 0; j < lunaData.scenes[scene].paragraphs[i].snippets.length; j++) {
//         base = base.replace('{' + j + '}', lunaData.scenes[scene].paragraphs[i].snippets[j][tone]);
//       }
//     }
//     console.log(base);
//   }
// }

function setupCharacters(base) {
  let paragraph = createP();
  setColor();
  if (lunaData.scenes[scene].paragraphs[i].cssClass === null) {
    for (k = 0; k < base.length; k++) {
      let character = base.charAt(k);
      let span = createSpan(character);
      span.style('position: relative');
      setAlpha(span);
      paragraph.child(span); // make each <span>char</span> a child of the paragraph
    }
    return paragraph;
  } else {
    let span = createSpan(base)
    paragraph.child(span);
    return paragraph;
  }
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

function setAlpha(span) {
  if (isAlphaOn === true) {
    span.style('color: rgba(' + red + ', ' + green + ', ' + blue + ', 0)'); // TODO: possible to handle alpha with a class in css? 
  } else {
    span.style('color: rgba(' + red + ', ' + green + ', ' + blue + ', 1)');
  }
}

function resetCursor() {
  alphaValue = 1; // otherwise characters on a new screen fade in incrementally rather than turn opaque
  charIndex = -1;
  encoder = -1;
  previousEncoder = 0;
}