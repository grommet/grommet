// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var _ = require('lodash');

function filterUserQuery(members, userQuery) {
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

  var result = members.filter(function(member) {
    var unmatchedTerms = terms.slice(0);
    _.forOwn(member, function (value, name) {
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

function dumpExpression(exp, prefix) {
  prefix = prefix || '';
  if (exp.left) {
    if (exp.notLeft) {
      console.log(prefix, ' not left');
    }
    if (exp.left.hasOwnProperty('attribute')) {
      console.log(prefix, ' left:', exp.left.attribute, ':', exp.left.value, exp.leftNot);
    } else {
      dumpExpression(exp.left, prefix + '  ');
    }
  }
  console.log(prefix, exp.op);
  if (exp.right) {
    if (exp.notRight) {
      console.log(prefix, ' not right');
    }
    if (exp.right.hasOwnProperty('attribute')) {
      console.log(prefix, ' right:', exp.right.attribute, ':', exp.right.value, exp.rightNot);
    } else {
      dumpExpression(exp.right, prefix + '  ');
    }
  }
}

function addOp(expression, op) {
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
function parseQuery(query) {
  //console.log('!!! parseQuery --- ', query);
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
      //console.log('!!! --space--');
      index += 1;
    } else if ('(' === query[index]) {
      //console.log('!!! --begin-paren--');
      endIndex = query.indexOf(')', index);
      term = parseQuery(query.slice(index+1, endIndex));
      //console.log('!!! --end-paren--');
      index = endIndex + 1;
    } else if ('AND' === query.slice(index, index+3)) {
      //console.log('!!! --and--');
      expression = addOp(expression, 'AND');
      index += 3;
    } else if ('OR' === query.slice(index, index+2)) {
      //console.log('!!! --or--');
      expression = addOp(expression, 'OR');
      index += 2;
    } else if ('NOT' === query.slice(index, index+3)) {
      //console.log('!!! --not--');
      if (expression.hasOwnProperty('left')) {
        expression.notRight = true;
      } else {
        expression.notLeft = true;
      }
      index += 3;
    } else {
      var matches = query.slice(index, query.length).match(/^\w+:'[^']+'/);
      if (matches) {
        //console.log('!!! --attribute--');
        // attribute:value
        endIndex = index + matches[0].length;
        var parts = matches[0].toLowerCase().split(':');
        // remove quotes from value
        term = {attribute: parts[0], value: parts[1].slice(1, parts[1].length-1)};
        index = endIndex + 1;
      } else {
        console.log('!!! NO ATTRIBUTE', query.slice(index), query.slice(index, query.length), matches);
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
      }
    }

    //console.log('!!! I', index, endIndex);
    //dumpExpression(root);
    debugCount -= 1;
    if (debugCount <= 0) {
      break;
    }
  }

  //console.log('!!! RETURN');
  //dumpExpression(root);
  return root;
}

function matchesFilter(member, filter, not) {
  var matched = ((not || 'null' === filter.value) ? true : false);
  _.forOwn(member, function (value, name) {
    if ('attributes' === name) {
      matched = matchesFilter(value, filter, not);
      if (matched || not) {
        return false;
      }
    } else {
      if (name.toLowerCase() === filter.attribute &&
        (value &&
        value.toLowerCase() === filter.value) ||
        (! value && 'null' === filter.value)) {
        matched = (not ? false : true);
        return false;
      }
    }
  });
  //console.log('!!! FILTER', matched, member.uri, filter, not);
  return matched;
}

function matchesTerm(member, term, not) {
  var result = false
  if (term.hasOwnProperty('attribute')) {
    result = matchesFilter(member, term, not);
  } else if (term.hasOwnProperty('op')){
    result = matchesExpression(member, term, not);
  }
  return result;
}

function matchesExpression(member, expression, not) {
  var result = matchesTerm(member, expression.left, expression.notLeft);
  if ((result && 'AND' === expression.op) ||
    (! result && 'OR' === expression.op)) {
    result = matchesTerm(member, expression.right, expression.notRight);
  }
  //console.log('!!! EXPRESSION', result, member.uri, expression.left);
  return result;
}

function filterQuery(members, query) {
  var expression = parseQuery(query);
  var result = members.filter(function(member) {
    return matchesExpression(member, expression);
  });
  return result;
}

// http://my.opera.com/GreyWyvern/blog/show.dml/1671288
// Do not attempt to change '==' to '===' in the following
// method. Avoid type comparison is done on purpose.
function alphanum(a, b) {
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

function sortMembers (members, sort) {
  var parts = sort.split(':');
  var attribute = parts[0];
  var ascending = ('asc' === parts[1]);
  members.sort(function (m1, m2) {
    var first = (ascending ? m1 : m2);
    var second = (ascending ? m2 : m1);
    return alphanum(first[attribute], second[attribute]);
  });
}

var Filter = {
  filterUserQuery: filterUserQuery, // (members, userQuery)
  filterQuery: filterQuery, // (members, query)
  sort: sortMembers // (members, sort)
};

module.exports = Filter;
