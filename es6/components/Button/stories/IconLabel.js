import React from 'react';
import { storiesOf } from '@storybook/react';
import { Add } from "grommet-icons/es6/icons/Add";
import { Box, Button, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var IconLabel = function IconLabel() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Box, {
    round: "full",
    overflow: "hidden",
    background: "neutral-1"
  }, React.createElement(Button, {
    icon: React.createElement(Add, null),
    hoverIndicator: true,
    onClick: function onClick() {}
  })), React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "small"
  }, React.createElement(Button, {
    icon: React.createElement(Add, null),
    label: "Add",
    onClick: function onClick() {},
    primary: true
  }), React.createElement(Button, {
    icon: React.createElement(Add, null),
    label: "Add",
    onClick: function onClick() {}
  }), React.createElement(Button, {
    icon: React.createElement(Add, null),
    label: "Add",
    gap: "xlarge",
    onClick: function onClick() {}
  }), React.createElement(Button, {
    icon: React.createElement(Add, null),
    label: "500px gap",
    gap: "500px",
    onClick: function onClick() {}
  }))));
};

storiesOf('Button', module).add('Icon Label', function () {
  return React.createElement(IconLabel, null);
});