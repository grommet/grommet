// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../src/js/components/Anchor');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');

describe('Grommet Anchor', function() {
  it('loads a basic Anchor', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null, { href: 'test'});

    GrommetTestUtils.componentShouldExist(Component, 'anchor');
    GrommetTestUtils.componentShouldExist(Component, 'anchor--disabled');
  });

  it('loads a primary Anchor', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null,
      { href: 'test', primary: true});

    GrommetTestUtils.componentShouldExist(Component, 'anchor');
    GrommetTestUtils.componentShouldExist(Component, 'anchor--primary');
  });

  it('loads a custom className Anchor', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null,
      { className: 'testing', href: 'test'});

    GrommetTestUtils.componentShouldExist(Component, 'testing');
  });
});
