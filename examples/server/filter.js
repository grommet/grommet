// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var _ = require('lodash');

var TRACE_PARSING = false;
var TRACE_MATCHING = false;

function unquoteIfNecessary (text) {
  // remove surrounding quotes
  if ((text[0] === '\'' && text[text.length-1] === '\'') ||
    (text[0] === '"' && text[text.length-1] === '"')) {
    text = text.slice(1, text.length-1);
  }
  return text;
}

function filterUserQuery (items, userQuery) {
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

  var result = items.filter(function (item) {
    var unmatchedTerms = terms.slice(0);
    _.forOwn(item, function (value, name) {
      unmatchedTerms = unmatchedTerms.filter(function (term) {
        return ! term.test(value);
      });
      if (unmatchedTerms.length === 0) {
        return false;
      }
    });
    return (unmatchedTerms.length === 0);
  });
  return result;
}

function dumpExpression (exp, prefix) {
  prefix = prefix || '';
  if (exp.left) {
    if (exp.notLeft) {
      console.log(prefix, ' not left');
    }
    if (exp.left.hasOwnProperty('attribute')) {
      console.log(prefix, ' left:', exp.left.attribute, ':', exp.left.value, exp.leftNot);
    } else if (exp.left.hasOwnProperty('regexp')) {
      console.log(prefix, ' left:', exp.left.regexp, exp.leftNot);
    } else {
      dumpExpression(exp.left, prefix + '  ');
    }
  }
  if (exp.error) {
    console.log(prefix, exp.error);
  }
  if (exp.op) {
    console.log(prefix, exp.op);
  }
  if (exp.right) {
    if (exp.notRight) {
      console.log(prefix, ' not right');
    }
    if (exp.right.hasOwnProperty('attribute')) {
      console.log(prefix, ' right:', exp.right.attribute, ':', exp.right.value, exp.rightNot);
    } else if (exp.right.hasOwnProperty('regexp')) {
      console.log(prefix, ' right:', exp.right.regexp, exp.rightNot);
    } else {
      dumpExpression(exp.right, prefix + '  ');
    }
  }
}

function addOp (expression, op) {
  if (expression.op) {
    // already have an op, nest
    expression.right = {left: expression.right, op: op};
    if (expression.notRight) {
      expression.right.notLeft = true;
      delete expression.notRight;
    }
    expression = expression.right;
  } else {
    expression.op = op;
  }
  return expression;
}

