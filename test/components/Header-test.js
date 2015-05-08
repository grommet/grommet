// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/Header';

var ReactTestUtils = require('../mocks/ReactTestUtils');

describe('Grommet Header', function() {
  it('loads a basic Header', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, <h2>Header</h2>);

    ReactTestUtils.componentShouldExist(Component, 'header', 'Header');
  });
});