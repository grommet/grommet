// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/Login';

var GrommetTestUtils = require('../mocks/GrommetTestUtils');

describe('Grommet Login', function() {
  it('loads a Login component with background', function(done) {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Component = GrommetTestUtils.getComponent(__path__, <h2>Login</h2>, {
      background: 'fake/path/to/image'
    });

    GrommetTestUtils.componentShouldExist(Component, 'login', 'Login');
    GrommetTestUtils.componentShouldExist(Component, 'login__background');

    var instance = TestUtils.findRenderedDOMComponentWithClass(Component, 'login');

    setTimeout(function() {
      React.unmountComponentAtNode(instance.getDOMNode().parentNode.parentNode);

      done();
    }, 350);
  });
});
