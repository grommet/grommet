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

function getItems(url, params, action) {
  var restParams = merge({}, params);
  if (restParams.query && (typeof restParams.query === 'object')) {
    restParams.query = restParams.query.fullText;
  }
  Rest.get(url, restParams)
    .end(function(err, res) {
      if (res.status === 400) {
        return Actions.logout();
      }
      if (err || !res.ok) {
        return action.failed(err, res.body || res.text, params);
      }
      action.completed(res.body, params);
    });
}

IndexActions.getItems.listen(function (params) {
  getItems('/rest/index/resources', params, this);
});

IndexActions.getAggregate.listen(function (params) {
  getItems('/rest/index/resources/aggregated', params, this);
});

module.exports = IndexActions;