// e.g. associatedResourceUri:'/rest/server-profiles/11' AND (state:'Active' OR state:'Running') AND  parentTaskUri:'null' AND NOT taskType:'Background' AND NOT stateReason:'ValidationError'
function parseQuery (query) {
  if (TRACE_PARSING) console.log('!!! parseQuery --- ', query);
  // strip leading and trailing whitespace
  query = query.replace(/^\s+|\s+$/g, '');
  // split into tokens
  var index = 0;
  var endIndex;
  var root = {};
  var expression = root;
  var term;
  var debugCount = 100;

  while (index < query.length) {

    term = null;
    if (' ' === query[index]) {
      if (TRACE_PARSING) console.log('!!! --space--');
      index += 1;
    } else if ('(' === query[index]) {
      if (TRACE_PARSING) console.log('!!! --begin-paren--');
      endIndex = query.indexOf(')', index);
      term = parseQuery(query.slice(index+1, endIndex));
      if (TRACE_PARSING) console.log('!!! --end-paren--');
      index = endIndex + 1;
    } else if ('AND' === query.slice(index, index+3)) {
      if (TRACE_PARSING) console.log('!!! --and--');
      expression = addOp(expression, 'AND');
      index += 3;
    } else if ('OR' === query.slice(index, index+2)) {
      if (TRACE_PARSING) console.log('!!! --or--');
      expression = addOp(expression, 'OR');
      index += 2;
    } else if ('NOT' === query.slice(index, index+3)) {
      if (TRACE_PARSING) console.log('!!! --not--');
      if (expression.hasOwnProperty('left')) {
        expression.notRight = true;
      } else {
        expression.notLeft = true;
      }
      index += 3;
    } else {
      var matches = query.slice(index, query.length).match(/^\w+:'[^']+'|^\w+:"[^"]+"|^\w+:[^'"\s]+/);
      if (matches) {
        if (TRACE_PARSING) console.log('!!! --attribute--');
        // attribute:value
        endIndex = index + matches[0].length;
        var parts = matches[0].toLowerCase().split(':');
        parts[1] = unquoteIfNecessary(parts[1]);
        term = {attribute: parts[0], value: parts[1]};
        index = endIndex + 1;
      } else {
        // text string
        matches = query.slice(index, query.length).match(/^[^'"\s]+|^'[^']+'|^"[^"]+"/);
        if (matches) {
          if (TRACE_PARSING) console.log('!!! --text--');
          endIndex = index + matches[0].length;
          // if the string is quoted, require matching at both ends
          var text = query.slice(index, endIndex);
          var unquoted = unquoteIfNecessary(text);
          var regexp;
          if (text === unquoted) {
            regexp = new RegExp(text, 'i');
          } else {
            regexp = new RegExp('^' + unquoted + '$', 'i');
          }
          term = {regexp: regexp};
          index = endIndex + 1;
        } else {
          console.log('!!! UNPARSEABLE', query.slice(index), query.slice(index, query.length), matches);
          throw "Unable to parse: " + query.slice(index);
        }
      }
    }

    if (null !== term) {
      if (! expression.hasOwnProperty('left')) {
        expression.left = term;
      } else if (! expression.hasOwnProperty('right')) {
        expression.right = term;
        if (! expression.op) {
          if (expression.left.attribute &&
            expression.left.attribute === expression.right.attribute) {
            expression.op = 'OR';
          } else {
            expression.op = 'AND';
          }
        }
      } else {
        console.log('!!! THIRD TERM', expression);
        throw "Unable to parse: " + query + ". Missing AND or OR?";
      }
    }

    if (TRACE_PARSING) console.log('!!! I', index, endIndex);
    //if (DEBUG) dumpExpression(root);
    debugCount -= 1;
    if (debugCount <= 0) {
      break;
    }
  }

  //console.log('!!! RETURN');
  if (TRACE_PARSING) dumpExpression(root);
  return root;
}

function matchesAttribute (item, attribute, not) {
  var matched = ((not || 'null' === attribute.value) ? true : false);
  _.forOwn(item, function (value, name) {
    if ('attributes' === name) {
      matched = matchesAttribute(value, attribute, not);
      if (matched || not) {
        return false;
      }
    } else {
      if (name.toLowerCase() === attribute.attribute &&
        (value &&
        value.toLowerCase() === attribute.value) ||
        (! value && 'null' === attribute.value)) {
        matched = (not ? false : true);
        return false;
      }
    }
  });
  if (TRACE_MATCHING) console.log('!!! ATTRIBUTE', matched, item.uri, attribute, not);
  return matched;
}

function matchesRegexp (item, regexp, not) {
  var matched = (not ? true : false);
  _.forOwn(item, function (value, name) {
    if ('attributes' === name) {
      matched = matchesRegexp(value, regexp, not);
      if (matched || not) {
        return false;
      }
    } else {
      if ((value && regexp.test(value))) {
        matched = (not ? false : true);
        return false;
      }
    }
  });
  if (TRACE_MATCHING) console.log('!!! REGEXP', matched, item.uri, regexp, not);
  return matched;
}

function matchesTerm (item, term, not) {
  var result = false
  if (term) {
    if (term.hasOwnProperty('attribute')) {
      result = matchesAttribute(item, term, not);
    } else if (term.hasOwnProperty('regexp')) {
      result = matchesRegexp(item, term.regexp, not);
    } else if (term.hasOwnProperty('op')){
      result = matchesExpression(item, term, not);
    }
  }
  return result;
}

function matchesExpression (item, expression, not) {
  var result = matchesTerm(item, expression.left, expression.notLeft);
  if ((result && 'AND' === expression.op) ||
    (! result && 'OR' === expression.op)) {
    result = matchesTerm(item, expression.right, expression.notRight);
  }
  if (TRACE_MATCHING) console.log('!!! EXPRESSION', result, item.uri, expression.left);
  return result;
}

function filterQuery (items, query) {
  var expression = parseQuery(query);
  var result = items.filter(function(item) {
    return matchesExpression(item, expression);
  });
  return result;
}

// http://my.opera.com/GreyWyvern/blog/show.dml/1671288
// Do not attempt to change '==' to '===' in the following
// method. Avoid type comparison is done on purpose.
function alphanum (a, b) {
  function chunkify(t) {
    var tz = [], x = 0, y = -1, n = 0, i, j;
    while (t && (i = (j = t.charAt(x++)).charCodeAt(0))) {
      var m = (i == 46 || (i >=48 && i <= 57));
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
      var c = Number(aa[x]), d = Number(bb[x]);
      if (c == aa[x] && d == bb[x]) {
        return c - d;
      } else return (aa[x] > bb[x]) ? 1 : -1;
    }
  }
  return aa.length - bb.length;
}

function sortItems (items, sort) {
  var parts = sort.split(':');
  var attribute = parts[0];
  var ascending = ('asc' === parts[1]);
  items.sort(function (m1, m2) {
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
