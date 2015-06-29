// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../src/js/components/Split');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');

describe('Grommet Split', function() {
  it('loads a basic Split', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <h2>Split</h2>);

    GrommetTestUtils.componentShouldExist(Component, 'split', 'Split');
  });

  it('loads a left Split', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <h2>Split left</h2>, { flex: 'left' });

    GrommetTestUtils.componentShouldExist(Component, 'split--flex-left', 'Split left');
  });

  it('loads a custom Split', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <h2>Split Custom</h2>, { className: 'testing' });

    GrommetTestUtils.componentShouldExist(Component, 'testing', 'Split Custom');
  });
});
