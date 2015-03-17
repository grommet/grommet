// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var mirrorkey = require('mirrorkey');

module.exports = {

  ActionTypes: mirrorkey({
    INDEX_SET_CONTEXT: null,
    INDEX_SET_PARAMS: null,
    INDEX_RESULT: null,
    INDEX_SEARCH_ATTRIBUTE: null,
    INDEX_START_CHANGING: null,
    INDEX_COMMIT_CHANGES: null,
    INDEX_ABANDON_CHANGES: null,
    INDEX_SET_VIEW: null,
    INDEX_SET_SEARCH_MODE: null,
    INDEX_UPDATE_ATTRIBUTE: null,
    INDEX_MOVE_ATTRIBUTE: null,
    INDEX_RESOURCE_ACTIVITY_RESULT: null,
    INDEX_AGGREGATE_RESULT: null,
    INDEX_TREES_AGGREGATED_RESULT: null,

    RESOURCE_SETUP: null,
    RESOURCE_RESULT: null,
    RESOURCE_ACTION: null,

    DASHBOARD_SETUP: null,
    DASHBOARD_START_CHANGING: null,
    DASHBOARD_COMMIT_CHANGES: null,
    DASHBOARD_ABANDON_CHANGES: null,
    DASHBOARD_ADD_PANEL: null,
    DASHBOARD_REMOVE_PANEL: null,
    DASHBOARD_EDIT_PANEL: null,
    DASHBOARD_UPDATE_PANEL: null,
    DASHBOARD_ORDER_PANELS: null
  })

};
