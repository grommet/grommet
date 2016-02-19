// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import request from 'superagent';

let _headers = {'Accept': 'application/json'};

let _timeout = 10000; // 10s

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

export default {

  setTimeout (timeout) {
    _timeout = timeout;
  },

  setHeaders (headers) {
    _headers = headers;
  },

  setHeader (name, value) {
    _headers[name] = value;
  },

  head (uri, params) {
    var op = request.head(uri).query(buildQueryParams(params));
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  },

  get (uri, params) {
    var op = request.get(uri).query(buildQueryParams(params));
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  },

  patch (uri, data) {
    var op = request.patch(uri).send(data);
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  },

  post (uri, data) {
    var op = request.post(uri).send(data);
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  },

  put (uri, data) {
    var op = request.put(uri).send(data);
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  },

  del (uri) {
    var op = request.del(uri);
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  }
};
