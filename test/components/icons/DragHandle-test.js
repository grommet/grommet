// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../../src/js/components/icons/DragHandle');

var GrommetTestUtils = require('../../../src/utils/test/GrommetTestUtils');

describe('Grommet DragHandle', function() {
  it('loads an drag-handle icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__);

    GrommetTestUtils.componentShouldExist(Component, 'control-icon-drag-handle');
  });

  it('loads a custom drag-handle icon', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { className: 'testing' });

    GrommetTestUtils.componentShouldExist(Component, 'testing');
  });
});
