function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useContext } from 'react';
import { Box, Button, Card, Grommet, Image, Text, ThemeContext } from 'grommet';
import { FormAdd } from "grommet-icons/es6/icons/FormAdd";
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
  }, /*#__PURE__*/React.createElement(Image, null)), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
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
  var theme = useContext(ThemeContext);
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