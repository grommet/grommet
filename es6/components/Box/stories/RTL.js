import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box } from 'grommet';
import { grommet } from '../../../themes';

var RTLBox = function RTLBox() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    dir: "rtl"
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    pad: "small",
    gap: "small",
    border: true
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    pad: "small",
    border: "start"
  }, "border start"), /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    pad: {
      start: 'large'
    },
    background: "brand"
  }, "pad start"), /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    margin: {
      start: 'large'
    },
    background: "brand"
  }, "margin start")));
};

storiesOf('Box', module).add('RTL', function () {
  return /*#__PURE__*/React.createElement(RTLBox, null);
});