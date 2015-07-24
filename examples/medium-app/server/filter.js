// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var _ = require('lodash');

var TRACE_PARSING = false;
var TRACE_MATCHING = false;

var TIMESTAMP_REGEXP = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;

// TODO: This won't work in deployment context, use locally for now
//var StringConvert = require('../../src/js/utils/StringConvert');
var StringConvert = {
  unquoteIfNecessary: function (text) {
    // remove surrounding quotes
    if ((text[0] === '\'' && text[text.length - 1] === '\'') ||
      (text[0] === '"' && text[text.length - 1] === '"')) {
      text = text.slice(1, text.length - 1);
    }
    return text;
  }
};

function filterUserQuery(items, userQuery) {
  // handle quoted strings, e.g. 'a b' c "d e"
  var regexp = /'([^']+)'|"([^"]+)"|(\w+)/g;
  var matches;
  var terms = [];
  while ((matches = regexp.exec(userQuery)) !== null) {
    if (matches[1]) {
      terms.push(new RegExp(matches[1], 'i'));
    } else if (matches[2]) {
      terms.push(new RegExp(matches[2], 'i'));
    } else if (matches[3]) {
      terms.push(new RegExp(matches[3], 'i'));
    }
  }

  var result = items.filter(function(item) {
    var unmatchedTerms = terms.slice(0);
    _.forOwn(item, function(value) {
      unmatchedTerms = unmatchedTerms.filter(function(term) {
        return !term.test(value);
      });
      if (unmatchedTerms.length === 0) {
        return false;
      }
    });
    return (unmatchedTerms.length === 0);
  });
  return result;
}

// An attribute term in an Expression.
function AttributeTerm (text) {
  this._not = false;

  var parts = text.toLowerCase().split(':');
  this._name = parts[0];
  this._value = StringConvert.unquoteIfNecessary(parts[1]);

  this.not = function (not) {
    this._not = not;
  };

  this.isRelatedTo = function (term) {
    return (this._name === term._name);
  };

  this.matches = function (item) {
    var result = ((this._not || 'null' === this._value) ? true : false);
    _.forOwn(item, function (value, name) {
      if ('attributes' === name) {
        result = this.matches(value);
        if (result || this._not) {
          return false;
        }
      } else {
        if (name.toLowerCase() === this._name &&
          ((value && value.toLowerCase() === this._value) ||
          (! value && 'null' === this._value))) {
          result = (this._not ? false : true);
          return false;
        }
      }
    }, this);
    if (result && TRACE_MATCHING && item.uri) {
      console.log('!!! ATTRIBUTE', result, item.uri, this._not ? 'NOT' : '', this._name, this._value);
    }
    return result;
  };

  this.toString = function (prefix) {
    return prefix + (this._not ? ' not ' : '') + this._name + ':' + this._value;
  };
}

// A text term in an Expression.
function TextTerm (text) {
  this._not = false;
  this._text = text;

  // if the string is quoted, require matching at both ends
  var unquoted = StringConvert.unquoteIfNecessary(text);
  if (text === unquoted) {
    this._regexp = new RegExp(text, 'i');
  } else {
    this._regexp = new RegExp('^' + unquoted + '$', 'i');
  }

  this.not = function (not) {
    this._not = not;
  };

  this.isRelatedTo = function () {
    return false;
  };

  this.matches = function (item) {
    var result = (this._not ? true : false);
    var matched;
    _.forOwn(item, function(value, name) {
      if ('attributes' === name) {
        result = this.matches(value);
        if (result || this._not) {
          return false;
        }
      } else {
        // Don't match timestamps against short strings
        if (value && this._regexp.test(value) &&
          (text.length > 5 || ! TIMESTAMP_REGEXP.test(value))) {
          result = (this._not ? false : true);
          matched = name + ':' + value;
          return false;
        }
      }
    }, this);
    if (result && TRACE_MATCHING) {
      console.log('!!! REGEXP', result, item.uri, matched, this._not ? 'NOT' : '', this._regexp);
    }
    return result;
  };

  this.toString = function (prefix) {
    return prefix + (this._not ? ' not ' : '') + this._regexp;
  };
}

// A simple expression in a query.
// These can be nested for more complex expressions.
// They have a _left term, a _right term, and an _op (AND or OR).
function Expression () {

  this.op = function (op) {
    if (! this._op) {
      this._op = op;
    } else {
      // already have an op, nest
      // If the right is a simple term, convert it to an expression.
      if (! this._right._left) {
        var expression = new Expression();
        expression.addTerm(this._right);
        expression.op(op);
        this._right = expression;
      } else {
        throw 'Multiple operations';
      }
    }
  };

  this.addTerm = function (term) {
    if (! this._left) {
      this._left = term;
    } else if (! this._right) {
      this._right = term;
      if (! this._op) {
        if (this._left.isRelatedTo(this._right)) {
          this._op = 'OR';
        } else {
          this._op = 'AND';
        }
      }
    } else {
      // We already have a left and a right.
      // If the right is a simple term, convert it to an expression.
      if (! this._right._left) {
        var expression = new Expression();
        expression.addTerm(this._right);
        this._right = expression;
      }
      // Add the term to the right expression.
      this._right.addTerm(term);
    }
  };

  this.isRelatedTo = function () {
    return false;
  };

  this.matches = function (item) {
    var result = false;
    if (this._left) {
      result = this._left.matches(item);
    }
    if ((result && 'AND' === this._op) ||
      (! result && 'OR' === this._op)) {
      if (this._right) {
        result = this._right.matches(item);
      } else {
        result = false;
      }
    }
    if (result && TRACE_MATCHING) {
      console.log('!!! EXPRESSION', result, item.uri, this._op);
    }
    return result;
  };

  this.toString = function (prefix) {
    prefix = prefix || '';
    var result = '';
    if (this._left) {
      result += this._left.toString(prefix + '  ') + "\n";
    }
    if (this._op) {
      result += prefix + this._op + "\n";
    }
    if (this._right) {
      result += this._right.toString(prefix + '  ') + "\n";
    }
    return result;
  };
}

