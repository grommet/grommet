// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/index/Alert';

var GrommetTestUtils = require('../../mocks/GrommetTestUtils');

describe('Grommet Alert', function() {
  it('loads a basic Alert component', function() {

    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      resource: {
        name: 'network',
        status: 'error'
      }
    });

    GrommetTestUtils.componentShouldExist(Component, 'alert');
  });
});
