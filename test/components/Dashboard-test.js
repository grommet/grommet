// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../src/js/components/Dashboard');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');

describe('Grommet Dashboard', function() {
  it('loads a basic Dashboard', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <h2>Dashboard</h2>);

    GrommetTestUtils.componentShouldExist(Component, 'dashboard', 'Dashboard');
  });
});
