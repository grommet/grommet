// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');

var _data = {
  logo: null,
  title: null,
  background: null,
  copyright: null
};

function setup(args) {
  _data.logo = args.logo;
  _data.title = args.title;
  _data.background = args.background;
  _data.copyright = args.copyright;
}

var AppStore = _.extend({}, EventEmitter.prototype, {

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

      case Constants.ActionTypes.NAV_SETUP:
        setup(action.args);
        AppStore.emitChange();
        break;
    }
  })

});

module.exports = AppStore;
