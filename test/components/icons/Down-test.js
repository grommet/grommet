// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/icons/Down';

var ReactTestUtils = require('../../mocks/ReactTestUtils');

describe('Grommet Down', function() {
  it('loads an down icon', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__);

    ReactTestUtils.componentShouldExist(Component, 'control-icon-down');
  });

  it('loads a custom down icon', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, null, { className: 'testing' });

    ReactTestUtils.componentShouldExist(Component, 'testing');
  });
});