// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../src/js/components/Search');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');

describe('Grommet Search', function() {
  it('loads a basic Search', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined);

    GrommetTestUtils.componentShouldExist(Component, 'search');
    GrommetTestUtils.componentShouldExist(Component, 'search--controlled');
    GrommetTestUtils.componentShouldExist(Component, 'search__control');
  });

  it('loads a custom class Search', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      className: 'test'
    });

    GrommetTestUtils.componentShouldExist(Component, 'search');
    GrommetTestUtils.componentShouldExist(Component, 'search--controlled');
    GrommetTestUtils.componentShouldExist(Component, 'search__control');
    GrommetTestUtils.componentShouldExist(Component, 'test');
  });

  it('loads a large Search', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      large: true
    });

    GrommetTestUtils.componentShouldExist(Component, 'search');
    GrommetTestUtils.componentShouldExist(Component, 'search--controlled');
    GrommetTestUtils.componentShouldExist(Component, 'search__control');
    GrommetTestUtils.componentShouldExist(Component, 'search--large');
  });

  it('loads an inline Search', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      inline: true
    });

    GrommetTestUtils.componentShouldExist(Component, 'search');
    GrommetTestUtils.componentShouldExist(Component, 'search--inline');
    GrommetTestUtils.componentShouldNotExist(Component, 'search__control');
    GrommetTestUtils.componentShouldExist(Component, 'search__input');
  });

});
