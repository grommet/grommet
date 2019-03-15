import React from 'react';
import { storiesOf } from '@storybook/react';
import { Close } from "grommet-icons/es6/icons/Close";
import { Send } from "grommet-icons/es6/icons/Send";
import { User } from "grommet-icons/es6/icons/User";
import { Box, Button, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var IconPlain = function IconPlain() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Text, {
    margin: "small"
  }, " plain=true (no padding, no border) "), React.createElement(Box, {
    direction: "row"
  }, React.createElement(Button, {
    plain: true,
    icon: React.createElement(Close, null),
    onClick: function onClick() {},
    primary: true
  }), React.createElement(Button, {
    plain: true,
    icon: React.createElement(Send, null),
    onClick: function onClick() {}
  }), React.createElement(Button, {
    plain: true,
    icon: React.createElement(User, null),
    onClick: function onClick() {}
  }))), React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Text, {
    margin: "small"
  }, " plain=false (includes padding and border)"), React.createElement(Box, {
    direction: "row"
  }, React.createElement(Button, {
    plain: false,
    icon: React.createElement(Close, null),
    onClick: function onClick() {},
    primary: true
  }), React.createElement(Button, {
    plain: false,
    icon: React.createElement(Send, null),
    onClick: function onClick() {}
  }), React.createElement(Button, {
    plain: false,
    icon: React.createElement(User, null),
    onClick: function onClick() {}
  }))), React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Text, {
    margin: "small"
  }, " plain=undefined (with padding, no border) "), React.createElement(Box, {
    direction: "row"
  }, React.createElement(Button, {
    icon: React.createElement(Close, null),
    onClick: function onClick() {},
    primary: true
  }), React.createElement(Button, {
    icon: React.createElement(Send, null),
    onClick: function onClick() {}
  }), React.createElement(Button, {
    icon: React.createElement(User, null),
    onClick: function onClick() {}
  }))));
};

storiesOf('Button', module).add('Icon Plain', function () {
  return React.createElement(IconPlain, null);
});