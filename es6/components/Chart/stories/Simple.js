import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Chart } from 'grommet';
import { grommet } from 'grommet/themes';

var BarChart = function BarChart() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Chart, {
    type: "bar",
    values: [[10, 20], [20, 30], [30, 15]]
  })));
};

var LineChart = function LineChart() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Chart, {
    type: "line",
    values: [20, 30, 15]
  })));
};

var AreaChart = function AreaChart() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Chart, {
    type: "area",
    values: [{
      value: [10, 20]
    }, {
      value: [20, 30]
    }, {
      value: [30, 15]
    }]
  })));
};

var PointChart = function PointChart() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Chart, {
    type: "point",
    values: [[10, 20], [20, 30], [30, 15]]
  }), /*#__PURE__*/React.createElement(Chart, {
    type: "point",
    values: [[10, 20], [20, 30], [30, 15]],
    round: true
  })));
};

storiesOf('Chart', module).add('Bar', function () {
  return /*#__PURE__*/React.createElement(BarChart, null);
}).add('Line', function () {
  return /*#__PURE__*/React.createElement(LineChart, null);
}).add('Area', function () {
  return /*#__PURE__*/React.createElement(AreaChart, null);
}).add('Point', function () {
  return /*#__PURE__*/React.createElement(PointChart, null);
});