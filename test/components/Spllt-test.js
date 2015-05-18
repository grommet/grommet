// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/Split';

var ReactTestUtils = require('../mocks/ReactTestUtils');
var expect = require('expect');

describe('Grommet Split', function() {
  it('loads a basic Split', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, <h2>Split</h2>);

    ReactTestUtils.componentShouldExist(Component, 'split', 'Split');
  });

  it('loads a left Split', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, <h2>Split left</h2>, { flex: 'left' });

    ReactTestUtils.componentShouldExist(Component, 'split--flex-left', 'Split left');
  });

  it('loads a custom Split', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, <h2>Split Custom</h2>, { className: 'testing' });

    ReactTestUtils.componentShouldExist(Component, 'testing', 'Split Custom');
  });
});
