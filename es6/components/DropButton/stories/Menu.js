import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, DropButton, Text } from 'grommet';
import { Gremlin } from "grommet-icons/es6/icons/Gremlin";
import { grommet } from 'grommet/themes';

var renderItems = function renderItems() {
  return /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, null, "hi"), /*#__PURE__*/React.createElement(Text, null, "hi"), /*#__PURE__*/React.createElement(Text, null, "hi"), /*#__PURE__*/React.createElement(Text, null, "hi"));
};

var MenuItem = function MenuItem() {
  return /*#__PURE__*/React.createElement(Box, {
    height: "36px",
    width: "36px",
    align: "center"
  }, /*#__PURE__*/React.createElement(Gremlin, null));
};

var GremlinDropButton = function GremlinDropButton() {
  return /*#__PURE__*/React.createElement(DropButton, {
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
  }, /*#__PURE__*/React.createElement(MenuItem, null));
};

var MenuDropButton = function MenuDropButton() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true
  }, /*#__PURE__*/React.createElement(Box, {
    fill: "vertical",
    width: "xxsmall",
    background: "dark-2"
  }, /*#__PURE__*/React.createElement(GremlinDropButton, null), /*#__PURE__*/React.createElement(Box, {
    flex: true
  }), /*#__PURE__*/React.createElement(GremlinDropButton, null))));
};

storiesOf('DropButton', module).add('Menu', function () {
  return /*#__PURE__*/React.createElement(MenuDropButton, null);
}, {
  chromatic: {
    disable: true
  }
});