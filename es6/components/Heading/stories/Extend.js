import React from 'react';
import { Grommet, Heading } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { grommet } from 'grommet/themes';
var letterSpace = {
  1: {
    small: '-1px',
    medium: '-1.22px',
    large: '-1.45px'
  },
  2: {
    small: '-0.47px',
    medium: '-0.57px',
    large: '-0.7px'
  },
  3: {
    small: '-0.42px',
    medium: '-0.47px',
    large: '-0.47px'
  }
};

var letterSpacing = function letterSpacing(_ref) {
  var level = _ref.level,
      size = _ref.size;
  return level && size ? "letter-spacing: " + letterSpace[level][size] : '';
};

var customTheme = deepMerge(grommet, {
  heading: {
    extend: function extend(props) {
      return "" + letterSpacing(props);
    }
  }
});
export var Extend = function Extend() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Heading, {
    level: "1",
    size: "large"
  }, "This is using the extend property on Heading"), /*#__PURE__*/React.createElement(Heading, {
    level: "2",
    size: "medium"
  }, "This is using the extend property on Heading"), /*#__PURE__*/React.createElement(Heading, {
    level: "3",
    size: "small"
  }, "This is using the extend property on Heading"));
};