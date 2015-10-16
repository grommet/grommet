// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var Reflux = require('reflux');
var merge = require('lodash/object/merge');
var Rest = require('../utils/Rest');
var RestWatch = require('../utils/RestWatch');
var Actions = require('./Actions');

var requests = [];

var IndexActions = Reflux.createActions({
  'setup': {asyncResult: true},
  'cleanup': {},
  'getItems': {asyncResult: true},
  'getItem': {asyncResult: true},
  'getAggregate': {asyncResult: true},
  'getMap': {asyncResult: true},
  'stopWatching': {}
});

IndexActions.setup.listen(function () {
  var thisAction = this;
  thisAction.failed('TBD');
  /*
  Rest.get('/rest/preferences/index',
    {category: options.category})
    .end(function(err, res) {
      if (res.status === 400) {
        return Actions.logout();
      }
      if (err || !res.ok) {
        thisAction.failed(err, res.body || res.text);
      } else {
        thisAction.completed(res.body);
      }
    });
  */
});

IndexActions.cleanup.listen(function () {
  while (requests.length > 0) {
    RestWatch.stop(requests.pop());
  }
});

IndexActions.stopWatching.listen(function (request) {
  RestWatch.stop(request);
});

function normalizeParams(params) {
  var result = merge({}, params);
  if (result.query && (typeof result.query === 'object')) {
    result.query = result.query.fullText;
  }
  return result;
}

function get(url, params, action, context) {
  Rest.get(url, normalizeParams(params))
    .end(function(err, res) {
      if (res.status === 400) {
        return Actions.logout();
      }
      if (err || !res.ok) {
        return action.failed(err, res.body || res.text, params);
      }
      action.completed(res.body, context);
    });
}

function startWatching(url, params, action, context) {
  var request = RestWatch.start(url, normalizeParams(params), function (result) {
    action.completed(result, context, request);
  });
  requests.push(request);
}

function getOrWatch(url, params, action, context, watch, replaceRequest) {
  if (replaceRequest) {
    RestWatch.stop(replaceRequest);
  }
  if (watch) {
    startWatching(url, params, action, context);
  } else {
    get(url, params, action, context);
  }
}

IndexActions.getItems.listen(function (params, watch, replaceRequest) {
  getOrWatch('/rest/index/resources', params, this, params,
    watch, replaceRequest);
});

IndexActions.getAggregate.listen(function (params, watch, replaceRequest) {
  getOrWatch('/rest/index/resources/aggregated', params, this, params,
    watch, replaceRequest);
});

IndexActions.getMap.listen(function (uri, watch, replaceRequest) {
  getOrWatch('/rest/index/trees/aggregated' + uri, null, this, uri,
    watch, replaceRequest);
});

module.exports = IndexActions;
