import React from 'react';
import { storiesOf } from '@storybook/react';
import { Attraction } from "grommet-icons/es6/icons/Attraction";
import { Car } from "grommet-icons/es6/icons/Car";
import { Grommet, Anchor, Box, Button, Text } from 'grommet';
import { grommet } from '../../../themes';

var SimpleBox = function SimpleBox() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    direction: "row-responsive",
    justify: "center",
    align: "center",
    pad: "xlarge",
    background: "dark-2",
    gap: "medium"
  }, React.createElement(Box, {
    pad: "large",
    align: "center",
    background: {
      color: 'light-2',
      opacity: 'strong'
    },
    round: true,
    gap: "small"
  }, React.createElement(Attraction, {
    size: "large"
  }), React.createElement(Text, null, "Party"), React.createElement(Anchor, {
    href: "",
    label: "Link"
  }), React.createElement(Button, {
    label: "Button",
    onClick: function onClick() {}
  })), React.createElement(Box, {
    pad: "large",
    align: "center",
    background: "dark-3",
    round: true,
    gap: "small"
  }, React.createElement(Car, {
    size: "large",
    color: "light-2"
  }), React.createElement(Text, null, "Travel"), React.createElement(Anchor, {
    href: "",
    label: "Link"
  }), React.createElement(Button, {
    label: "Button",
    onClick: function onClick() {}
  }))));
};

storiesOf('Box', module).add('Simple', function () {
  return React.createElement(SimpleBox, null);
});