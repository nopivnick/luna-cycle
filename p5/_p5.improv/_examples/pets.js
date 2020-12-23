'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libIndexJs = require('./lib/index.js');

var _libIndexJs2 = _interopRequireDefault(_libIndexJs);

var spec = {
  animal: {
    groups: [{
      tags: [['class', 'mammal']],
      phrases: ['dog', 'cat']
    }, {
      tags: [['class', 'bird']],
      phrases: ['parrot']
    }]
  },
  root: {
    groups: [{
      tags: [],
      phrases: ['[name]: I have a [:animal] who is [#2-7] years old.']
    }]
  }
};

var improv = new _libIndexJs2['default'](spec, {
  filters: [_libIndexJs2['default'].filters.mismatchFilter()]
});

var bob = { name: 'Bob' };
var alice = { name: 'Alice', tags: [['class', 'mammal']] };
var carol = { name: 'Carol', tags: [['class', 'bird']] };

var lines = [improv.gen('root', bob), improv.gen('root', alice), improv.gen('root', carol)];

console.log(lines.join('\n'));