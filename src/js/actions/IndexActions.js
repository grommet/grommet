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

IndexActions.setup.listen(function (options) {
  var thisAction = this;
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
});

IndexActions.getItems.listen(function (options) {
  var thisAction = this;
  var params = merge({}, {category: options.category}, options.params);
  if (options.params.query && (typeof options.params.query === 'object')) {
    params.query = options.params.query.fullText;
  }
  Rest.get('/rest/index/resources', params)
    .end(function(err, res) {
      if (res.status === 400) {
        return Actions.logout();
      }
      if (err || !res.ok) {
        return thisAction.failed(err, res.body || res.text);
      }
      thisAction.completed(res.body);
    });
});

module.exports = IndexActions;
