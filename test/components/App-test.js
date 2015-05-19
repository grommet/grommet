// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/App';

var GrommetTestUtils = require('../mocks/GrommetTestUtils');
var LoginForm = require('../../src/js/components/LoginForm');
var expect = require('expect');

describe('Grommet App', function() {
  it('loads App component with default configuration', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <h2>App</h2>, undefined);

    GrommetTestUtils.componentShouldExist(Component, 'app', 'App');
  });

  it('loads an inline App component', function() {
    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <h2>App Inline</h2>, { inline: true });

    GrommetTestUtils.componentShouldExist(Component, 'app--inline', 'App Inline');
  });

  it('loads a custom class App component', function() {

    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <h2>App Custom</h2>, { className: 'testing' });

    GrommetTestUtils.componentShouldExist(Component, 'testing', 'App Custom');
  });

  it('configures language at the App component and propates to children', function() {

    var React = require('react/addons');
    var Component = GrommetTestUtils.getComponent(__path__, <LoginForm />, { locales: 'pt-BR' });

    GrommetTestUtils.componentShouldExist(Component, 'login-form');
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var component = TestUtils.findRenderedDOMComponentWithClass(Component, 'call-to-action');
    expect(component.getDOMNode().value).toBe('Logar');
  });
});
