const Improv = require('improv'); // import Improv from 'improv';

const spec = {
  scene0p2: {
    groups: [{
      tags: [],
      phrases: [
        "[:0], big as your [:1], they [:2] themselves on the window closest to the light and pitter-patter against the glass with lime-green wings of paper and dust."
      ]
    }]
  },
  0: {
    groups: [{
        tags: [
          ['tone', 'bliss']
        ],
        phrases: ["Delicate and otherworldly"]
      },
      {
        tags: [
          ['tone', 'blah']
        ],
        phrases: ["Large and clumsy"]
      },
      {
        tags: [
          ['tone', 'bad']
        ],
        phrases: ["Grotesque and shabby"]
      }
    ]
  },
  1: {
    groups: [{
        tags: [
          ['tone', 'bliss']
        ],
        phrases: ["palm"]
      },
      {
        tags: [
          ['tone', 'blah']
        ],
        phrases: ["hand"]
      },
      {
        tags: [
          ['tone', 'bad']
        ],
        phrases: ["fist"]
      }
    ]
  },
  2: {
    groups: [{
        tags: [
          ['tone', 'bliss']
        ],
        phrases: ["flaunt"]
      },
      {
        tags: [
          ['tone', 'blah']
        ],
        phrases: ["park"]
      },
      {
        tags: [
          ['tone', 'bad']
        ],
        phrases: ["foist"]
      }
    ]
  }
};

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