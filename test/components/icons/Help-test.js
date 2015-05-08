// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/icons/Help';

var ReactTestUtils = require('../../mocks/ReactTestUtils');

describe('Grommet Help', function() {
  it('loads an help icon', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__);

    ReactTestUtils.componentShouldExist(Component, 'control-icon-help');
  });

  it('loads a custom help icon', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, null, { className: 'testing' });

    ReactTestUtils.componentShouldExist(Component, 'testing');
  });
});