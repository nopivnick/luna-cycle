console.log("scenes.js FOUND");

let container;

let base;

function setupScreen(scene, tone) {
  container = createDiv();
  container.parent('mirror');
  base = getBase(scene, tone);
  // setCSS(setupCharacters(base, i), i); // TODO: fix error when moving this here
}

function getBase(scene, tone) {

  // if (sceneManager.scene.fnScene.name === "sceneChat") {

  //   for (i = 0; i < lunaChat.scenes[0].paragraphs.length; i++) { // for every paragraph of the current scene ...
  //     if (lunaChat.scenes[0].paragraphs[i].snippets === null) { // if there are no tone variants ...
  //       base = lunaChat.scenes[0].paragraphs[i].base; // get the base sentence ...
  //     } else { // otherwise ...
  //       base = lunaChat.scenes[0].paragraphs[i].base; // get the base sentence and ...
  //       for (j = 0; j < lunaChat[0].scenes.paragraphs[i].snippets.length; j++) { // for every snippet in the current paragraph ...
  //         base = base.replace('{' + j + '}', lunaChat.scenes[0].paragraphs[i].snippets[j][tone]); // substitute the current tone
  //       }
  //     }
  //     console.log(base);
  //     setCSS(setupCharacters(base, i), i); // TODO: move this to setupScreen()
  //   }

  // } else {

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
      setCSS(setupCharacters(base, i), i); // TODO: move this to setupScreen()
    }
  // }
  return base;

}

function setupCharacters(base, i) {
  let paragraph = createP();
  container.child(paragraph);
  setColor(i);

  // TODO: this is logic if the chat sequence were a function with the name sceneChat
  // if (sceneManager.scene.fnScene.name === "sceneChat") {
  //   let span = createSpan(base)
  //   paragraph.child(span);
  //   return paragraph;
  // } else {
  //   for (k = 0; k < base.length; k++) {
  //     let character = base.charAt(k);
  //     let span = createSpan(character);
  //     span.style('position: relative');
  //     setAlpha(span);
  //     paragraph.child(span); // make each <span>char</span> a child of the paragraph
  //   }
  //   return paragraph;
  // }

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

console.log("scenes.js LOADED");
