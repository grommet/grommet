// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/icons/Search';

var GrommetTestUtils = require('../../mocks/GrommetTestUtils');

describe('Grommet Search', function() {
  it('loads an search icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__);

    GrommetTestUtils.componentShouldExist(Component, 'control-icon-search');
  });

  it('loads a custom search icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { className: 'testing' });

    GrommetTestUtils.componentShouldExist(Component, 'testing');
  });
});
