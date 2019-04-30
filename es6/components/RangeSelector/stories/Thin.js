import React, { useState } from 'react';
import { render } from 'react-dom';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, RangeSelector, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';
var RANGE_MIN = 0;
var RANGE_MAX = 100;

function Thin(_ref) {
  var _ref$initialRange = _ref.initialRange,
      initialRange = _ref$initialRange === void 0 ? [0, 100] : _ref$initialRange,
      label = _ref.label;

  var _useState = useState(initialRange),
      range = _useState[0],
      setRange = _useState[1];

  return React.createElement(Box, {
    gap: "small",
    pad: "xlarge"
  }, label ? React.createElement(Text, null, label) : null, React.createElement(Stack, null, React.createElement(Box, {
    background: "light-4",
    height: "6px",
    direction: "row"
  }), React.createElement(RangeSelector, {
    direction: "horizontal",
    min: RANGE_MIN,
    max: RANGE_MAX,
    step: 1,
    values: range,
    onChange: function onChange(nextRange) {
      setRange(nextRange);
    }
  })), React.createElement(Box, {
    align: "center"
  }, React.createElement(Text, {
    size: "small"
  }, range[0] + "% - " + range[1] + "%")));
}

function App() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    pad: "small"
  }, React.createElement(Thin, {
    label: "My Range Selector"
  })));
}

render(React.createElement(App, null), document.getElementById('root'));
storiesOf('RangeSelector', module).add('Thin', function () {
  return React.createElement(App, null);
});