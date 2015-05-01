// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var Reflux = require('reflux');
var Rest = require('../utils/Rest');

var Actions = Reflux.createActions({
  // Session
  'login': {asyncResult: true},
  'logout': {}
});

Actions.login.listen(function(username, password) {
  var thisAction = this;
  Rest.post('/rest/login-sessions',
    {authLoginDomain: 'LOCAL', userName: username, password: password, loginMsgAck: true})
    .end(function(err, res) {
      if (err) {
        return thisAction.failed(err, res.body);
      }
      if (!res.ok) {
        return thisAction.failed(err, res.body);
      }
      thisAction.completed(username, res.body.sessionID);
    });
});

module.exports = Actions;
