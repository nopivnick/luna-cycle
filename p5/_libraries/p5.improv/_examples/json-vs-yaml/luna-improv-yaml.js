const Improv = require('improv'); // import Improv from 'improv';
const yaml = require('js-yaml');
const fs = require('fs-jetpack');

let outputStrings = [];

const outputJSON = 'output.json';

// Load our data from a file
// const spec = fs.read('luna-grammar.json');
const spec = yaml.load(fs.read('luna-grammar.yaml'));

const improv = new Improv(spec, {
  filters: [Improv.filters.mismatchFilter()],
  builtins: {
    char1st (str) { return str.charAt(0); },
    upcap (str) { return str.toUpperCase(); }
    }
});


const bliss = {
  tags: [
    ['tone', 'neutral'],
    ['tone', 'bliss']
  ]
};
const blah = {
  tags: [
    ['tone', 'blah']
  ]
};
const bad = {
  tags: [
    ['tone', 'bad']
  ]
};

// const lines = [
//   improv.gen('scene0p2', bliss),
//   improv.gen('scene0p2', blah),
//   improv.gen('scene0p2', bad)
// ];

// console.log(lines.join('\n\n'));

const lunaCycle = [
  'scene0p0',
  // 'scene0p1',
  // 'scene0p2',
  // 'scene0p3',
  // 'scene0p4',
  // 'scene1p0',
  // 'scene1p1',
  // 'scene2p0',
  // 'scene2p1',
  // 'scene2p2',
  // 'scene2p3',
  // 'scene3p0',
  // 'scene3p1',
  // 'scene3p2',
]

for (i = 0; i < lunaCycle.length; i++) {
  outputStrings = [
    improv.gen(lunaCycle[i], bliss)
  ]
}

console.log(outputStrings.join('\n\n'));

// Convert .yaml -> .json and save file locally
fs.write(outputJSON, JSON.stringify(spec, null, 2));