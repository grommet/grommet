import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Chart } from 'grommet';
import { grommet } from 'grommet/themes';
var gradient = [{
  value: 0,
  color: 'status-ok'
}, {
  value: 25,
  color: 'status-ok'
}, {
  value: 27,
  color: 'status-warning'
}, {
  value: 30,
  color: 'status-critical'
}];

var GradientCharts = function GradientCharts() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "medium"
  }, React.createElement(Chart, {
    id: "bar",
    type: "bar",
    color: gradient,
    values: [[10, 20], [20, 30], [30, 15]]
  }), React.createElement(Chart, {
    id: "line",
    type: "line",
    color: gradient,
    values: [20, 30, 15]
  }), React.createElement(Chart, {
    id: "area",
    type: "area",
    color: gradient,
    values: [{
      value: [10, 20]
    }, {
      value: [20, 30]
    }, {
      value: [30, 15]
    }]
  }), React.createElement(Chart, {
    id: "point",
    type: "point",
    color: gradient,
    values: [[10, 20], [20, 30], [30, 15]],
    round: true
  })));
};

storiesOf('Chart', module).add('Gradient', function () {
  return React.createElement(GradientCharts, null);
});