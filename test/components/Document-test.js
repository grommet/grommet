// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../src/js/components/Document');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');

describe('Grommet Document', function() {
  it('loads a basic Document', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <h2>Document</h2>);

    GrommetTestUtils.componentShouldExist(Component, 'document', 'Document');
  });
});
