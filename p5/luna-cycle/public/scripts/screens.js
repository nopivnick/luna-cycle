console.log("scenes.js FOUND");

let container;

let base;

function setupScreen(scene, tone) {
  container = createDiv();
  container.parent('mirror');
  base = getBase(scene, tone);
  // setCSS(setupParagraphs(base, i), i); // TODO: fix error when moving this here
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
      setCSS(setupParagraphs(base, i), i); // TODO: move this to setupScreen()
    }
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

console.log("scenes.js LOADED");
