// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var request = require('superagent');

var _headers = {'Accept': 'application/json'};

var _timeout = 10000; // 10s

// convert params to string, to deal with array values
function buildQueryParams(params) {
  var result = [];
  for (var property in params) {
    if (params.hasOwnProperty(property)) {
      var value = params[property];
      if (null !== value && undefined !== value) {
        if (Array.isArray(value)) {
          for (var i = 0; i < value.length; i++) {
            result.push(property + '=' + value[i]);
          }
        } else {
          result.push(property + '=' + value);
        }
      }
    }
  }
  return result.join('&');
}

var Rest = {

  setTimeout: function (timeout) {
    _timeout = timeout;
  },

  setHeaders: function (headers) {
    _headers = headers;
  },

  setHeader: function (name, value) {
    _headers[name] = value;
  },

  head: function (uri, params) {
    var op = request.head(uri).query(buildQueryParams(params));
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  },

  get: function (uri, params) {
    var op = request.get(uri).query(buildQueryParams(params));
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  },

  patch: function (uri, data) {
    var op = request.patch(uri).send(data);
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  },

  post: function (uri, data) {
    var op = request.post(uri).send(data);
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  },

  put: function (uri, data) {
    var op = request.put(uri).send(data);
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  },

  del: function (uri) {
    var op = request.del(uri);
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  }
};

module.exports = Rest;
