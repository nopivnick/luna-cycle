'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports['default'] = template;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var TEMPLATE_BUILTINS = {
  a: function a(text) {
    if (text.match(/^[aeioAEIO]/)) return 'an ' + text;
    return 'a ' + text;
  },

  an: function an(text) {
    return this.a(text);
  },

  cap: function cap(text) {
    return '' + text[0].toUpperCase() + text.slice(1);
  },

  A: function A(text) {
    return this.cap(this.a(text));
  },

  // eslint-disable-next-line babel/new-cap
  An: function An(text) {
    return this.A(text);
  }
};

function dieRoll(min, max, generator) {
  var rng = undefined;
  if (typeof generator === 'undefined') {
    rng = Math.random;
  } else {
    rng = generator.rng;
  }
  return Math.floor(rng() * (max - min + 1)) + min;
}

function mergeInTag(tags, tag) {
  // Find the matching tag...

  var i = tags.findIndex(function (t) {
    return t[0] === tag[0];
  });

  if (i === -1) return tags.concat([tag]);

  // Otherwise:
  // This is supposed to be a non-destructive operation
  var newTags = tags.concat();
  newTags[i] = tag;
  return newTags;
}

function processDirective(rawDirective, model, cb, generator) {
  var directive = rawDirective.trim();

  if (directive[0] === directive.slice(-1) && directive[0] === '\'') {
    // This is a literal directive.
    return directive.slice(1, -1);
  }

  if (directive.indexOf(' ') !== -1) {
    // The directive contains a space, which means it's a chained directive.
    var funcName = directive.split(' ')[0];
    var rest = directive.slice(directive.indexOf(' ') + 1);
    // eslint-disable-next-line no-prototype-builtins
    if (TEMPLATE_BUILTINS.hasOwnProperty(funcName)) {
      return '' + TEMPLATE_BUILTINS[funcName](processDirective(rest, model, cb, generator));
    }
    if (generator && generator.builtins && generator.builtins[funcName]) {
      return '' + generator.builtins[funcName](processDirective(rest, model, cb, generator));
    }
    if (typeof model[funcName] !== 'function') {
      throw new Error('Builtin or model property "' + funcName + '" is not a function.');
    }
    return '' + model[funcName](processDirective(rest, model, cb, generator));
  }

  if (directive[0] === '|') {
    var _directive$split = directive.split(':');

    var _directive$split2 = _slicedToArray(_directive$split, 2);

    var tagStr = _directive$split2[0];
    var snippet = _directive$split2[1];

    // Disregard the first |
    var newTag = tagStr.slice(1).split('|');
    var newModel = Object.create(model);

    newModel.tags = mergeInTag(model.tags, newTag);

    return cb(snippet, newModel);
  }
  if (directive[0] === '>') {
    var _directive$split3 = directive.split(':');

    var _directive$split32 = _slicedToArray(_directive$split3, 2);

    var subModelName = _directive$split32[0];
    var subSnippet = _directive$split32[1];

    if (!subSnippet) throw new Error('Bad or malformed snippet name in directive ' + directive + '.');
    return cb(subSnippet, model, subModelName);
  }
  if (directive[0] === ':') {
    return cb(directive.slice(1), model);
  }
  if (directive[0] === '#') {
    return dieRoll.apply(undefined, _toConsumableArray(directive.slice(1).split('-').map(function (n) {
      return parseInt(n, 10);
    })).concat([generator]));
  }
  if (directive.indexOf('.') !== -1) {
    var propChain = directive.split('.');
    return propChain.reduce(function (obj, prop) {
      return obj[prop];
    }, model);
  }
  return '' + model[directive];
}

function template(_x, _x2, _x3, _x4) {
  var _again = true;

  _function: while (_again) {
    var phrase = _x,
        model = _x2,
        cb = _x3,
        generator = _x4;
    _again = false;
    var openBracket = phrase.indexOf('[');
    var closeBracket = phrase.indexOf(']');

    if (openBracket === -1) return phrase;
    if (closeBracket === -1) {
      throw new Error('Missing close bracket in phrase: ' + phrase);
    }
    var before = phrase.slice(0, openBracket);
    var after = phrase.slice(closeBracket + 1);
    var directive = phrase.substring(openBracket + 1, closeBracket);
    _x = '' + before + processDirective(directive, model, cb, generator) + after;
    _x2 = model;
    _x3 = cb;
    _x4 = generator;
    _again = true;
    openBracket = closeBracket = before = after = directive = undefined;
    continue _function;
  }
}

module.exports = exports['default'];