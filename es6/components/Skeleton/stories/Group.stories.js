function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Box, Button, Card, Grommet, Text } from 'grommet';
import { FormAdd } from "grommet-icons/es6/icons/FormAdd";
import { useThemeValue } from '../../../utils/useThemeValue';
var Item = function Item(_ref) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/React.createElement(Card, _extends({
    width: "531px",
    pad: "medium",
    gap: "large",
    round: "medium",
    flex: "grow",
    border: true
  }, rest), /*#__PURE__*/React.createElement(Box, {
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
  }, "Compliance"), /*#__PURE__*/React.createElement(Text, {
    size: "small"
  }, "Acme Company Inc"))), /*#__PURE__*/React.createElement(Button, {
    label: "Add",
    reverse: true,
    icon: /*#__PURE__*/React.createElement(FormAdd, null),
    secondary: true
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
    gap: "medium",
    skeleton: skeleton
  }, /*#__PURE__*/React.createElement(Item, null), /*#__PURE__*/React.createElement(Item, null), /*#__PURE__*/React.createElement(Item, null), /*#__PURE__*/React.createElement(Item, null), /*#__PURE__*/React.createElement(Item, null));
};
export var Group = function Group() {
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Grommet, {
    theme: theme
  }, /*#__PURE__*/React.createElement(Content, null)), /*#__PURE__*/React.createElement(Grommet, {
    theme: theme,
    themeMode: "dark"
  }, /*#__PURE__*/React.createElement(Content, null)));
};
Group.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Visualizations/Skeleton/Group'
};