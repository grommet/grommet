// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/icons/DragHandle';

var ReactTestUtils = require('../../mocks/ReactTestUtils');

describe('Grommet DragHandle', function() {
  it('loads an drag-handle icon', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__);

    ReactTestUtils.componentShouldExist(Component, 'control-icon-drag-handle');
  });

  it('loads a custom drag-handle icon', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, null, { className: 'testing' });

    ReactTestUtils.componentShouldExist(Component, 'testing');
  });
});