console.log("scenes.js FOUND");

let container;

let base;

let chatSceneCues = {};

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

      if (lunaData.scenes[scene].paragraphs[i].cssClass !== null) { // if the scene is a chat transcript ...
        let messageLength = []; // ... declare an array and ...
        for (m = 0; m < lunaData.scenes[scene].paragraphs.length; m++) { // ... for every paragraph of the current scene ... // TODO: this should be a forEach loop
          messageLength.push(lunaData.scenes[scene].paragraphs[m].base.length); // ... add the length of the base to the array and ...
        }
        chatSceneCues[scene] = messageLength; // ... add the array to the list of cues object
      }
      console.log(chatSceneCues);

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
