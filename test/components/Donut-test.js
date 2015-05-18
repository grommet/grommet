// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/Donut';

var GrommetTestUtils = require('../mocks/GrommetTestUtils');
var expect = require('expect');

var testSeries = [
  {label: 'Error', value: 10, colorIndex: 'error'},
  {label: 'Warning', value: 20, colorIndex: 'warning'},
  {label: 'OK', value: 70, colorIndex: 'ok'}
];

describe('Grommet Donut', function() {
  it('loads a basic Donut component', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      series: testSeries
    });

    GrommetTestUtils.componentShouldExist(Component, 'donut');

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var slicePaths = TestUtils.scryRenderedDOMComponentsWithClass(Component,
                      'donut__slice');

    expect(slicePaths.length).toBe(3);
  });

  it('loads a Donut component with legend', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      series: testSeries,
      legend: true
    });

    GrommetTestUtils.componentShouldExist(Component, 'donut');
    GrommetTestUtils.componentShouldExist(Component, 'donut__legend');
  });
});
