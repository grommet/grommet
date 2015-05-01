// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.
var Reflux = require('reflux');
var DocsActions = require('../actions/DocsActions');

var DocsStore = Reflux.createStore({

  _data: {
    requestAccessError: null
  },

  init: function () {
    this.listenTo(DocsActions.requestAccess.completed, this._onRequestAccessCompleted);
    this.listenTo(DocsActions.requestAccess.failed, this._onRequestAccessFailed);
  },

  _onRequestAccessCompleted: function () {
    this._data.requestAccessError = null;
    this.trigger(this._data);
  },

  _onRequestAccessFailed: function () {
    this._data.requestAccessError = 'error';
    this.trigger(this._data);
  },

  requestAccessError: function() {
    return this._data.requestAccessError !== null;
  }
});

module.exports = DocsStore;
