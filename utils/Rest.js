// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var request = require('superagent');

var _headers = { 'Accept': 'application/json' };

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

  setTimeout: function setTimeout(timeout) {
    _timeout = timeout;
  },

  setHeaders: function setHeaders(headers) {
    _headers = headers;
  },

  setHeader: function setHeader(name, value) {
    _headers[name] = value;
  },

  head: function head(uri, params) {
    var op = request.head(uri).query(buildQueryParams(params));
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  },

  get: function get(uri, params) {
    var op = request.get(uri).query(buildQueryParams(params));
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  },

  patch: function patch(uri, data) {
    var op = request.patch(uri).send(data);
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  },

  post: function post(uri, data) {
    var op = request.post(uri).send(data);
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  },

  put: function put(uri, data) {
    var op = request.put(uri).send(data);
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  },

  del: function del(uri) {
    var op = request.del(uri);
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  }
};

module.exports = Rest;