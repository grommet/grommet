var __path__ = '../../src/js/components/App';

var expect = require('expect');
var assert = require('assert');

describe('Grommet App', function() {
  it('loads App component with default configuration', function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var App = require(__path__);

    var Component = TestUtils.renderIntoDocument(<App><h2>App</h2></App>);

    var appInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'app');

    expect(appInstance).toExist();
    assert.equal(appInstance.getDOMNode().textContent, 'App');
  });

  it('loads an inline App component', function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var App = require(__path__);

    var Component = TestUtils.renderIntoDocument(<App inline={true}><h2>App Inline</h2></App>);

    var appInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'app--inline');

    expect(appInstance).toExist();
    assert.equal(appInstance.getDOMNode().textContent, 'App Inline');
  });

  it('loads a custom class App component', function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var App = require(__path__);

    var Component = TestUtils.renderIntoDocument(<App className='app--custom'><h2>App Custom</h2></App>);

    var appInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'app--custom');

    expect(appInstance).toExist();
    assert.equal(appInstance.getDOMNode().textContent, 'App Custom');
  });
});