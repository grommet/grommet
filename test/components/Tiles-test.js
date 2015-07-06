// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../src/js/components/Tiles');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');

describe('Grommet Tiles', function() {
  it('loads a basic Tiles', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <div>Tiles</div>);

    GrommetTestUtils.componentShouldExist(Component, 'tiles', 'Tiles');
  });

  it('loads a customized Tiles', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <div>Customized Tiles</div>,
      { fill: true, flush: true, small: true, className: 'test' });

    GrommetTestUtils.componentShouldExist(Component, 'tiles--fill', 'Customized Tiles');
    GrommetTestUtils.componentShouldExist(Component, 'tiles--flush', 'Customized Tiles');
    GrommetTestUtils.componentShouldExist(Component, 'tiles--small', 'Customized Tiles');
    GrommetTestUtils.componentShouldExist(Component, 'test', 'Customized Tiles');
  });
});
