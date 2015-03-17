// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var Dispatcher = require('flux').Dispatcher;
var Constants = require('../constants/AppConstants');

var AppDispatcher = _.extend(new Dispatcher(), {

  handleServerAction: function(action) {
    var payload = {
      source: Constants.ActionSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  },

  handleViewAction: function(action) {
    var payload = {
      source: Constants.ActionSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }

});

module.exports = AppDispatcher;
