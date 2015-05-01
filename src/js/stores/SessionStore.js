// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var Cookies = require('../utils/Cookies');

var TOKEN = "token";
var USER = "user";
var LOGIN_TIME = "loginTime";
var EMAIL = "email";

var SessionStore = Reflux.createStore({

  _data: {
    id: null,
    name: null,
    created: null,
    email: null,
    loginError: null // {message: , resolution: }
  },

  init: function () {
    this._data.id = Cookies.get(TOKEN);
    this._data.name = Cookies.get(USER);
    this._data.created = Cookies.get(LOGIN_TIME);
    this._data.email = Cookies.get(EMAIL);

    this.listenTo(Actions.login.completed, this._onLoginCompleted);
    this.listenTo(Actions.login.failed, this._onLoginFailed);
    this.listenTo(Actions.logout, this._onLogout);
  },

  _onLoginCompleted: function (username, id) {
    this._data.id = id;
    this._data.name = username;
    this._data.created = new Date();
    this._data.loginError = null;
    if (username.indexOf('@') !== -1) {
      this._data.email = username;
    }
    Cookies.set(TOKEN, this._data.id);
    Cookies.set(USER, this._data.name);
    Cookies.set(LOGIN_TIME, this._data.created);
    Cookies.set(EMAIL, this._data.email);
    this.trigger(this._data);
  },

  _onLoginFailed: function (error, response) {
    this._data.loginError = {
      message: response.message,
      resolution: response.resolution
    };
    this.trigger(this._data);
  },

  _onLogout: function () {
    this._data.id = null;
    this._data.name = null;
    this._data.created = null;
    this._data.email = null;
    Cookies.remove(TOKEN);
    Cookies.remove(USER);
    Cookies.remove(LOGIN_TIME);
    Cookies.remove(EMAIL);
    this.trigger(this._data);
  },

  getInitialState: function () {
    return this._data;
  }
});

module.exports = SessionStore;
