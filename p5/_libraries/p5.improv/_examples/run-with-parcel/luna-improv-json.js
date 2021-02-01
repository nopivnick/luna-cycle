const Improv = require('improv'); // import Improv from 'improv';
const yaml = require('js-yaml');
const fs = require('fs-jetpack');

// Load our data from a file
const spec = fs.read('luna-grammar.json');

const improv = new Improv(spec, {
  filters: [Improv.filters.mismatchFilter()]
});

const bliss = {
  tags: [
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

const lines = [
  improv.gen('scene0p2', bliss),
  improv.gen('scene0p2', blah),
  improv.gen('scene0p2', bad)
];

console.log(lines.join('\n'));