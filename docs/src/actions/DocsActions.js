// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var Reflux = require('reflux');
var Rest = require('grommet/utils/Rest');

var DocsActions = Reflux.createActions({
  'requestAccess': {asyncResult: true},
});

DocsActions.requestAccess.listen(function(data) {
  var thisAction = this;
  Rest.post('/rest/request-access', data)
    .end(function(err, res) {
      if (err) {
        return thisAction.failed(err, res.body);
      }
      if (!res.ok) {
        return thisAction.failed(err, res.body);
      }
      thisAction.completed();
    });
});

module.exports = DocsActions;
