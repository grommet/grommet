// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/LoginForm';

var ReactTestUtils = require('../mocks/ReactTestUtils');
var expect = require('expect');

describe('Grommet LoginForm', function() {
  it('loads a basic LoginForm component', function() {
    var Component = ReactTestUtils.getComponent(__path__);

    ReactTestUtils.componentShouldExist(Component, 'login-form');
  });

  it('submits a LoginForm with username and password', function(done) {
    var username = '';
    var password = '';

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;

    var LoginForm = require(__path__);
    var _onSubmit = function(data) {
      username = data.username;
      password = data.password;
    };

    var Component = TestUtils.renderIntoDocument(
      <LoginForm onSubmit={_onSubmit} />
    );

    ReactTestUtils.componentShouldExist(Component, 'login-form');

    var form = TestUtils.findRenderedDOMComponentWithTag(Component, 'form');
    Component.refs.username.getDOMNode().value = 'user';
    Component.refs.password.getDOMNode().value = '123';
    TestUtils.Simulate.submit(form);

    setTimeout(function() {
      expect(username).toBe('user');
      expect(password).toBe('123');
      done();
    }, 10);
  });
});
