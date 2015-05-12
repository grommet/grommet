// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/icons/Filter';

var ReactTestUtils = require('../../mocks/ReactTestUtils');

describe('Grommet Filter', function() {
  it('loads an filter icon', function() {
    var Component = ReactTestUtils.getComponent(__path__);

    ReactTestUtils.componentShouldExist(Component, 'control-icon-filter');
  });

  it('loads a custom filter icon', function() {
    var Component = ReactTestUtils.getComponent(__path__, null, { className: 'testing' });

    ReactTestUtils.componentShouldExist(Component, 'testing');
  });
});
