// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var AppDispatcher = require('../../dispatchers/AppDispatcher');
var Constants = require('../constants/IndexConstants');

module.exports = {

  setup: function (config) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.DASHBOARD_SETUP,
      config: config
    });
  },

  startChanging: function () {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.DASHBOARD_START_CHANGING
    });
  },

  commitChanges: function () {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.DASHBOARD_COMMIT_CHANGES
    });
  },

  abandonChanges: function () {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.DASHBOARD_ABANDON_CHANGES
    });
  },

  addPanel: function (panel) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.DASHBOARD_ADD_PANEL,
      panel: panel
    });
  },

  removePanel: function (panel) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.DASHBOARD_REMOVE_PANEL,
      panel: panel
    });
  },

  editPanel: function (panel) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.DASHBOARD_EDIT_PANEL,
      panel: panel
    });
  },

  updatePanel: function (index) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.DASHBOARD_UPDATE_PANEL,
      index: index
    });
  },

  orderPanels: function (panels) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.DASHBOARD_ORDER_PANELS,
      panels: panels
    });
  }

};
