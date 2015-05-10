// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/icons/More';

var ReactTestUtils = require('../../mocks/ReactTestUtils');

describe('Grommet More', function() {
  it('loads an more icon', function() {
    require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__);

    ReactTestUtils.componentShouldExist(Component, 'control-icon-more');
  });

  it('loads a custom more icon', function() {
    require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, null, { className: 'testing' });

    ReactTestUtils.componentShouldExist(Component, 'testing');
  });
});
