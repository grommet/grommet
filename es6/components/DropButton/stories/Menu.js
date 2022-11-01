import React from 'react';
import { Gremlin } from "grommet-icons/es6/icons/Gremlin";
import { Box, DropButton, Text } from 'grommet';
var renderItems = function renderItems() {
  return /*#__PURE__*/React.createElement(Box, {
    background: "dark-1"
  }, /*#__PURE__*/React.createElement(Text, null, "hi"), /*#__PURE__*/React.createElement(Text, null, "hi"), /*#__PURE__*/React.createElement(Text, null, "hi"), /*#__PURE__*/React.createElement(Text, null, "hi"));
};
var MenuItem = function MenuItem() {
  return /*#__PURE__*/React.createElement(Box, {
    height: "36px",
    width: "36px",
    align: "center"
  }, /*#__PURE__*/React.createElement(Gremlin, null));
};
var align = {
  top: 'bottom'
};
var GremlinDropButton = function GremlinDropButton() {
  return /*#__PURE__*/React.createElement(DropButton, {
    alignSelf: "center",
    margin: {
      vertical: 'small'
    },
    dropContent: renderItems(),
    dropProps: {
      align: align
    }
  }, /*#__PURE__*/React.createElement(MenuItem, null));
};
var MenuDropButton = function MenuDropButton() {
  return /*#__PURE__*/React.createElement(Box, {
    fill: true
  }, /*#__PURE__*/React.createElement(Box, {
    fill: "vertical",
    width: "xxsmall",
    background: "dark-2"
  }, /*#__PURE__*/React.createElement(GremlinDropButton, null), /*#__PURE__*/React.createElement(Box, {
    flex: true
  }), /*#__PURE__*/React.createElement(GremlinDropButton, null)));
};
export var Menu = function Menu() {
  return /*#__PURE__*/React.createElement(MenuDropButton, null);
};
Menu.parameters = {
  chromatic: {
    disable: true
  }
};
Menu.args = {
  full: true
};
export default {
  title: 'Controls/DropButton/Menu'
};