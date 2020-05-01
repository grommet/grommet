function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Add } from "grommet-icons/es6/icons/Add";
import { Box, Button, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var PlainButton = function PlainButton(props) {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Button, _extends({
    hoverIndicator: "light-1",
    onClick: function onClick() {}
  }, props), /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    direction: "row",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Add, null), /*#__PURE__*/React.createElement(Text, null, "Add")))));
};

storiesOf('Button', module).add('Active', function () {
  return /*#__PURE__*/React.createElement(PlainButton, {
    active: true
  });
}).add('Plain', function () {
  return /*#__PURE__*/React.createElement(PlainButton, null);
});