// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/icons/Previous';

var ReactTestUtils = require('../../mocks/ReactTestUtils');

describe('Grommet Previous', function() {
  it('loads an previous icon', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__);

    ReactTestUtils.componentShouldExist(Component, 'control-icon-previous');
  });

  it('loads a custom previous icon', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, null, { className: 'testing' });

    ReactTestUtils.componentShouldExist(Component, 'testing');
  });
});