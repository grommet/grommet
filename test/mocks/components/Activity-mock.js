// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var __path__ = '../../../src/js/components/index/Activity';

var rewire = require('rewire');

module.exports = {
  successActivity: function() {
    var ActivityMock = rewire(__path__);
    var Index = rewire('../../../src/js/components/index/Index.js');
    var IndexActions = require('./IndexActions-mock').successIndexAction();
    Index.__set__('IndexActions', IndexActions);
    ActivityMock.__set__('Index', Index);

    return ActivityMock;
  }
};
