// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');
var Api = require('../utils/Api');

module.exports = {

  setup: function (args) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.NAV_SETUP,
      args: args
    });
  },

  search: function (text) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.NAV_SEARCH,
      text: text
    });
    if (text && text.length > 0) {
      Api.get(Constants.ActionTypes.NAV_SEARCH_SUGGESTIONS_RESULT,
        '/rest/index/resources',
        {start: 0, count: 5, userQuery: text});
    }
  },

  routeChange: function (routerState) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.ROUTE_CHANGE,
      routerState: routerState
    });
  }

};
