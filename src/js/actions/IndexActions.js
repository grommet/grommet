// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var Reflux = require('reflux');
var merge = require('lodash/object/merge');
var Rest = require('../utils/Rest');
var Actions = require('./Actions');

var IndexActions = Reflux.createActions({
  'setup': {asyncResult: true},
  'getItems': {asyncResult: true},
  'getAggregate': {asyncResult: true}
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

IndexActions.getItems.listen(function (params) {
  var thisAction = this;
  var restParams = merge({}, params);
  if (restParams.query && (typeof restParams.query === 'object')) {
    restParams.query = restParams.query.fullText;
  }
  Rest.get('/rest/index/resources', restParams)
    .end(function(err, res) {
      if (res.status === 400) {
        return Actions.logout();
      }
      if (err || !res.ok) {
        return thisAction.failed(err, res.body || res.text, params);
      }
      thisAction.completed(res.body, params);
    });
});

IndexActions.getAggregate.listen(function (params) {
  var thisAction = this;
  var restParams = merge({}, params);
  if (restParams.query && (typeof restParams.query === 'object')) {
    restParams.query = restParams.query.fullText;
  }
  Rest.get('/rest/index/resources/aggregated', restParams)
    .end(function(err, res) {
      if (res.status === 400) {
        return Actions.logout();
      }
      if (err || !res.ok) {
        return thisAction.failed(err, res.body || res.text, params);
      }
      thisAction.completed(res.body, params);
    });
});

module.exports = IndexActions;
