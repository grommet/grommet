// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/icons/Edit';

var ReactTestUtils = require('../../mocks/ReactTestUtils');

describe('Grommet Edit', function() {
  it('loads an edit icon', function() {
    var Component = ReactTestUtils.getComponent(__path__);

    ReactTestUtils.componentShouldExist(Component, 'control-icon-edit');
  });

  it('loads a custom edit icon', function() {
    var Component = ReactTestUtils.getComponent(__path__, null, { className: 'testing' });

    ReactTestUtils.componentShouldExist(Component, 'testing');
  });
});
