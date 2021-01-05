/**
 * Attribution:
 * - https://github.com/mimiyin/oracle/blob/2dc6fce5b177c7ce14ef14ec48f37c14014be420/public/chorus/sketch.js#L29-L60
 */

let optimalFontSize;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

function scaleFontSize() {
  while (poem.size().height > innerHeight)
    fontSize--;
  poem.style('font-size', optimalFontSize + 'vh')
}



// function scaleFS(el) {
//   // Set font-size on element
//   function setFS() {
//     el.style('font-size', fs + 'px');
//   }

//   // Don't size on height for url
//   // Make sure it fits height-wise
//   while (el.size().height < windowHeight) {
//     fs++;
//     setFS();
//   }
//   fs--;
//   setFS();

//   //Then make sure it fits width-wise
//   while (el.size().width > windowWidth) {
//     fs--;
//     setFS()
//   }

//   el.addClass('fullscreen');
// }

// // Scale font-size
// scaleFS(queryDiv);
// // Make it green
// body.addClass('chartreuse');
// // Remove query after a certain about of time
// setTimeout(() => {
//   queryDiv.remove();
//   body.removeClass('chartreuse');
// }, QUERY_TS);