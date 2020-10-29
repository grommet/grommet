function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { grommet, Box, Button, Grommet } from 'grommet';
export var Fill = function Fill(props) {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
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
  }, props)))));
};