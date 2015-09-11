// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var Reflux = require('reflux');

var Actions = Reflux.createActions({
  'configureFromLocation': {},
  'configure': {},
  'set': {},
  'clearConfiguration': {},
  'toggleNodeHighlight': {},
  'clearAllNodeHighlights': {},
  'toggleDataPathHighlight': {},
  'clearAllDataPathHighlights': {},
  'toggleNodeDataPathHighlight': {},
  'toggleCableHighlight': {},
  'clearAllHighlights': {}
});

module.exports = Actions;
