// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/icons/Up';

var GrommetTestUtils = require('../../mocks/GrommetTestUtils');

describe('Grommet Up', function() {
  it('loads an up icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__);

    GrommetTestUtils.componentShouldExist(Component, 'control-icon-up');
  });

  it('loads a custom up icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { className: 'testing' });

    GrommetTestUtils.componentShouldExist(Component, 'testing');
  });
});
