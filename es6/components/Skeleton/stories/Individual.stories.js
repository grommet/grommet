var _excluded = ["title"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';
import { Box, Button, Card, Grommet, Text } from 'grommet';
import { useThemeValue } from '../../../utils/useThemeValue';
var Item = function Item(_ref) {
  var title = _ref.title,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Card, _extends({
    width: "531px",
    pad: "medium",
    gap: "large",
    round: "medium",
    flex: "grow"
  }, rest), /*#__PURE__*/React.createElement(Text, {
    color: "text-strong",
    size: "xlarge",
    weight: "bold",
    skeleton: {
      width: 'medium'
    }
  }, title), /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    gap: "large",
    justify: "between",
    align: "center"
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Box, {
    width: "xsmall",
    height: "xsmall",
    background: "orange!",
    round: "small"
  }), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    size: "large",
    color: "text-strong",
    weight: "bold",
    skeleton: {
      width: 'small'
    }
  }, "Acme Operations"), /*#__PURE__*/React.createElement(Text, {
    size: "small"
  }, "Acme Company Inc"))), /*#__PURE__*/React.createElement(Button, {
    label: "Learn More"
  })));
};
var skeleton = {
  animation: 'fadeIn'
};
var Content = function Content() {
  return /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    pad: "large",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Item, {
    title: "Operations assurance and security platform"
  }), /*#__PURE__*/React.createElement(Item, {
    skeleton: skeleton
  }));
};
export var Individual = function Individual() {
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Grommet, {
    theme: theme
  }, /*#__PURE__*/React.createElement(Content, null)), /*#__PURE__*/React.createElement(Grommet, {
    theme: theme,
    themeMode: "dark"
  }, /*#__PURE__*/React.createElement(Content, null)));
};
export default {
  title: 'Visualizations/Skeleton/Individual'
};