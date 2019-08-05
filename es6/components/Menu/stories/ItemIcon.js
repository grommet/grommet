import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Menu, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { FormDown } from "grommet-icons/es6/icons/FormDown";
import { Github } from "grommet-icons/es6/icons/Github";
import { Slack } from "grommet-icons/es6/icons/Slack"; // This story offers a suggested workaround for issue #3209.

var IconItemsMenu = function IconItemsMenu() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Menu, {
    plain: true,
    open: true,
    items: [{
      label: React.createElement(Box, {
        alignSelf: "center"
      }, "Github"),
      onClick: function onClick() {},
      icon: React.createElement(Box, {
        pad: "medium"
      }, React.createElement(Github, {
        size: "large"
      }))
    }, {
      label: React.createElement(Box, {
        alignSelf: "center"
      }, "Slack"),
      onClick: function onClick() {},
      icon: React.createElement(Box, {
        pad: "medium"
      }, React.createElement(Slack, {
        size: "large"
      }))
    }]
  }, React.createElement(Box, {
    direction: "row",
    gap: "small",
    pad: "large"
  }, React.createElement(FormDown, null), React.createElement(Text, null, "Menu with Icon on the left")))));
};

storiesOf('Menu', module).add('Item with Icon', function () {
  return React.createElement(IconItemsMenu, null);
});