// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/Sidebar';

var ReactTestUtils = require('../mocks/ReactTestUtils');
var expect = require('expect');

describe('Grommet Sidebar', function() {
  it('loads a basic Sidebar', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, <h2>Sidebar</h2>);

    ReactTestUtils.componentShouldExist(Component, 'sidebar', 'Sidebar');
  });

  it('loads a primary Sidebar', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, <h2>Sidebar Primary</h2>, { primary: true });

    ReactTestUtils.componentShouldExist(Component, 'sidebar--primary', 'Sidebar Primary');
  });

  it('loads a custom Sidebar', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, <h2>Sidebar Custom</h2>, { className: 'testing' });

    ReactTestUtils.componentShouldExist(Component, 'testing', 'Sidebar Custom');
  });
});
