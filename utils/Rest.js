'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.headers = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.buildParams = buildParams;
exports.buildQuery = buildQuery;
exports.processStatus = processStatus;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var headers = exports.headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

// converts object to parameter array, handles arrays
function buildParams(object) {
  var params = [];
  if (object) {
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        var value = object[property];
        if (null !== value && undefined !== value) {
          if (Array.isArray(value)) {
            for (var i = 0; i < value.length; i++) {
              params.push(property + '=' + encodeURIComponent(value[i]));
            }
          } else {
            params.push(property + '=' + encodeURIComponent(value));
          }
        }
      }
    }
  }
  return params;
}

// joins params array and adds '?' prefix if needed
function buildQuery(object) {
  var params = Array.isArray(object) ? object : buildParams(object);
  return params.length > 0 ? '?' + params.join('&') : '';
}

// reject promise of response isn't ok
function processStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response.statusText || 'Error ' + response.status);
  }
}

// Deprecated superagent functions

var _headers = _extends({}, headers);

var _timeout = 10000; // 10s

exports.default = {
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
    var op = _superagent2.default.head(uri).query(buildParams(params).join('&'));
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  },
  get: function get(uri, params) {
    var op = _superagent2.default.get(uri).query(buildParams(params).join('&'));
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  },
  patch: function patch(uri, data) {
    var op = _superagent2.default.patch(uri).send(data);
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  },
  post: function post(uri, data) {
    var op = _superagent2.default.post(uri).send(data);
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  },
  put: function put(uri, data) {
    var op = _superagent2.default.put(uri).send(data);
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  },
  del: function del(uri) {
    var op = _superagent2.default.del(uri);
    op.timeout(_timeout);
    op.set(_headers);
    return op;
  }
};