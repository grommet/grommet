function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { FormDown } from "grommet-icons/es6/icons/FormDown";
import { FormNext } from "grommet-icons/es6/icons/FormNext";
import { Box, Button, Collapsible, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var MenuButton = function MenuButton(_ref) {
  var label = _ref.label,
      open = _ref.open,
      submenu = _ref.submenu,
      rest = _objectWithoutPropertiesLoose(_ref, ["label", "open", "submenu"]);

  var Icon = open ? FormDown : FormNext;
  return /*#__PURE__*/React.createElement(Button, _extends({
    hoverIndicator: "background"
  }, rest), /*#__PURE__*/React.createElement(Box, {
    margin: submenu ? {
      left: 'small'
    } : undefined,
    direction: "row",
    align: "center",
    pad: "xsmall"
  }, /*#__PURE__*/React.createElement(Icon, {
    color: "brand"
  }), /*#__PURE__*/React.createElement(Text, {
    size: "small"
  }, label)));
};

export var Nested = function Nested() {
  var _React$useState = React.useState(false),
      openMenu1 = _React$useState[0],
      setOpenMenu1 = _React$useState[1];

  var _React$useState2 = React.useState(false),
      openSubmenu1 = _React$useState2[0],
      setOpenSubmenu1 = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      openMenu2 = _React$useState3[0],
      setOpenMenu2 = _React$useState3[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    width: "small"
  }, /*#__PURE__*/React.createElement(MenuButton, {
    open: openMenu1,
    label: "Accordion",
    onClick: function onClick() {
      var newOpenMenu1 = !openMenu1;
      setOpenMenu1(newOpenMenu1);
      setOpenSubmenu1(!newOpenMenu1 ? false : openSubmenu1);
    }
  }), /*#__PURE__*/React.createElement(Collapsible, {
    open: openMenu1
  }, /*#__PURE__*/React.createElement(MenuButton, {
    submenu: true,
    open: openSubmenu1,
    label: "Accordion Basics",
    onClick: function onClick() {
      return setOpenSubmenu1(!openSubmenu1);
    }
  }), /*#__PURE__*/React.createElement(Collapsible, {
    open: openSubmenu1
  }, /*#__PURE__*/React.createElement(Button, {
    hoverIndicator: "background",
    onClick: function onClick() {
      return alert('Submenu item 1 selected');
    }
  }, /*#__PURE__*/React.createElement(Box, {
    margin: {
      left: 'medium'
    },
    direction: "row",
    align: "center",
    pad: "xsmall"
  }, /*#__PURE__*/React.createElement(Text, {
    size: "small"
  }, "Submenu item 1"))), /*#__PURE__*/React.createElement(Button, {
    hoverIndicator: "background",
    onClick: function onClick() {
      return alert('Submenu item 2 selected');
    }
  }, /*#__PURE__*/React.createElement(Box, {
    margin: {
      left: 'medium'
    },
    direction: "row",
    align: "center",
    pad: "xsmall"
  }, /*#__PURE__*/React.createElement(Text, {
    size: "small"
  }, "Submenu item 2"))))), /*#__PURE__*/React.createElement(MenuButton, {
    open: openMenu2,
    label: "Button",
    onClick: function onClick() {
      return setOpenMenu2(!openMenu2);
    }
  }), /*#__PURE__*/React.createElement(Collapsible, {
    open: openMenu2
  }, /*#__PURE__*/React.createElement(Button, {
    hoverIndicator: "background",
    onClick: function onClick() {
      return alert('Submenu item 1 selected');
    }
  }, /*#__PURE__*/React.createElement(Box, {
    margin: {
      left: 'medium'
    },
    direction: "row",
    align: "center",
    pad: "xsmall"
  }, /*#__PURE__*/React.createElement(Text, {
    size: "small"
  }, "Submenu item 1"))))));
};
Nested.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};