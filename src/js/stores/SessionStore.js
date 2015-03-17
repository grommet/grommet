// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var Cookies = require('cookies-js');

var TOKEN = "token";
var USER = "user";
var LOGIN_TIME = "loginTime";
var EMAIL = "email";

var _data = {
  id: null,
  name: null,
  created: null,
  email: null,
  loginError: null // {message: , resolution: }
};

function setup () {
  _data.id = Cookies.get(TOKEN);
  _data.name = Cookies.get(USER);
  _data.created = Cookies.get(LOGIN_TIME);
  _data.email = Cookies.get(EMAIL) || 'eric.soderberg@hp.com';
}

function login(username, id) {
  _data.id = id;
  _data.name = username;
  _data.created = new Date();
  _data.loginError = null;
  if (username.indexOf('@') !== -1) {
    _data.email = username;
  }
  Cookies.set(TOKEN, _data.id);
  Cookies.set(USER, _data.name);
  Cookies.set(LOGIN_TIME, _data.created);
  Cookies.set(EMAIL, _data.email);
}

function setLoginError(message, resolution) {
  _data.loginError = {
    message: message,
    resolution: resolution
  };
}

function logout() {
  _data.id = null;
  _data.name = null;
  _data.created = null;
  Cookies.expire(TOKEN);
  Cookies.expire(USER);
  Cookies.expire(LOGIN_TIME);
}

var SessionStore = _.extend({}, EventEmitter.prototype, {

  // public methods used by Controller-View to operate on data
  getAll: function() {
    return _data;
  },

  // Allow Controller-View to register itself with store
  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },
  // triggers change listener above, firing controller-view callback
  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {

      case Constants.ActionTypes.SESSION_SETUP:
        setup();
        SessionStore.emitChange();
        break;

      case Constants.ActionTypes.SESSION_LOGOUT:
        logout();
        SessionStore.emitChange();
        break;

      case Constants.ActionTypes.SESSION_LOGIN:
        if (Constants.Request.SUCCESS === action.result) {
          login(action.context.username, action.response.sessionID);
        } else if (Constants.Request.ERROR === action.result) {
          setLoginError(action.response.message, action.response.recommendedActions);
        }
        SessionStore.emitChange();
        break;

    }
  })

});

module.exports = SessionStore;
