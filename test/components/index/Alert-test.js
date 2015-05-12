// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/index/Alert';

var ReactTestUtils = require('../../mocks/ReactTestUtils');

describe('Grommet Alert', function() {
  it('loads a basic Alert component', function() {

    var Component = ReactTestUtils.getComponent(__path__, undefined, {
      resource: {
        name: 'network',
        status: 'error'
      }
    });

    ReactTestUtils.componentShouldExist(Component, 'alert');
  });
});
