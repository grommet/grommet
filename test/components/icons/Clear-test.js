// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../../src/js/components/icons/Clear');

var GrommetTestUtils = require('../../../src/utils/test/GrommetTestUtils');

describe('Grommet Clear', function() {
  it('loads an clear icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__);

    GrommetTestUtils.componentShouldExist(Component, 'control-icon-clear');
  });

  it('loads a custom clear icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { className: 'testing' });

    GrommetTestUtils.componentShouldExist(Component, 'testing');
  });
});
