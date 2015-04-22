// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');
var Api = require('../utils/Api');

module.exports = {

  setup: function () {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.SESSION_SETUP
    });
  },

  logout: function () {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.SESSION_LOGOUT
    });
    Api.del(Constants.ActionTypes.SESSION_LOGOUT, '/rest/login-sessions');
  },

  login: function (username, password) {
    Api.post(Constants.ActionTypes.SESSION_LOGIN, '/rest/login-sessions',
      {authLoginDomain: 'LOCAL', userName: username, password: password, loginMsgAck: true},
      {username: username});
  }

};
