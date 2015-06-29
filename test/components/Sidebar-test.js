// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../src/js/components/Sidebar');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');

describe('Grommet Sidebar', function() {
  it('loads a basic Sidebar', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <h2>Sidebar</h2>);

    GrommetTestUtils.componentShouldExist(Component, 'sidebar', 'Sidebar');
  });

  it('loads a primary Sidebar', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <h2>Sidebar Primary</h2>, { primary: true });

    GrommetTestUtils.componentShouldExist(Component, 'sidebar--primary', 'Sidebar Primary');
  });

  it('loads a custom Sidebar', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <h2>Sidebar Custom</h2>, { className: 'testing' });

    GrommetTestUtils.componentShouldExist(Component, 'testing', 'Sidebar Custom');
  });
});
