// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../src/js/components/List');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');

describe('Grommet List', function() {
  it('loads a basic List', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null,
      {data: [{uid: 1, name: 'a'}],
        schema: [{attribute: 'uid', uid: true}, {attribute: 'name', primary: true}]});

    GrommetTestUtils.componentShouldExist(Component, 'list');
  });

  it('loads a customized List', function() {
    var Component = GrommetTestUtils.getComponent(__path__, null,
      { small: true, className: 'test',
        data: [{uid: 1, name: 'a'}],
        schema: [{attribute: 'uid', uid: true}, {attribute: 'name', primary: true}]});

    GrommetTestUtils.componentShouldExist(Component, 'list--small');
    GrommetTestUtils.componentShouldExist(Component, 'test');
  });
});
