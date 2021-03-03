let container;

let base;

let red;
let green;
let blue;

function setupScreen(scene, tone) {
  container = createDiv();
  container.parent('mirror');
  base = getBase(scene, tone);
  // setCSS(setupCharacters(base, i), i); // TODO: fix error when moving this here
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
    setCSS(setupCharacters(base, i), i);
  }
  return base;
}

function setupCharacters(base, i) {
  let paragraph = createP();
  container.child(paragraph);
  setColor(i);
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

function setCSS(paragraph, i) {
  if (lunaData.scenes[scene].paragraphs[i].cssClass !== null) { // if the paragraph has special CSS styling ...
    container.addClass("messages");
    paragraph.addClass(lunaData.scenes[scene].paragraphs[i].cssClass); // ... apply the specified CSS class.
  }
}

function setColor(i) {
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
    // TODO: possible to handle alpha with a class in css?
    span.style(`color: rgba(${red}, ${green}, ${blue}, 0)`);
  } else {
    span.style(`color: rgba(${red}, ${green}, ${blue}, 1)`);
  }
}

function resetCursor() {
  alphaValue = 1; // otherwise characters on a new screen fade in incrementally rather than turn opaque
  charIndex = -1;
  encoder = -1;
  previousEncoder = 0;
}