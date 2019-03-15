function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { grommet, Box, Button, Grommet } from 'grommet';

var ColoredButton = function ColoredButton(props) {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "small"
  }, React.createElement(Button, _extends({
    primary: true,
    color: "dark-1",
    label: "Submit dark-1",
    onClick: function onClick() {}
  }, props)), React.createElement(Button, _extends({
    primary: true,
    color: "#111111",
    label: "Submit #111111",
    onClick: function onClick() {}
  }, props)), React.createElement(Button, _extends({
    primary: true,
    color: "#777",
    label: "Submit #777",
    onClick: function onClick() {}
  }, props))));
};

storiesOf('Button', module).add('Colored', function () {
  return React.createElement(ColoredButton, null);
});