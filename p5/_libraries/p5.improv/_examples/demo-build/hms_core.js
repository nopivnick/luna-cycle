'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = shipDesc;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libIndexJs = require('./lib/index.js');

var _libIndexJs2 = _interopRequireDefault(_libIndexJs);

var _fsJetpack = require('fs-jetpack');

var _fsJetpack2 = _interopRequireDefault(_fsJetpack);

function loadSpec() {
  var spec = {};
  var snippetFiles = _fsJetpack2['default'].find(__dirname + '/hms_data', {
    matching: '*.json'
  });
  snippetFiles.forEach(function (filename) {
    var snippet = _fsJetpack2['default'].read(filename, 'json');
    if (typeof snippet.groups === 'undefined') {
      snippet.groups = [];
    }
    if (snippet.phrases) {
      snippet.groups.push({
        tags: [],
        phrases: snippet.phrases
      });
    }
    spec[snippet.name] = snippet;
  });
  return spec;
}

var shipMate = new _libIndexJs2['default'](loadSpec(), {
  filters: [_libIndexJs2['default'].filters.mismatchFilter(), _libIndexJs2['default'].filters.unmentioned(1), _libIndexJs2['default'].filters.partialBonus(), _libIndexJs2['default'].filters.fullBonus(), _libIndexJs2['default'].filters.dryness()],
  persistence: false,
  reincorporate: true,
  audit: true
});

function newModel() {
  var model = {};
  // We generate the paragraph first so biases in the name corpus don't overly
  // affect ship characteristics.
  shipMate.gen('class', model);
  shipMate.gen('graph', model);
  return model;
}

function shipDesc() {
  return shipMate.gen('root', newModel());
}

shipDesc.generator = shipMate;
shipDesc.newModel = newModel;
module.exports = exports['default'];