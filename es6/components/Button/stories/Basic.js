function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { grommet, Box, Button, Grommet } from 'grommet';

var BasicButtons = function BasicButtons(props) {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "medium"
  }, React.createElement(Button, _extends({
    label: "Default",
    onClick: function onClick() {}
  }, props))), React.createElement(Box, {
    align: "center",
    pad: "medium"
  }, React.createElement(Button, {
    label: "Anchor",
    href: "#"
  })), React.createElement(Box, {
    align: "center",
    pad: "medium"
  }, React.createElement(Button, _extends({
    disabled: true,
    label: "Disabled",
    onClick: function onClick() {}
  }, props))), React.createElement(Box, {
    align: "center",
    pad: "medium"
  }, React.createElement(Button, _extends({
    primary: true,
    label: "Primary",
    onClick: function onClick() {}
  }, props))));
};

storiesOf('Button', module).add('Basic', function () {
  return React.createElement(BasicButtons, null);
});