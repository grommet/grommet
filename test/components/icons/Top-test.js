// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/icons/Top';

var GrommetTestUtils = require('../../mocks/GrommetTestUtils');

describe('Grommet Top', function() {
  it('loads an top icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__);

    GrommetTestUtils.componentShouldExist(Component, 'control-icon-top');
  });

  it('loads a custom top icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { className: 'testing' });

    GrommetTestUtils.componentShouldExist(Component, 'testing');
  });
});
