import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Grommet } from 'grommet';
import { Next } from "grommet-icons/es6/icons/Next";
import { Add } from "grommet-icons/es6/icons/Add";
import { grommet } from 'grommet/themes';

var SizedButton = function SizedButton() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    direction: "row"
  }, React.createElement(Box, {
    align: "start",
    pad: "large",
    gap: "large"
  }, React.createElement(Button, {
    size: "small",
    label: "Small"
  }), React.createElement(Button, {
    size: "medium",
    label: "Medium"
  }), React.createElement(Button, {
    label: "Default"
  }), React.createElement(Button, {
    size: "large",
    label: "Large"
  })), React.createElement(Box, {
    align: "start",
    pad: "large",
    gap: "large"
  }, React.createElement(Button, {
    primary: true,
    size: "small",
    label: "Small"
  }), React.createElement(Button, {
    primary: true,
    size: "medium",
    label: "Medium"
  }), React.createElement(Button, {
    primary: true,
    label: "Default"
  }), React.createElement(Button, {
    primary: true,
    size: "large",
    label: "Large"
  })), React.createElement(Box, {
    align: "start",
    pad: "large",
    gap: "large"
  }, React.createElement(Button, {
    size: "small",
    label: "Small",
    icon: React.createElement(Next, null),
    reverse: true
  }), React.createElement(Button, {
    size: "medium",
    label: "Medium",
    icon: React.createElement(Next, null),
    reverse: true
  }), React.createElement(Button, {
    label: "Default",
    icon: React.createElement(Next, null),
    reverse: true
  }), React.createElement(Button, {
    size: "large",
    label: "Large",
    icon: React.createElement(Next, null),
    reverse: true
  })), React.createElement(Box, {
    align: "start",
    pad: "large",
    gap: "large"
  }, React.createElement(Button, {
    size: "small",
    icon: React.createElement(Add, null),
    primary: true
  }), React.createElement(Button, {
    size: "medium",
    icon: React.createElement(Add, null),
    primary: true
  }), React.createElement(Button, {
    icon: React.createElement(Add, null),
    primary: true
  }), React.createElement(Button, {
    size: "large",
    icon: React.createElement(Add, null),
    primary: true
  }))));
};

storiesOf('Button', module).add('Sizes', function () {
  return React.createElement(SizedButton, {
    active: true
  });
});