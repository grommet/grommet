// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/Chart';

var ReactTestUtils = require('../mocks/ReactTestUtils');
var expect = require('expect');

var testSeries = [
  {
    label: 'first',
    values: [[5,2], [4,3], [3,3], [2,2], [1,1]],
    colorIndex: "graph-1"
  },
  {
    label: 'second',
    values: [[5,3], [4,2], [3,0], [2,0], [1,0]],
    colorIndex: "graph-2"
  }
];

describe('Grommet Chart', function() {
  it('loads a basic line Chart component', function() {
    var Component = ReactTestUtils.getComponent(__path__, undefined, {
      series: testSeries
    });

    ReactTestUtils.componentShouldExist(Component, 'chart');

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var linePaths = TestUtils.scryRenderedDOMComponentsWithClass(Component,
                      'chart__values-line');

    expect(linePaths.length).toBe(2);
  });

  it('loads a basic line Chart component with threshold', function() {
    var Component = ReactTestUtils.getComponent(__path__, undefined, {
      series: testSeries,
      threshold: 1
    });

    ReactTestUtils.componentShouldExist(Component, 'chart');

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var linePaths = TestUtils.scryRenderedDOMComponentsWithClass(Component,
                      'chart__threshold');

    expect(linePaths.length).toBe(1);
  });

  it('loads a basic line Chart component with legend', function() {
    var Component = ReactTestUtils.getComponent(__path__, undefined, {
      series: testSeries,
      legend: true,
      xAxis: ['one', 'two']
    });

    ReactTestUtils.componentShouldExist(Component, 'chart');
    ReactTestUtils.componentShouldExist(Component, 'chart__legend');

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var xAxis = TestUtils.scryRenderedDOMComponentsWithClass(Component,
                      'chart__xaxis-index');

    expect(xAxis.length).toBe(5);
  });

  it('loads a basic area Chart component', function() {
    var Component = ReactTestUtils.getComponent(__path__, undefined, {
      series: testSeries,
      type: 'area'
    });

    ReactTestUtils.componentShouldExist(Component, 'chart');

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var areaPaths = TestUtils.scryRenderedDOMComponentsWithClass(Component,
                      'chart__values-area');

    expect(areaPaths.length).toBe(2);
  });

  it('loads a basic bar Chart component', function() {
    var Component = ReactTestUtils.getComponent(__path__, undefined, {
      series: testSeries,
      type: 'bar'
    });

    ReactTestUtils.componentShouldExist(Component, 'chart');

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var areaPaths = TestUtils.scryRenderedDOMComponentsWithClass(Component,
                      'chart__values-bar');

    expect(areaPaths.length).toBe(10);
  });
});
