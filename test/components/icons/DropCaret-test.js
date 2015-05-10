// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/icons/DropCaret';

var ReactTestUtils = require('../../mocks/ReactTestUtils');

describe('Grommet DropCaret', function() {
  it('loads an drop-caret icon', function() {
    require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__);

    ReactTestUtils.componentShouldExist(Component, 'control-icon-drop-caret');
  });

  it('loads a custom drop-caret icon', function() {
    require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, null, { className: 'testing' });

    ReactTestUtils.componentShouldExist(Component, 'testing');
  });
});
