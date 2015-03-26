// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

// portions leveraged from examples at
// http://www.code-experience.com/async-requests-with-react-js-and-flux-revisited/

var _ = require('lodash');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');
var SessionStore = require('../stores/SessionStore');
var request = require('superagent');

var VERSION = 200;
var TIMEOUT = 10000;
var PREFIX = '';

function token() {
  return SessionStore.getAll().id;
}

function dispatch(key, result, response, params, context) {
  var payload = {type: key, result: result, response: response};
  if (params) {
    payload.queryParams = params;
  }
  if (context) {
    payload.context = context;
  }
  AppDispatcher.handleServerAction(payload);
}

// return successful response, else return request Constants
function responseHandler(key, params, context) {
  return function (err, res) {
    if (err && err.timeout === TIMEOUT) {
      dispatch(key, Constants.Request.TIMEOUT, null, params, context);
    } else if (res.status === 400
      && Constants.ActionTypes.LOGOUT !== key
      && Constants.ActionTypes.LOGIN !== key) {
      dispatch(Constants.ActionTypes.LOGOUT, null, null, params, context);
    } else if (!res.ok) {
      dispatch(key, Constants.Request.ERROR, res.body, params, context);
    } else {
      dispatch(key, Constants.Request.SUCCESS, res.body, params, context);
    }
  };
}

function deliver(req, key, params, context) {
  req.timeout(TIMEOUT);
  if (token()) {
    req.set('auth', token());
  }
  req.set('Accept', 'application/json')
  req.set('X-API-Version', VERSION)
  req.end(responseHandler(key, params, context));
}

// convert params to string, to deal with array values
function buildQueryParams(params) {
  var result = [];
  _.forOwn(params, function (value, name) {
    if (Array.isArray(value)) {
      for (var i=0; i<value.length; i++) {
        result.push(name + '=' + value[i]);
      }
    } else {
      result.push(name + '=' + value);
    }
  });
  return result.join('&');
}

var Api = {
  get: function (key, uri, params, context) {
    var op = request.get(PREFIX + uri).query(buildQueryParams(params));
    deliver(op, key, params, context);
  },

  post: function (key, uri, data, context) {
    var op = request.post(PREFIX + uri).send(data);
    deliver(op, key, {}, context);
  },

  del: function (key, uri, context) {
    var op = request.del(PREFIX + uri);
    deliver(op, key, {}, context);
  }
};

module.exports = Api;
