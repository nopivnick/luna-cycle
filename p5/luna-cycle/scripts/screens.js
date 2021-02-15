function setupScreen(scene, tone) {
  for (i = 0; i < lunaData.scenes[scene].paragraphs.length; i++) { // for every paragraph of the current scene ...
    if (lunaData.scenes[scene].paragraphs[i].snippets === null) { // if there are no tone variants ...
      let paragraph = lunaData.scenes[scene].paragraphs[i].base; // get the base sentence ...
      console.log(paragraph);
      paragraph = createP(paragraph); // wrap it in <p></p> tags and ...
      if (lunaData.scenes[scene].paragraphs[i].cssClass !== null) { // if the paragraph has special CSS styling ...
        paragraph.addClass(lunaData.scenes[scene].paragraphs[i].cssClass); // ... apply the specified CSS class.
      }
    } else {
      paragraph = lunaData.scenes[scene].paragraphs[i].base;
      for (j = 0; j < lunaData.scenes[scene].paragraphs[i].snippets.length; j++) {
        paragraph = paragraph.replace('{' + j + '}', lunaData.scenes[scene].paragraphs[i].snippets[j][tone]);
      }
      console.log(paragraph);
      paragraph = createP(paragraph);
      if (lunaData.scenes[scene].paragraphs[i].cssClass) {
        paragraph.addClass(lunaData.scenes[scene].paragraphs[i].cssClass);
      }
    }
  }
}