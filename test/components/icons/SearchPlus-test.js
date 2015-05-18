// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/icons/SearchPlus';

var GrommetTestUtils = require('../../mocks/GrommetTestUtils');

describe('Grommet SearchPlus', function() {
  it('loads an search-plus icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__);

    GrommetTestUtils.componentShouldExist(Component, 'control-icon-search-plus');
  });

  it('loads a custom search-plus icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { className: 'testing' });

    GrommetTestUtils.componentShouldExist(Component, 'testing');
  });
});
