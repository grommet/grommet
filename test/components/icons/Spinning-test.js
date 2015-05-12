// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/icons/Spinning';

var ReactTestUtils = require('../../mocks/ReactTestUtils');

describe('Grommet Spinning', function() {
  it('loads an spinning icon', function() {
    var Component = ReactTestUtils.getComponent(__path__);

    ReactTestUtils.componentShouldExist(Component, 'icon-spinning');
  });

  it('loads a custom spinning icon', function() {
    var Component = ReactTestUtils.getComponent(__path__, null, { className: 'testing' });

    ReactTestUtils.componentShouldExist(Component, 'testing');
  });

  it('loads a small spinning icon', function() {
    var Component = ReactTestUtils.getComponent(__path__, null, { small: true});

    ReactTestUtils.componentShouldExist(Component, 'icon-spinning--small');
  });
});
