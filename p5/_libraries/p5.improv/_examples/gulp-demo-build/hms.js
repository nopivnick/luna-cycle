'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _hms_coreJs = require('./hms_core.js');

var _hms_coreJs2 = _interopRequireDefault(_hms_coreJs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function main() {
  console.log('\n---\n');
  console.log((0, _hms_coreJs2['default'])());
}

_lodash2['default'].times(10, main);