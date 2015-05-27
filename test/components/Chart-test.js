// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/Chart';

var GrommetTestUtils = require('../mocks/GrommetTestUtils');
var expect = require('expect');

var testSeries = [
  {
    label: 'ascending',
    values: [[3,3], [2,2], [1,1]],
    colorIndex: "graph-1"
  },
  {
    label: 'descending',
    values: [[3,1], [2,2], [1,3]],
    colorIndex: "graph-2"
  },
  {
    label: 'peak',
    values: [[3,1], [2,2], [1,1]],
    colorIndex: "graph-3"
  }
];

var testXAxis = [
  {value: 1, label: 'one'},
  {value: 2, label: 'two'},
  {value: 3, label: 'three'}
];

describe('Grommet Chart', function() {
  it('loads an empty Chart', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      series: []
    });

    GrommetTestUtils.componentShouldExist(Component, 'chart');

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var linePaths = TestUtils.scryRenderedDOMComponentsWithClass(Component,
                      'chart__values-line');

    expect(linePaths.length).toBe(0);
  });

  it('loads a line Chart', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      series: testSeries
    });

    GrommetTestUtils.componentShouldExist(Component, 'chart');

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var linePaths = TestUtils.scryRenderedDOMComponentsWithClass(Component,
                      'chart__values-line');

    expect(linePaths.length).toBe(3);
  });

  it('loads a line Chart with threshold, min, max, small', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      series: testSeries,
      threshold: 1,
      min: 0,
      max: 10,
      small: true
    });

    GrommetTestUtils.componentShouldExist(Component, 'chart');

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var linePaths = TestUtils.scryRenderedDOMComponentsWithClass(Component,
                      'chart__threshold');

    expect(linePaths.length).toBe(1);
  });

  it('loads a line Chart with legend, xAxis, large, important', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      series: testSeries,
      legend: true,
      xAxis: testXAxis,
      large: true,
      important: 1
    });

    GrommetTestUtils.componentShouldExist(Component, 'chart');
    GrommetTestUtils.componentShouldExist(Component, 'chart__legend');

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var xAxis = TestUtils.scryRenderedDOMComponentsWithClass(Component,
                      'chart__xaxis-index');

    expect(xAxis.length).toBe(3);
  });

  it('loads an area Chart', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      series: testSeries,
      type: 'area'
    });

    GrommetTestUtils.componentShouldExist(Component, 'chart');

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var areaPaths = TestUtils.scryRenderedDOMComponentsWithClass(Component,
                      'chart__values-area');

    expect(areaPaths.length).toBe(3);
  });

  it('loads a smooth area Chart', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      series: testSeries,
      type: 'area',
      smooth: true
    });

    GrommetTestUtils.componentShouldExist(Component, 'chart');

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var areaPaths = TestUtils.scryRenderedDOMComponentsWithClass(Component,
                      'chart__values-area');

    expect(areaPaths.length).toBe(3);
  });

  it('loads a bar Chart', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      series: testSeries,
      type: 'bar'
    });

    GrommetTestUtils.componentShouldExist(Component, 'chart');

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var areaPaths = TestUtils.scryRenderedDOMComponentsWithClass(Component,
                      'chart__values-bar');

    expect(areaPaths.length).toBe(9);
  });
});
