// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../../src/js/components/icons/Right');

var GrommetTestUtils = require('../../../src/utils/test/GrommetTestUtils');

describe('Grommet Right', function() {
  it('loads a right icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__);

    GrommetTestUtils.componentShouldExist(Component, 'control-icon-right');
  });

  it('loads a custom right icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { className: 'testing' });

    GrommetTestUtils.componentShouldExist(Component, 'testing');
  });
});
