// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/App';

var ReactTestUtils = require('../mocks/ReactTestUtils');

describe('Grommet App', function() {
  it('loads App component with default configuration', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, <h2>App</h2>);

    ReactTestUtils.componentShouldExist(Component, 'app', 'App');
  });

  it('loads an inline App component', function() {
    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, <h2>App Inline</h2>, { inline: true });

    ReactTestUtils.componentShouldExist(Component, 'app--inline', 'App Inline');
  });

  it('loads a custom class App component', function() {

    var React = require('react/addons');
    var Component = ReactTestUtils.getComponent(__path__, <h2>App Custom</h2>, { className: 'testing' });

    ReactTestUtils.componentShouldExist(Component, 'testing', 'App Custom');
  });
});