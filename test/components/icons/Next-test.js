// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/icons/Next';

var ReactTestUtils = require('../../mocks/ReactTestUtils');

describe('Grommet Next', function() {
  it('loads an next icon', function() {
    require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__);

    ReactTestUtils.componentShouldExist(Component, 'control-icon-next');
  });

  it('loads a custom next icon', function() {
    require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, null, { className: 'testing' });

    ReactTestUtils.componentShouldExist(Component, 'testing');
  });
});
