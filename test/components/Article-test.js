// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../src/js/components/Article');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');

describe('Grommet Article', function() {
  it('loads a basic Article', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <h2>Article</h2>);

    GrommetTestUtils.componentShouldExist(Component, 'article', 'Article');
  });
});
