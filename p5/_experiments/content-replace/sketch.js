let screens = [];
let tone = 'bliss';

const regex = /{\d}/g;

function setup() {
  setupCanvas();
  setupScreen();
}

function draw() {
  background(0);
}

function setupCanvas() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
}

function setupScreen() { // TODO: add parameters for SCENE and TONE
  for (i = 0; i < lunaData.scene.length; i++) {
    // console.log("Scene " + i);
    for (j = 0; j < lunaData.scene[i].paragraph.length; j++) {
      // console.log("Scene " + i + " Paragraph " + j);
      if (lunaData.scene[i].paragraph[j].snippets === null) {
        // console.log("NO Snippets!");
        let paragraph = lunaData.scene[i].paragraph[j].base;
        console.log(paragraph);
        createP(paragraph);
        if (lunaData.scene[i].paragraph[j].cssClass) {
          // console.log(lunaData.scene[i].paragraph[j].cssClass);
          paragraph.addClass(lunaData.scene[i].paragraph[j].cssClass);
        }
      } else {
        // console.log("YES Snippets!");
        console.log(lunaData.scene[i].paragraph[j].base.replaceAll(regex, '*SNIPPET*'));
        createP(lunaData.scene[i].paragraph[j].base.replaceAll(regex, '*SNIPPET*'));
        if (lunaData.scene[i].paragraph[j].cssClass) {
          // console.log(lunaData.scene[i].paragraph[j].cssClass);
          paragraph.addClass(lunaData.scene[i].paragraph[j].cssClass);
        }
      }
    }
  }
}

function getSnippet(match) {
  // TODO: return the value of the snippet with key = tone;
}

function setupScene(screen) {

}
