import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, DropButton, Text } from 'grommet';
import { Gremlin } from "grommet-icons/es6/icons/Gremlin";
import { grommet } from 'grommet/themes';

var renderItems = function renderItems() {
  return React.createElement(Box, null, React.createElement(Text, null, "hi"), React.createElement(Text, null, "hi"), React.createElement(Text, null, "hi"), React.createElement(Text, null, "hi"));
};

var MenuItem = function MenuItem() {
  return React.createElement(Box, {
    height: "36px",
    width: "36px",
    align: "center"
  }, React.createElement(Gremlin, null));
};

var GremlinDropButton = function GremlinDropButton() {
  return React.createElement(DropButton, {
    alignSelf: "center",
    margin: {
      vertical: 'small'
    },
    dropContent: renderItems(),
    dropProps: {
      align: {
        top: 'bottom'
      }
    }
  }, React.createElement(MenuItem, null));
};

var MenuDropButton = function MenuDropButton() {
  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    fill: true
  }, React.createElement(Box, {
    fill: "vertical",
    width: "xxsmall",
    background: "dark-2"
  }, React.createElement(GremlinDropButton, null), React.createElement(Box, {
    flex: true
  }), React.createElement(GremlinDropButton, null))));
};

storiesOf('DropButton', module).add('Menu', function () {
  return React.createElement(MenuDropButton, null);
});