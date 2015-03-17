// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var AppDispatcher = require('../../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/IndexConstants');
var Search = require('../utils/Search');

var _persistentState = {}; // panels

var _data = {
  panels: [], // what the Dashboard shows
  availablePanels: [], // what adding a panel picks from
  pendingPanels: null, // what DashboardEdit is working on
  pendingPanel: null, // what DashboardPanelEdit is working on
  categories: [] // for editing panel category
};

// add private functions to modify data
function setup(config) {
  _persistentState = JSON.parse(localStorage.getItem('DashboardStore__state') || '{}');
  _data = _.extend(_data, config);
  _data.panels = _persistentState.panels || _data.panels;
  _data.panels.forEach(function (panel) {
    panel.counts = [];
    if (panel.params.search) {
      panel.params.search = Search.create(panel.params.search);
    }
  });
  _data.availablePanels.forEach(function (panel) {
    panel.counts = [];
    if (panel.params.search) {
      panel.params.search = Search.create(panel.params.search);
    }
  });
}

function setupCategories(menu) {
  _data.categories = [];
  menu.forEach(function (section) {
    return section.forEach(function (page) {
      if (page.category) {
        if (Array.isArray(page.category)) {
          _data.categories = _data.categories.concat(page.category);
        } else {
          _data.categories.push(page.category);
        }
      }
    });
  });
}

function setAggregateResult(result, params) {
  if (_data.pendingPanels) {
    _data.pendingPanels.some(function (panel) {
      if (params.context === panel.name) {
        panel.aggregateResult = result[0];
        return true;
      }
    });
    _data.availablePanels.some(function (panel) {
      if (params.context === panel.name) {
        panel.aggregateResult = result[0];
        return true;
      }
    });
  } else {
    _data.panels.some(function (panel) {
      if (params.context === panel.name) {
        panel.aggregateResult = result[0];
        return true;
      }
    });
  }
}

function startChanging() {
  _data.pendingPanels = _data.panels.slice(0);
}

function commitChanges() {
  _data.panels = _data.pendingPanels;
  _data.pendingPanels = null;
  _data.pendingPanel = null;
  _persistentState.panels = _data.panels;
  localStorage.setItem('DashboardStore__state', JSON.stringify(_persistentState));
}

function abandonChanges() {
  _data.pendingPanels = null;
  _data.pendingPanel = null;
}

function panelIndex(array, panel) {
  return _.findIndex(array, function(p) {
    return p.name === panel.name;
  });
}

function addPanel(panel) {
  _data.pendingPanels.push(panel);
}

function removePanel(panel) {
  var index = panelIndex(_data.panels, panel);
  if (index !== -1) {
    _data.pendingPanels.splice(index, 1);
  }
}

function editPanel(arg) {
  if (typeof arg === 'string') {
    var text = arg;
    _data.pendingPanel.text = text;
    try {
      var config = JSON.parse(text);
      _data.pendingPanel.config = config;
      _data.pendingPanel.error = null;
    } catch (e) {
      _data.pendingPanel.error = e.message;
    }
  } else {
    var panel = arg;
    _data.pendingPanel = {
      config: _.extend({}, panel),
      text: JSON.stringify(panel, undefined, 2),
      error: null
    };
    _data.pendingPanel.config.params.search =
      Search.create(_data.pendingPanel.config.params.search);
    delete _data.pendingPanel.config.counts;
  }
}

function updatePanel(index) {
  if (index !== -1 && _data.pendingPanel) {
    _data.pendingPanels[index] = _data.pendingPanel.config;
  }
  _data.pendingPanel = null;
}

function orderPanels(panels) {
  _data.pendingPanels = panels;
}

var DashboardStore = _.extend({}, EventEmitter.prototype, {

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

      case Constants.ActionTypes.DASHBOARD_SETUP:
        setup(action.config);
        DashboardStore.emitChange();
        break;

      case Constants.ActionTypes.NAV_SETUP:
        setupCategories(action.args.menu);
        break;

      case Constants.ActionTypes.INDEX_AGGREGATE_RESULT:
        setAggregateResult(action.response, action.context);
        DashboardStore.emitChange();
        break;

      case Constants.ActionTypes.DASHBOARD_START_CHANGING:
        startChanging();
        DashboardStore.emitChange();
        break;

      case Constants.ActionTypes.DASHBOARD_COMMIT_CHANGES:
        commitChanges();
        DashboardStore.emitChange();
        break;

      case Constants.ActionTypes.DASHBOARD_ABANDON_CHANGES:
        abandonChanges();
        DashboardStore.emitChange();
        break;

      case Constants.ActionTypes.DASHBOARD_ADD_PANEL:
        addPanel(action.panel);
        DashboardStore.emitChange();
        break;

      case Constants.ActionTypes.DASHBOARD_REMOVE_PANEL:
        removePanel(action.panel);
        DashboardStore.emitChange();
        break;

      case Constants.ActionTypes.DASHBOARD_EDIT_PANEL:
        editPanel(action.panel);
        DashboardStore.emitChange();
        break;

      case Constants.ActionTypes.DASHBOARD_UPDATE_PANEL:
        updatePanel(action.index);
        DashboardStore.emitChange();
        break;

      case Constants.ActionTypes.DASHBOARD_ORDER_PANELS:
        orderPanels(action.panels);
        DashboardStore.emitChange();
        break;
    }
  })

});

module.exports = DashboardStore;
