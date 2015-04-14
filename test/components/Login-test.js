var __path__ = '../../src/js/components/Login.js';

jest.dontMock(__path__);

describe('Login', function() {
  it('sets class name', function() {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;

    var Login = require(__path__);
    var config = {
      title: 'Login test'
    };
    var Component = TestUtils.renderIntoDocument(<Login app={config}></Login>);

    var element = TestUtils.findRenderedDOMComponentWithClass(Component, 'login__form');
    expect(element).toBeDefined();
  });
});
