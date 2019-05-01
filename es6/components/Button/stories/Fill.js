function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { grommet, Box, Button, Grommet } from 'grommet';

var FillButtons = function FillButtons(props) {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    pad: "medium",
    justify: "center",
    direction: "row"
  }, React.createElement(Box, {
    justify: "center",
    align: "center",
    pad: "medium",
    gap: "medium"
  }, React.createElement(Box, {
    border: true,
    justify: "center",
    align: "center",
    height: "100px",
    width: "300px"
  }, React.createElement(Button, _extends({
    label: "False",
    onClick: function onClick() {}
  }, props))), React.createElement(Box, {
    border: true,
    justify: "center",
    align: "center",
    height: "100px",
    width: "300px"
  }, React.createElement(Button, _extends({
    label: "True",
    fill: true,
    onClick: function onClick() {}
  }, props))), React.createElement(Box, {
    border: true,
    justify: "center",
    align: "center",
    height: "100px",
    width: "300px"
  }, React.createElement(Button, _extends({
    label: "Horizontal",
    fill: "horizontal",
    onClick: function onClick() {}
  }, props))), React.createElement(Box, {
    border: true,
    justify: "center",
    align: "center",
    height: "100px",
    width: "300px"
  }, React.createElement(Button, _extends({
    label: "Vertical",
    fill: "vertical",
    onClick: function onClick() {}
  }, props)))), React.createElement(Box, {
    pad: "medium",
    justify: "center",
    align: "center",
    height: "700px",
    width: "300px",
    gap: "medium"
  }, React.createElement(Button, _extends({
    label: "False",
    onClick: function onClick() {}
  }, props)), React.createElement(Button, _extends({
    label: "True",
    fill: true,
    onClick: function onClick() {}
  }, props)), React.createElement(Button, _extends({
    label: "Horizontal",
    fill: "horizontal",
    onClick: function onClick() {}
  }, props)), React.createElement(Button, _extends({
    label: "Vertical",
    fill: "vertical",
    onClick: function onClick() {}
  }, props)))));
};

storiesOf('Button', module).add('Fill', function () {
  return React.createElement(FillButtons, null);
});