// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var mirrorkey = require('mirrorkey');

module.exports = {

  CHANGE_EVENT: 'change',

  ActionTypes: mirrorkey({
    NAV_SETUP: null,
    NAV_SEARCH: null,
    NAV_SEARCH_SUGGESTIONS_RESULT: null,
    NAV_CHANGE: null,
    ROUTE_CHANGE: null,
    SESSION_SETUP: null,
    SESSION_LOGOUT: null,
    SESSION_LOGIN: null
  }),

  ActionSources: mirrorkey({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  Request: mirrorkey({
    SUCCESS: null,
    TIMEOUT: null,
    ERROR: null
  })

};
