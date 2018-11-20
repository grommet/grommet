import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Menu } from 'grommet';
import { grommet } from 'grommet/themes';

var SimpleMenu = function SimpleMenu() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    direction: "row",
    gap: "large"
  }, React.createElement(Menu, {
    label: "Actions",
    items: [{
      label: 'Launch',
      onClick: function onClick() {}
    }, {
      label: 'Abort',
      onClick: function onClick() {}
    }]
  })));
};

storiesOf('Menu', module).add('Simple Menu', function () {
  return React.createElement(SimpleMenu, null);
});