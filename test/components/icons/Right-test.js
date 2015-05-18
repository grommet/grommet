// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/icons/Right';

var ReactTestUtils = require('../../mocks/ReactTestUtils');

describe('Grommet Right', function() {
  it('loads a right icon', function() {
    var Component = ReactTestUtils.getComponent(__path__);

    ReactTestUtils.componentShouldExist(Component, 'control-icon-right');
  });

  it('loads a custom right icon', function() {
    var Component = ReactTestUtils.getComponent(__path__, null, { className: 'testing' });

    ReactTestUtils.componentShouldExist(Component, 'testing');
  });
});
