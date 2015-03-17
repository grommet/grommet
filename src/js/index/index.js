// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var IndexRouter = require('./utils/IndexRouter');

module.exports = {
  // Components
  Activity: require('./components/Activity'),
  ActivityResource: require('./components/ActivityResource'),
  Dashboard: require('./components/Dashboard'),
  DashboardEdit: require('./components/DashboardEdit'),
  DashboardPanelAdd: require('./components/DashboardPanelAdd'),
  DashboardPanelEdit: require('./components/DashboardPanelEdit'),
  DashboardPanelEditGuided: require('./components/DashboardPanelEditGuided'),
  DashboardPanelEditRaw: require('./components/DashboardPanelEditRaw'),
  Index: require('./components/Index'),
  IndexEdit: require('./components/IndexEdit'),
  Resource: require('./components/Resource'),
  // Constants
  IndexConstants: require('./constants/IndexConstants'),
  // Actions
  DashboardActions: require('./actions/DashboardActions'),
  IndexActions: require('./actions/IndexActions'),
  ResourceActions: require('./actions/ResourceActions'),
  // Stores
  DashboardStore: require('./stores/DashboardStore'),
  IndexStore: require('./stores/IndexStore'),
  ResourceStore: require('./stores/ResourceStore'),
  // Utils
  IndexRouter: IndexRouter,

  init: function (options) {
    IndexRouter.init(options);
  }
};
