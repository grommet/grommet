// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var request = require('superagent');

var _headers = {};

var _timeout = 10000; // 10s

function deliver(req, handler) {
  req.timeout(_timeout);
  req.set(_headers);
  req.end(handler);
}

// convert params to string, to deal with array values
function buildQueryParams(params) {
  var result = [];
  for (var property in params) {
    if (params.hasOwnProperty(property)) {
      var value = params[property];
      if (Array.isArray(value)) {
        for (var i=0; i<value.length; i++) {
          result.push(property + '=' + value[i]);
        }
      } else {
        result.push(property + '=' + value);
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

  get: function (uri, params, handler) {
    var op = request.get(uri).query(buildQueryParams(params));
    deliver(op, handler);
  },

  post: function (uri, data, handler) {
    var op = request.post(uri).send(data);
    deliver(op, handler);
  },

  del: function (uri, handler) {
    var op = request.del(uri);
    deliver(op, handler);
  }
};

module.exports = Rest;
