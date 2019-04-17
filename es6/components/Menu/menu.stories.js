import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Menu, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { FormDown } from "grommet-icons/es6/icons/FormDown";

var SimpleMenu = function SimpleMenu() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Menu, {
    dropProps: {
      align: {
        top: 'bottom',
        left: 'left'
      }
    },
    label: "actions",
    items: [{
      label: 'Launch',
      onClick: function onClick() {}
    }, {
      label: 'Abort',
      onClick: function onClick() {}
    }, {
      label: 'Disabled',
      disabled: true
    }]
  })));
};

var CustomMenu = function CustomMenu() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large",
    background: {
      color: 'dark-2',
      opacity: 0.7
    }
  }, React.createElement(Menu, {
    plain: true,
    items: [{
      label: 'Launch',
      onClick: function onClick() {}
    }, {
      label: 'Abort',
      onClick: function onClick() {}
    }]
  }, function (_ref) {
    var drop = _ref.drop,
        hover = _ref.hover;
    var color = hover && !drop ? 'accent-1' : undefined;
    return React.createElement(Box, {
      direction: "row",
      gap: "small",
      pad: "small",
      background: hover && drop ? 'light-2' : undefined
    }, React.createElement(Text, {
      color: color
    }, "actions"), React.createElement(FormDown, {
      color: color
    }));
  })));
};

storiesOf('Menu', module).add('Simple', function () {
  return React.createElement(SimpleMenu, null);
}).add('Custom', function () {
  return React.createElement(CustomMenu, null);
});