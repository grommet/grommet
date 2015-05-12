// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/icons/Top';

var ReactTestUtils = require('../../mocks/ReactTestUtils');

describe('Grommet Top', function() {
  it('loads an top icon', function() {
    var Component = ReactTestUtils.getComponent(__path__);

    ReactTestUtils.componentShouldExist(Component, 'control-icon-top');
  });

  it('loads a custom top icon', function() {
    var Component = ReactTestUtils.getComponent(__path__, null, { className: 'testing' });

    ReactTestUtils.componentShouldExist(Component, 'testing');
  });
});
