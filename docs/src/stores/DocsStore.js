// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var AppDispatcher = require('grommet/dispatchers/AppDispatcher');

var _data = {
  requestAccessError: null
};

var DocsStore = _.extend({}, EventEmitter.prototype, {

  requestAccessError: function() {
    return _data.requestAccessError !== null;
  },

  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {

      case Constants.ActionTypes.REQUEST_ACCESS:

        if (Constants.Request.SUCCESS === action.result) {
          _data.requestAccessError = null;
        } else if (Constants.Request.ERROR === action.result) {
          _data.requestAccessError = 'error';
        }
        DocsStore.emitChange();
        break;
    }
  })
});

module.exports = DocsStore;