// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
'use strict';

var StringConvert = require('./StringConvert');

// Parse the query text into formal tokens.
// Tokens enable syntax highlighting and filter formalization.
function tokenize(text) {
  text = text || '';
  var result = [];
  // strip leading and trailing whitespace
  ///var text = text.replace(/^\s+|\s+$/g, '');
  // split into tokens
  var index = 0;
  var endIndex;
  var token;
  var value;
  var rest;
  var matches;
  var parts;
  var op = null;

  // TODO: handle nested parentheses, handle quoted parentheses

  while (index < text.length) {

    token = null;
    if (' ' === text[index]) {
      // space
      index += 1;
    } else if ('(' === text[index]) {
      // begin paren
      endIndex = text.indexOf(')', index);
      token = tokenize(text.slice(index + 1, endIndex));
      index = endIndex + 1;
    } else if ('AND' === text.slice(index, index + 3)) {
      // AND
      op = 'AND';
      index += 3;
    } else if ('OR' === text.slice(index, index + 2)) {
      // OR
      op = 'OR';
      index += 2;
    } else if ('NOT' === text.slice(index, index + 3)) {
      // NOT
      op = 'NOT';
      index += 3;
    } else {
      rest = text.slice(index, text.length);
      matches = rest.match(/^\w+:[^'"\s]+|^\w+:'[^']+'|^\w+:"[^"]+"/);
      if (matches) {
        // attribute:value
        endIndex = index + matches[0].length;
        parts = matches[0].split(':');
        value = StringConvert.unquoteIfNecessary(parts[1]);
        token = { attribute: parts[0], value: value, text: text.slice(index, endIndex) };
        index = endIndex + 1;
      } else {
        // plain text, possibly quoted
        matches = rest.match(/^[^'"\s]+|^'[^']+'|^"[^"]+"/);
        if (matches) {
          // text
          endIndex = index + matches[0].length;
          token = { text: text.slice(index, endIndex) };
          index = endIndex + 1;
        } else {
          // Hmm... must be syntatically invalid, perhaps a single quote
          token = { text: rest, error: 'Syntax error' };
          index = index + rest.length;
        }
      }
    }

    if (token) {
      if (Array.isArray(token)) {
        token = { tokens: token };
      }
      if (op) {
        token.op = op;
        op = null;
      }
      token.index = result.length;
      result.push(token);
    }
  }

  return result;
}

function extractText(fullText) {
  // prune out attribute:value elements
  var text = fullText.replace(/\w+:[^'"\s]+|\w+:'[^']+'|\w+:"[^"]+"/g, '');
  return text;
}

function tokensForAttribute(tokens, attribute) {
  return tokens.filter(function (token) {
    return token.hasOwnProperty('attribute') && token.attribute === attribute;
  });
}

function normalizeToken(token) {
  if (typeof token === 'string') {
    token = { text: token };
  }
  if (!token.text) {
    if (token.attribute) {
      token.text = token.attribute + ':';
      if (token.value) {
        token.text += StringConvert.quoteIfNecessary(token.value);
      }
    }
  }

  return token;
}

function appendText(fullText, tokenText) {
  if (fullText.length > 0) {
    fullText += ' ';
  }
  return fullText + tokenText;
}

var Query = function Query() {
  this.fullText = '';
  this.text = '';
  this.tokens = [];
  this.error = null;
};

Query.prototype = {

  initialize: function initialize(textArg) {
    this.fullText = textArg || '';
    this.tokens = tokenize(this.fullText);
    this.text = extractText(this.fullText);
    this.error = this.tokens.some(function (token) {
      return token.error;
    });
  },

  clone: function clone() {
    var query = new Query();
    query.initialize(this.fullText);
    return query;
  },

  hasToken: function hasToken(tokenArg) {
    tokenArg = normalizeToken(tokenArg);
    return this.tokens.some(function (token) {
      return token.text === tokenArg.text;
    });
  },

  add: function add(tokenArg) {
    tokenArg = normalizeToken(tokenArg);
    var newText = appendText(this.fullText, tokenArg.text);
    this.initialize(newText);
  },

  remove: function remove(tokenArg) {
    tokenArg = normalizeToken(tokenArg);
    var newText = this.tokens.filter(function (token) {
      return token.text !== tokenArg.text;
    }).map(function (token) {
      return token.text;
    }).join(' ');
    this.initialize(newText);
  },

  toggle: function toggle(tokenArg) {
    tokenArg = normalizeToken(tokenArg);
    // see if we have it
    var exists = this.tokens.some(function (token) {
      return token.text === tokenArg.text;
    });
    if (exists) {
      this.remove(tokenArg);
    } else {
      this.add(tokenArg);
    }
  },

  replaceTextTokens: function replaceTextTokens(textArg) {
    var newText = this.tokens.filter(function (token) {
      return token.hasOwnProperty('attribute');
    }).map(function (token) {
      return token.text;
    }).join(' ');
    // TODO: refactor to preserve order of existing text tokens that aren't replaced
    newText = appendText(newText, textArg);
    this.initialize(newText);
  },

  attributeValues: function attributeValues(attribute) {
    return tokensForAttribute(this.tokens, attribute).map(function (token) {
      return token.value;
    });
  },

  replaceAttributeValues: function replaceAttributeValues(attribute, values) {
    var currentTokens = tokensForAttribute(this.tokens, attribute);
    var newTokens = values.map(function (value) {
      return { attribute: attribute, value: value,
        text: attribute + ':' + StringConvert.quoteIfNecessary(value)
      };
    });
    // remove
    currentTokens.forEach(function (currentToken) {
      var exists = newTokens.some(function (newToken) {
        return currentToken.text === newToken.text;
      });
      if (!exists) {
        this.remove(currentToken);
      }
    }, this);
    // add
    newTokens.forEach(function (newToken) {
      var exists = currentTokens.some(function (currentToken) {
        return currentToken.text === newToken.text;
      });
      if (!exists) {
        this.add(newToken);
      }
    }, this);
  },

  filterCount: function filterCount() {
    return this.tokens.filter(function (token) {
      return token.hasOwnProperty('attribute') && token.hasOwnProperty('value');
    }).length;
  }
};

module.exports = {
  create: function create(text) {
    if (text && text.hasOwnProperty('fullText')) {
      text = text.fullText;
    }
    var query = new Query();
    query.initialize(text);
    return query;
  }
};