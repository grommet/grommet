function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Box, Button } from 'grommet';
export var Fill = function Fill(props) {
  return /*#__PURE__*/React.createElement(Box, {
    pad: "medium",
    justify: "center",
    direction: "row"
  }, /*#__PURE__*/React.createElement(Box, {
    justify: "center",
    align: "center",
    pad: "medium",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Box, {
    border: true,
    justify: "center",
    align: "center",
    height: "100px",
    width: "300px"
  }, /*#__PURE__*/React.createElement(Button, _extends({
    label: "False",
    onClick: function onClick() {}
  }, props))), /*#__PURE__*/React.createElement(Box, {
    border: true,
    justify: "center",
    align: "center",
    height: "100px",
    width: "300px"
  }, /*#__PURE__*/React.createElement(Button, _extends({
    label: "True",
    fill: true,
    onClick: function onClick() {}
  }, props))), /*#__PURE__*/React.createElement(Box, {
    border: true,
    justify: "center",
    align: "center",
    height: "100px",
    width: "300px"
  }, /*#__PURE__*/React.createElement(Button, _extends({
    label: "Horizontal",
    fill: "horizontal",
    onClick: function onClick() {}
  }, props))), /*#__PURE__*/React.createElement(Box, {
    border: true,
    justify: "center",
    align: "center",
    height: "100px",
    width: "300px"
  }, /*#__PURE__*/React.createElement(Button, _extends({
    label: "Vertical",
    fill: "vertical",
    onClick: function onClick() {}
  }, props)))), /*#__PURE__*/React.createElement(Box, {
    pad: "medium",
    justify: "center",
    align: "center",
    height: "700px",
    width: "300px",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Button, _extends({
    label: "False",
    onClick: function onClick() {}
  }, props)), /*#__PURE__*/React.createElement(Button, _extends({
    label: "True",
    fill: true,
    onClick: function onClick() {}
  }, props)), /*#__PURE__*/React.createElement(Button, _extends({
    label: "Horizontal",
    fill: "horizontal",
    onClick: function onClick() {}
  }, props)), /*#__PURE__*/React.createElement(Button, _extends({
    label: "Vertical",
    fill: "vertical",
    onClick: function onClick() {}
  }, props))));
};
export default {
  title: 'Controls/Button/Fill'
};