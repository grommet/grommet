// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../src/js/components/Meter');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');

var testSeries = [
  {
    label: 'first',
    values: 30,
    colorIndex: "graph-1"
  },
  {
    label: 'second',
    values: 50,
    colorIndex: "graph-2",
    active: true
  },
  {
    label: 'third',
    values: 70,
    colorIndex: "graph-3",
    important: true
  }
];

var testThresholds = [
  {label: 'OK', value: 0, colorIndex: 'ok'},
  {label: 'Warning', value: 60, colorIndex: 'warning'},
  {label: 'Error', value: 70, colorIndex: 'error'}
];

describe('Grommet Meter', function() {
  it('loads an empty bar Meter', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {});

    GrommetTestUtils.componentShouldExist(Component, 'meter');
  });

  it('loads an empty arc Meter', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      type: 'arc'
    });

    GrommetTestUtils.componentShouldExist(Component, 'meter');
  });

  it('loads an empty circle Meter', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      type: 'circle'
    });

    GrommetTestUtils.componentShouldExist(Component, 'meter');
  });

  it('loads an empty spiral Meter', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      type: 'spiral'
    });

    GrommetTestUtils.componentShouldExist(Component, 'meter');
  });

  it('loads a single value bar Meter', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      value: 40
    });

    GrommetTestUtils.componentShouldExist(Component, 'meter');
  });

  it('loads a single value bar Meter vertical', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      type: 'bar',
      value: 40,
      vertical: true
    });

    GrommetTestUtils.componentShouldExist(Component, 'meter--bar');
  });

  it('loads a single value arc Meter', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      type: 'arc',
      value: 40
    });

    GrommetTestUtils.componentShouldExist(Component, 'meter--arc');
  });

  it('loads a single value arc Meter vertical', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      type: 'arc',
      value: 40,
      vertical: true
    });

    GrommetTestUtils.componentShouldExist(Component, 'meter--arc');
  });

  it('loads a single value circle Meter', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      type: 'circle',
      value: 40
    });

    GrommetTestUtils.componentShouldExist(Component, 'meter--circle');
  });

  it('loads a single value spiral Meter', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      type: 'spiral',
      value: 40
    });

    GrommetTestUtils.componentShouldExist(Component, 'meter--spiral');
  });

  it('loads a bar Meter with threshold, min, max, units', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      value: 40,
      threshold: 60,
      min: 20,
      max: 80,
      units: 'tests'
    });

    GrommetTestUtils.componentShouldExist(Component, 'meter');
  });

  it('loads a bar Meter with thresholds, min, max, units', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      value: 40,
      thresholds: testThresholds,
      min: 20,
      max: 80,
      units: 'tests'
    });

    GrommetTestUtils.componentShouldExist(Component, 'meter');
  });

  it('loads a bar Meter with series, min, max, units', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      series: testSeries,
      min: 20,
      max: 80,
      units: 'tests'
    });

    GrommetTestUtils.componentShouldExist(Component, 'meter');
  });

  it('loads an arc Meter with series, min, max, units', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      type: 'arc',
      series: testSeries,
      min: 20,
      max: 80,
      units: 'tests'
    });

    GrommetTestUtils.componentShouldExist(Component, 'meter');
  });

  it('loads an circle Meter with series, min, max, units', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      type: 'circle',
      series: testSeries,
      min: 20,
      max: 80,
      units: 'tests'
    });

    GrommetTestUtils.componentShouldExist(Component, 'meter');
  });

  it('loads a spiral Meter with series, min, max, units', function() {
    var Component = GrommetTestUtils.getComponent(__path__, undefined, {
      type: 'spiral',
      series: testSeries,
      min: 20,
      max: 80,
      units: 'tests'
    });

    GrommetTestUtils.componentShouldExist(Component, 'meter');
  });

});
