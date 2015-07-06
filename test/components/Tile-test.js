// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../src/js/components/Tile');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');

describe('Grommet Tile', function() {
  it('loads a basic Tile', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <div>Tile</div>);

    GrommetTestUtils.componentShouldExist(Component, 'tile', 'Tile');
  });

  it('loads a customized Tile', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <div>Customized Tile</div>,
      { status: 'ok', wide: true, selected: true, className: 'test' });

    GrommetTestUtils.componentShouldExist(Component, 'tile--status-ok', 'Customized Tile');
    GrommetTestUtils.componentShouldExist(Component, 'tile--wide', 'Customized Tile');
    GrommetTestUtils.componentShouldExist(Component, 'tile--selected', 'Customized Tile');
    GrommetTestUtils.componentShouldExist(Component, 'test', 'Customized Tile');
  });
});
