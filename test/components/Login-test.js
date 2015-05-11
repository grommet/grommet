// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/Login';

var ReactTestUtils = require('../mocks/ReactTestUtils');

describe('Grommet Login', function() {
  it('loads a Login component with background', function(done) {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Component = ReactTestUtils.getComponent(__path__, <h2>Login</h2>, {
      background: 'fake/path/to/image'
    });

    ReactTestUtils.componentShouldExist(Component, 'login', 'Login');
    ReactTestUtils.componentShouldExist(Component, 'login__background');

    var instance = TestUtils.findRenderedDOMComponentWithClass(Component, 'login');

    setTimeout(function() {
      React.unmountComponentAtNode(instance.getDOMNode().parentNode.parentNode);

      done();
    }, 350);
  });
});