// parser helper functions

function traceParsing (message) {
  if (TRACE_PARSING) {
    console.log('!!! ' + message);
  }
}

function parseSpace (text) {
  return (' ' === text[0] ? 1 : 0);
}

function parseParens (text, expression) {
  var result = 0;
  if ('(' === text[0]) {
    traceParsing('--begin-paren--');
    // NOTE: This doesn't handle nested parens yet.
    var endIndex = text.indexOf(')');
    var subExpression = parseQuery(text.slice(1, endIndex));
    traceParsing('--end-paren--');
    expression.addTerm(subExpression);
    result = endIndex + 1;
  }
  return result;
}

function parseAnd (text, expression) {
  var result = 0;
  if ('AND' === text.slice(0, 3)) {
    traceParsing('--and--');
    result = 3;
    expression.op('AND');
  }
  return result;
}

function parseOr (text, expression) {
  var result = 0;
  if ('OR' === text.slice(0, 2)) {
    traceParsing('--or--');
    result = 2;
    expression.op('OR');
  }
  return result;
}

function parseNot (text, expression) {
  var result = 0;
  if ('NOT' === text.slice(0, 3)) {
    traceParsing('--not--');
    result = 3;
    expression.negateNextTerm();
  }
  return result;
}

function parseAttribute (text, expression) {
  var result = 0;
  var matches = text.match(/^\w+:'[^']+'|^\w+:"[^"]+"|^\w+:[^'"\s]+/);
  if (matches) {
    traceParsing('--attribute--');
    // attribute:value
    result = matches[0].length;
    var term = new AttributeTerm(matches[0]);
    expression.addTerm(term);
  }
  return result;
}

function parseText (text, expression) {
  var result = 0;
  var matches = text.match(/^[^'"\s]+|^'[^']+'|^"[^"]+"/);
  if (matches) {
    traceParsing('--text--');
    result = matches[0].length;
    var term = new TextTerm(matches[0]);
    expression.addTerm(term);
  }
  return result;
}

function parseQuery (query) {

  var parsers = [
    parseSpace,
    parseParens,
    parseAnd,
    parseOr,
    parseNot,
    parseAttribute,
    parseText
  ];
  var remaining = query;
  var expression = new Expression();
  traceParsing('--parse-- ' + query);

  while (remaining.length > 0) {
    for (var i = 0; i < parsers.length; i += 1) {
      var parser = parsers[i];
      var length = parser(remaining, expression);
      if (length > 0) {
        remaining = remaining.slice(length);
        traceParsing('  parsed ' + length + ' leaving ' + remaining);
        break;
      }
    }
  }

  traceParsing('--parsed-- ' + "\n" + expression.toString());

  return expression;
}

function filterQuery(items, query) {
  var expression = parseQuery(query);
  var result = items.filter(function(item) {
    return expression.matches(item);
  });
  return result;
}

// http://my.opera.com/GreyWyvern/blog/show.dml/1671288
// Do not attempt to change '==' to '===' in the following
// method. Avoid type comparison is done on purpose.
function alphanum(a, b) {
  function chunkify(t) {
    var tz = [],
      x = 0,
      y = -1,
      n = 0, i, j;
    while (t && (i = (j = t.charAt(x++)).charCodeAt(0))) {
      var m = (i == 46 || (i >= 48 && i <= 57));
      if (m !== n) {
        tz[++y] = "";
        n = m;
      }
      tz[y] += j;
    }
    return tz;
  }

  var aa = chunkify(a);
  var bb = chunkify(b);

  for (var x = 0; aa[x] && bb[x]; x++) {
    if (aa[x] !== bb[x]) {
      var c = Number(aa[x]),
        d = Number(bb[x]);
      if (c == aa[x] && d == bb[x]) {
        return c - d;
      } else {
        return (aa[x] > bb[x]) ? 1 : -1;
      }
    }
  }
  return aa.length - bb.length;
}

function sortItems(items, sort) {
  var parts = sort.split(':');
  var attribute = parts[0];
  var ascending = ('asc' === parts[1]);
  items.sort(function(m1, m2) {
    var first = (ascending ? m1 : m2);
    var second = (ascending ? m2 : m1);
    return alphanum(first[attribute], second[attribute]);
  });
}

var Filter = {
  filterUserQuery: filterUserQuery, // (items, userQuery)
  filterQuery: filterQuery, // (items, query)
  sort: sortItems // (items, sort)
};

module.exports = Filter;
