// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/icons/More';

var GrommetTestUtils = require('../../mocks/GrommetTestUtils');

describe('Grommet More', function() {
  it('loads an more icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__);

    GrommetTestUtils.componentShouldExist(Component, 'control-icon-more');
  });

  it('loads a custom more icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { className: 'testing' });

    GrommetTestUtils.componentShouldExist(Component, 'testing');
  });
});
