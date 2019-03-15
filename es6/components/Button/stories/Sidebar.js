import React from 'react';
import { storiesOf } from '@storybook/react';
import { grommet, Box, Button, Grommet, Text } from 'grommet';

var SidebarButton = function SidebarButton(_ref) {
  var label = _ref.label,
      onClick = _ref.onClick;
  return React.createElement(Button, {
    plain: true,
    onClick: onClick
  }, function (_ref2) {
    var hover = _ref2.hover;
    return React.createElement(Box, {
      background: hover ? 'accent-1' : undefined,
      pad: {
        horizontal: 'large',
        vertical: 'medium'
      }
    }, React.createElement(Text, {
      size: "large"
    }, label));
  });
};

var SidebarButtons = function SidebarButtons() {
  return React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, React.createElement(Box, {
    fill: true,
    direction: "row"
  }, React.createElement(Box, {
    background: "neutral-1"
  }, React.createElement(SidebarButton, {
    label: "Dashboard",
    onClick: function onClick() {}
  }), React.createElement(SidebarButton, {
    label: "Devices",
    onClick: function onClick() {}
  }), React.createElement(SidebarButton, {
    label: "Settings",
    onClick: function onClick() {}
  }))));
};

storiesOf('Button', module).add('Sidebar', function () {
  return React.createElement(SidebarButtons, null);
});