var __path__ = '../../src/js/components/Dashboard';

var expect = require('expect');
var assert = require('assert');

describe('Grommet Dashboard', function() {
  it('loads a basic Dashboard', function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Dashboard = require(__path__);

    var Component = TestUtils.renderIntoDocument(<Dashboard><h2>Dashboard</h2></Dashboard>);

    var dashboardInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'dashboard');

    expect(dashboardInstance).toExist();
    assert.equal(dashboardInstance.getDOMNode().textContent, 'Dashboard');
  });
});