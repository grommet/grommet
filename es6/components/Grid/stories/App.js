import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Button, Grid, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var AppGrid = function AppGrid() {
  var _useState = useState(true),
      sidebar = _useState[0],
      setSidebar = _useState[1];

  return React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, React.createElement(Grid, {
    fill: true,
    rows: ['auto', 'flex'],
    columns: ['auto', 'flex'],
    areas: [{
      name: 'header',
      start: [0, 0],
      end: [1, 0]
    }, {
      name: 'sidebar',
      start: [0, 1],
      end: [0, 1]
    }, {
      name: 'main',
      start: [1, 1],
      end: [1, 1]
    }]
  }, React.createElement(Box, {
    gridArea: "header",
    direction: "row",
    align: "center",
    justify: "between",
    pad: {
      horizontal: 'medium',
      vertical: 'small'
    },
    background: "dark-2"
  }, React.createElement(Button, {
    onClick: function onClick() {
      return setSidebar(!sidebar);
    }
  }, React.createElement(Text, {
    size: "large"
  }, "Title")), React.createElement(Text, null, "my@email")), sidebar && React.createElement(Box, {
    gridArea: "sidebar",
    background: "dark-3",
    width: "small",
    animation: [{
      type: 'fadeIn',
      duration: 300
    }, {
      type: 'slideRight',
      size: 'xlarge',
      duration: 150
    }]
  }, ['First', 'Second', 'Third'].map(function (name) {
    return React.createElement(Button, {
      key: name,
      href: "#",
      hoverIndicator: true
    }, React.createElement(Box, {
      pad: {
        horizontal: 'medium',
        vertical: 'small'
      }
    }, React.createElement(Text, null, name)));
  })), React.createElement(Box, {
    gridArea: "main",
    justify: "center",
    align: "center"
  }, React.createElement(Text, null, "main"))));
};

storiesOf('Grid', module).add('App', function () {
  return React.createElement(AppGrid, null);
});