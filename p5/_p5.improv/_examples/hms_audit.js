'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _hms_coreJs = require('./hms_core.js');

var _hms_coreJs2 = _interopRequireDefault(_hms_coreJs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function runGen() {
  _hms_coreJs2['default'].generator.gen('root', _hms_coreJs2['default'].newModel());
}

_lodash2['default'].times(1000, runGen);

var auditResults = _hms_coreJs2['default'].generator.phraseAudit;
var sortedSnippets = [];

auditResults.forEach(function (_, key) {
  sortedSnippets.push(key);
});

sortedSnippets.sort();

sortedSnippets.forEach(function (snippet) {
  console.log(snippet);
  var currentSnippet = auditResults.get(snippet);
  var phraseList = [];
  currentSnippet.forEach(function (_, phrase) {
    phraseList.push(phrase);
  });
  phraseList.sort(function (a, b) {
    var aVal = currentSnippet.get(a);
    var bVal = currentSnippet.get(b);

    if (aVal > bVal) return -1;
    if (bVal > aVal) return 1;
    return 0;
  }).forEach(function (phrase) {
    console.log('\t' + phrase + ' :: ' + currentSnippet.get(phrase));
  });
});