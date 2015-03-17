// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var AppDispatcher = require('../../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/IndexConstants');

var _data = {
  category: null,
  uri: null,
  response: null,
  activity: {},
  treesAggregated: {}
};

// add private functions to modify data
function setup(uri, category) {
  _data.category = category;
  _data.uri = uri;
  _data.response = null;
}

function setResult(result) {
  _data.response = result;
}

function setActivityResult(uri, result) {
  if (uri === _data.uri) {
    _data.activity = result;
  }
}

function setTreesAggregatedResult(uri, result) {
  if (uri === _data.uri) {
    _data.treesAggregated = result;
  }
}

function setActionResult(result) {
  _data.task.uri = result.taskUri;
}

var ResourceStore = _.extend({}, EventEmitter.prototype, {

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

      case Constants.ActionTypes.RESOURCE_SETUP:
        setup(action.uri, action.category);
        ResourceStore.emitChange();
        break;

      case Constants.ActionTypes.RESOURCE_RESULT:
        setResult(action.response);
        ResourceStore.emitChange();
        break;

      case Constants.ActionTypes.INDEX_RESOURCE_ACTIVITY_RESULT:
        setActivityResult(action.context, action.response);
        ResourceStore.emitChange();
        break;

      case Constants.ActionTypes.INDEX_TREES_AGGREGATED_RESULT:
        setTreesAggregatedResult(action.context, action.response);
        ResourceStore.emitChange();
        break;

      case Constants.ActionTypes.RESOURCE_ACTION:
        setActionResult(action.response);
        ResourceStore.emitChange();
        break;

    }
  })

});

module.exports = ResourceStore;
