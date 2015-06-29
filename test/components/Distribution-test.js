// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../src/js/components/Distribution');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');
var expect = require('expect');

var testSeries = [
  {
    label: 'first',
    value: 1,
    colorIndex: "graph-1"
  },
  {
    label: 'second',
    value: 2,
    colorIndex: "graph-2"
  },
  {
    label: 'third',
    value: 3,
    colorIndex: "graph-3"
  }
];


describe('Grommet Distribution', function() {
  it('loads an empty Distribution', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      series: []
    });

    GrommetTestUtils.componentShouldExist(Component, 'distribution');

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var boxes = TestUtils.scryRenderedDOMComponentsWithClass(Component,
                      'distribution__box');

    expect(boxes.length).toBe(0);
  });

  it('loads a Distribution', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      series: testSeries
    });

    GrommetTestUtils.componentShouldExist(Component, 'distribution');

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var boxes = TestUtils.scryRenderedDOMComponentsWithClass(Component,
                      'distribution__box');

    expect(boxes.length).toBe(3);
  });
});
