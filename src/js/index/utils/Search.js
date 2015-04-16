// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
// Parse the search text into formal tokens.
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
    if (' ' === text[index]) { // space
      index += 1;
    } else if ('(' === text[index]) { // begin paren
      endIndex = text.indexOf(')', index);
      token = tokenize(text.slice(index+1, endIndex));
      index = endIndex + 1;
    } else if ('AND' === text.slice(index, index+3)) { // AND
      op = 'AND';
      index += 3;
    } else if ('OR' === text.slice(index, index+2)) { // OR
      op = 'OR';
      index += 2;
    } else if ('NOT' === text.slice(index, index+3)) { // NOT
      op = 'NOT';
      index += 3;
    } else {
      rest = text.slice(index, text.length);
      matches = rest.match(/^\w+:[^'"\s]+|^\w+:'[^']+'|^\w+:"[^"]+"/);
      if (matches) { // attribute:value
        endIndex = index + matches[0].length;
        parts = matches[0].split(':');
        value = String.unquoteIfNecessary(parts[1]);
        token = {attribute: parts[0], value: value, text: text.slice(index, endIndex)};
        index = endIndex + 1;
      } else {
        matches = rest.match(/^[^'"\s]+|^'[^']+'|^"[^"]+"/);
        if (matches) { // text
          endIndex = index + matches[0].length;
          token = {text: text.slice(index, endIndex)};
          index = endIndex + 1;
        } else {
          // Hmm... must be syntatically invalid, perhaps a single quote
          token = {text: rest, error: 'Syntax error'};
          index = index + rest.length;
        }
      }
    }

    if (token) {
      if (Array.isArray(token)) {
        token = {tokens: token};
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
  var text = fullText.replace(/\w+:[^'"\s]+|\w+:'[^']+'|\w+:"[^"]+"/g, '');
  // prune whitespace
  return text.replace(/\s+/g, ' ').replace(/^\s+/, '').replace(/\s+$/, '');
}

function normalizeToken(token) {
  if (typeof token === 'string') {
    token = {text: token};
  }
  if (! token.text) {
    if (token.attribute) {
      token.text = token.attribute + ':';
      if (token.value) {
        token.text += String.quoteIfNecessary(token.value);
      }
    }
  } 
  
  return token;
}

function appendText(fullText, tokenText) {
  if (fullText.length > 0) {
    fullText += ' ';
  }
  return (fullText + tokenText);
}

var Search = function () {
  this.fullText = '';
  this.text = '';
  this.tokens = [];
  this.error = null;
};

Search.prototype = {
  initialize: function (textArg) {
    this.fullText = textArg || '';
    this.tokens = tokenize(this.fullText);
    this.text = extractText(this.fullText);
    this.error = this.tokens.some(function (token) {
      return token.error;
    });
  },

  clone: function () {
    var search = new Search();
    search.initialize(this.fullText);
    return search;
  },

  hasToken: function (tokenArg) {
    tokenArg = normalizeToken(tokenArg);
    return this.tokens.some(function (token) {
      return token.text === tokenArg.text;
    });
  },

  add: function (tokenArg) {
    tokenArg = normalizeToken(tokenArg);
    var newText = appendText(this.fullText, tokenArg.text);
    this.initialize(newText);
  },

  remove: function (tokenArg) {
    tokenArg = normalizeToken(tokenArg);
    var newText = this.tokens.filter(function (token) {
      return (token.text !== tokenArg.text);
    }).map(function (token) {
      return token.text;
    }).join(' ');
    this.initialize(newText);
  },

  toggle: function (tokenArg) {
    tokenArg = normalizeToken(tokenArg);
    // see if we have it
    var exists = this.tokens.some(function (token) {
      return (token.text === tokenArg.text);
    });
    if (exists) {
      this.remove(tokenArg);
    } else {
      this.add(tokenArg);
    }
  },

  replaceTextTokens: function (textArg) {
    var newText = this.tokens.filter(function (token) {
      return token.hasOwnProperty('attribute');
    }).map(function (token) {
      return token.text;
    }).join(' ');
    newText = appendText(newText, textArg);
    this.initialize(newText);
  },

  filterCount: function () {
    return this.tokens.filter(function (token) {
      return token.hasOwnProperty('attribute') && token.hasOwnProperty('value');
    }).length;
  }
};

module.exports = {
  create: function (text) {
    if (text && text.hasOwnProperty('fullText')) {
      text = text.fullText;
    }
    var search = new Search();
    search.initialize(text);
    return search;
  }
};
