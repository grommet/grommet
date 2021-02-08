import React from 'react';
import { Grommet, Box, Menu, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { FormDown } from "grommet-icons/es6/icons/FormDown";
import { Github } from "grommet-icons/es6/icons/Github";
import { Slack } from "grommet-icons/es6/icons/Slack"; // This story offers a suggested workaround for issue #3209.

var IconItemsMenu = function IconItemsMenu() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Menu, {
    plain: true,
    open: true,
    items: [{
      label: /*#__PURE__*/React.createElement(Box, {
        alignSelf: "center"
      }, "Github"),
      onClick: function onClick() {},
      icon: /*#__PURE__*/React.createElement(Box, {
        pad: "medium"
      }, /*#__PURE__*/React.createElement(Github, {
        size: "large"
      }))
    }, {
      label: /*#__PURE__*/React.createElement(Box, {
        alignSelf: "center"
      }, "Slack"),
      onClick: function onClick() {},
      icon: /*#__PURE__*/React.createElement(Box, {
        pad: "medium"
      }, /*#__PURE__*/React.createElement(Slack, {
        size: "large"
      }))
    }]
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    gap: "small",
    pad: "large"
  }, /*#__PURE__*/React.createElement(FormDown, null), /*#__PURE__*/React.createElement(Text, null, "Menu with Icon on the left")))));
};

export var ItemWithIcon = function ItemWithIcon() {
  return /*#__PURE__*/React.createElement(IconItemsMenu, null);
};
ItemWithIcon.storyName = 'Item with icon';
export default {
  title: 'Controls/Menu/Item with icon'
};