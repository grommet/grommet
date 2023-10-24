var _excluded = ["title"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useContext } from 'react';
import { Box, Button, Card, Grommet, Image, Text, ThemeContext } from 'grommet';
var Item = function Item(_ref) {
  var title = _ref.title,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Card, _extends({
    width: "531px",
    pad: "medium",
    gap: "large",
    round: "medium",
    background: "status-warning",
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
  }, /*#__PURE__*/React.createElement(Image, null)), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
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
  var theme = useContext(ThemeContext);
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