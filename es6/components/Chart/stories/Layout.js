import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Chart, Heading } from 'grommet';
import { grommet } from 'grommet/themes';
var type = 'bar';
var value = 10;
var values = Array(14).fill(0).map(function (_, index) {
  var delta = index * 3;
  value += delta % 2 ? delta : -delta;
  return [index, value];
});

var LayoutChart = function LayoutChart() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    margin: "medium"
  }, React.createElement(Heading, {
    level: 2
  }, "full"), React.createElement(Box, {
    pad: "medium",
    border: true
  }, React.createElement(Chart, {
    type: type,
    values: values,
    size: {
      width: 'full'
    },
    round: true
  })), React.createElement(Heading, {
    level: 2
  }, "auto, gap"), React.createElement(Box, {
    pad: "medium",
    border: true
  }, React.createElement(Chart, {
    type: type,
    values: values,
    size: {
      width: 'auto'
    },
    gap: "small",
    round: true
  })), React.createElement(Heading, {
    level: 2
  }, "default"), React.createElement(Box, {
    pad: "medium",
    border: true
  }, React.createElement(Chart, {
    type: type,
    values: values,
    round: true
  }))));
};

storiesOf('Chart', module).add('Layout', function () {
  return React.createElement(LayoutChart, null);
});