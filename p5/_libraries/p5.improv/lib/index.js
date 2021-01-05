'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _templateJs = require('./template.js');

var _templateJs2 = _interopRequireDefault(_templateJs);

var _lodash = require('lodash');

var _filtersJs = require('./filters.js');

var _filtersJs2 = _interopRequireDefault(_filtersJs);

var defaults = {
  filters: [],
  reincorporate: false,
  persistence: true,
  audit: false,
  salienceFormula: function salienceFormula(a) {
    return a;
  },
  submodeler: function submodeler() {
    return {};
  }
};

var Improv = (function () {
  function Improv(snippets) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Improv);

    /* Constructor for Improv generators. */
    /* We don't want to mutate the options object we've been given; we don't know
    where it's been. */
    var spec = {};(0, _lodash.merge)(spec, defaults, options);
    this.snippets = snippets;
    this.filters = spec.filters;
    this.reincorporate = Boolean(spec.reincorporate);
    this.persistence = Boolean(spec.persistence);
    this.audit = Boolean(spec.audit);
    this.salienceFormula = spec.salienceFormula;
    this.submodeler = spec.submodeler;
    this.builtins = spec.builtins;
    this.history = [];
    this.tagHistory = [];
    if (spec.rng) {
      this._rng = spec.rng.bind(this);
    }

    if (this.audit) this.instantiateAuditData();
  }

  _createClass(Improv, [{
    key: '__gen',
    value: function __gen(snippet, model, subModelName) {
      /*
        Actually generate text. Separate from #gen() because we don't want to clear
        history or error-handling data while a call to #gen() hasn't finished
        returning
      */
      /* For the sake of better error handling, we try to keep an accurate record
         of what snippet is being generated at any given time. */
      if (typeof model.bindings === 'object' && model.bindings[snippet]) {
        // The snippet already exists in the model's bindings.
        return model.bindings[snippet];
      }
      // Keep a stack of snippets we are using.
      if (subModelName) model = this.getSubModel(model, subModelName);

      var previousSnippet = this.currentSnippet;
      this.__currentSnippet = snippet;

      var chosenPhrase = this.selectPhrase(this.scoreFilter(this.applyFilters(snippet, model)), model);
      this.history.unshift(chosenPhrase);

      // -- Auditing code begins -- //
      if (this.audit) {
        var phraseTotal = this.__phraseAudit.get(snippet).get(chosenPhrase);
        this.__phraseAudit.get(snippet).set(chosenPhrase, phraseTotal + 1);
      }
      // -- Auditing code ends -- //

      var output = (0, _templateJs2['default'])(chosenPhrase, model, this.__gen.bind(this), this);

      if (this.snippets[snippet].bind) {
        // Make sure the model has a bindings property
        if (typeof model.bindings === 'undefined') model.bindings = {};
        model.bindings[snippet] = output;
      }

      this.__currentSnippet = previousSnippet;
      return output;
    }
  }, {
    key: 'gen',
    value: function gen(snippet) {
      var model = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      /*
        Generate text (user-facing API). Since this function can recur, most of
        the heavy lifting is done in __gen().
      */
      // Make sure the model has a tag property.
      if (typeof model.tags === 'undefined') model.tags = [];

      if (typeof this.snippets[snippet] === 'undefined') {
        throw new Error('Tried generating snippet "' + snippet + '", but no such snippet exists in spec');
      }

      var output = this.__gen(snippet, model);

      if (!this.persistence) {
        this.clearHistory();this.clearTagHistory();
      }

      return output;
    }
  }, {
    key: 'mergeTags',
    value: function mergeTags(model, groupTags) {
      /*
        Add a group's tags to the model, for reincorporation.
      */
      function mergeTag(a, b) {
        if (a.length < b.length) return b;
        return a;
      }

      groupTags.forEach(function (a) {
        // Find the corresponding tag in the model.
        var site = model.tags.findIndex(function (b) {
          return a[0] === b[0];
        });
        if (site === -1) {
          // No such tag; simply add the group's tags to the model.
          model.tags = model.tags.concat([a]);
        } else {
          model.tags[site] = mergeTag(model.tags[site], a);
        }
      });
    }
  }, {
    key: 'selectPhrase',
    value: function selectPhrase(groups, model) {
      /*
        Once we have a list of suitable groups, finally select a phrase at random.
      */
      var phrases = this.flattenGroups(groups);
      if (phrases.length === 0) {
        if (this.audit) {
          console.log(groups);
          console.log(model);
        }
        throw new Error('Ran out of phrases in ' + groups + ' while generating ' + this.__currentSnippet);
      }
      if (!this) console.log('not this either!');
      var chosen = phrases[Math.floor(this.rng() * phrases.length)];
      if (this.reincorporate) this.mergeTags(model, chosen[1]);
      if (Array.isArray(chosen[1])) {
        this.tagHistory = chosen[1].concat(this.tagHistory);
      }
      return chosen[0];
    }
  }, {
    key: 'applyFiltersToGroup',
    value: function applyFiltersToGroup(group, model) {
      /*
        Run the filters through an individual group.
      */
      var output = { score: 0 };

      // Make sure the group has tags.
      if (typeof group.tags === 'undefined') group.tags = [];

      // Since we might return a different group than we got, we use a variable.
      var currentGroup = group;

      function applyFilterToGroup(cb) {
        if (output.score === null) return;

        var cbOutput = cb.call(this, currentGroup, model);

        var scoreOffset = undefined;

        if (Array.isArray(cbOutput)) {
          // We got a tuple, meaning the filter wants to modify the group before
          // moving on.
          scoreOffset = cbOutput[0];
          currentGroup = cbOutput[1];
        } else {
          scoreOffset = cbOutput;
        }
        if (scoreOffset === null) {
          output.score = null;
          return;
        }
        output.score += scoreOffset;
      }

      this.filters.forEach(applyFilterToGroup.bind(this));

      output.group = currentGroup;
      return output;
    }
  }, {
    key: 'applyFilters',
    value: function applyFilters(snippetName, model) {
      var _this = this;

      /*
        Starting with the raw list of groups, return a filtered list with
        scores.
      */
      if (typeof this.snippets[snippetName] === 'undefined') {
        throw new Error('Missing snippet object for snippet ' + snippetName + '.');
      }
      var groups = this.snippets[snippetName].groups;
      if (!Array.isArray(groups)) {
        throw new Error('Missing or bad groups array for snippet ' + snippetName + '; was ' + typeof groups);
      }
      return groups.map(function (group) {
        return _this.applyFiltersToGroup(group, model);
      }).filter(function (o) {
        return o.score !== null;
      });
    }
  }, {
    key: 'scoreFilter',
    value: function scoreFilter(groups) {
      /*
        Starting with the scored list from applyFilters(), return a list that has
        invalid groups scrubbed out and only includes groups with a score past
        the threshold.
      */
      // Filter out groups emptied out by dryness()
      var validGroups = groups.filter(function (g) {
        return g.group.phrases.length > 0;
      });
      var maxScore = validGroups.reduce(function (currentMax, b) {
        return b.score > currentMax ? b.score : currentMax;
      }, Number.NEGATIVE_INFINITY);
      var scoreThreshold = this.salienceFormula(maxScore);
      return validGroups.filter(function (o) {
        return o.score >= scoreThreshold;
      });
    }
  }, {
    key: 'flattenGroups',
    value: function flattenGroups(groups) {
      /*
        Starting with a list of scored groups, flatten them into a simple list
        of phrases.
      */
      return groups.map(function (o) {
        return o.group.phrases.map(function (i) {
          return [i, o.group.tags];
        });
      }).reduce(function (a, b) {
        return a.concat(b);
      }, []);
    }
  }, {
    key: 'clearHistory',
    value: function clearHistory() {
      this.history = [];
    }
  }, {
    key: 'clearTagHistory',
    value: function clearTagHistory() {
      this.tagHistory = [];
    }
  }, {
    key: 'instantiateAuditData',
    value: function instantiateAuditData() {
      /*
        Create and fill audit maps with starter data, ie zeroes.
      */
      this.__phraseAudit = new Map();
      var self = this;

      Object.keys(this.snippets).forEach(function (key) {
        self.phraseAudit.set(key, new Map());
        self.snippets[key].groups.forEach(function (group) {
          group.phrases.forEach(function (phrase) {
            self.__phraseAudit.get(key).set(phrase, 0);
          });
        });
      });
    }
  }, {
    key: 'getSubModel',
    value: function getSubModel(model, subModelName) {
      if (model[subModelName]) return model[subModelName];
      model[subModelName] = this.submodeler(model, subModelName);
      return model[subModelName];
    }
  }, {
    key: 'phraseAudit',
    get: function get() {
      /* This is a getter so that the internals of how auditing data is stored
         and calculated can change without changing the API. */
      if (!this.audit) throw new Error('Tried retriving audit from generator not in auditing mode.');
      return this.__phraseAudit;
    }
  }, {
    key: 'rng',
    get: function get() {
      if (this._rng) return this._rng;
      return Math.random;
    }
  }]);

  return Improv;
})();

Improv.filters = _filtersJs2['default'];

exports['default'] = Improv;
module.exports = exports['default'];