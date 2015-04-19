// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var mirrorkey = require('mirrorkey');

module.exports = {

  CHANGE_EVENT: 'change',

  ActionTypes: mirrorkey({
    REQUEST_ACCESS: null
  }),

  Request: mirrorkey({
    SUCCESS: null,
    TIMEOUT: null,
    ERROR: null
  })
};