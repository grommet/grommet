// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../../src/js/components/icons/Spinning');

var GrommetTestUtils = require('../../../src/utils/test/GrommetTestUtils');

describe('Grommet Spinning', function() {
  it('loads an spinning icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__);

    GrommetTestUtils.componentShouldExist(Component, 'icon-spinning');
  });

  it('loads a custom spinning icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { className: 'testing' });

    GrommetTestUtils.componentShouldExist(Component, 'testing');
  });

  it('loads a small spinning icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { small: true});

    GrommetTestUtils.componentShouldExist(Component, 'icon-spinning--small');
  });
});
