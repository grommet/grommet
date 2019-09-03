function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { FormDown } from "grommet-icons/es6/icons/FormDown";
import { FormNext } from "grommet-icons/es6/icons/FormNext";
import { Notification } from "grommet-icons/es6/icons/Notification";
import { Box, Button, Collapsible, Heading, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var SimpleCollapsible = function SimpleCollapsible(props) {
  var _React$useState = React.useState(false),
      open = _React$useState[0],
      setOpen = _React$useState[1];

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "start",
    gap: "small"
  }, React.createElement(Button, {
    primary: true,
    onClick: function onClick() {
      return setOpen(!open);
    },
    label: "Toggle"
  }), React.createElement(Collapsible, _extends({
    open: open
  }, props), React.createElement(Box, {
    background: "light-2",
    round: "medium",
    pad: "medium",
    align: "center",
    justify: "center"
  }, React.createElement(Text, null, "This is a box inside a Collapsible component"))), React.createElement(Text, null, "This is other content outside the Collapsible box")));
};

var MenuButton = function MenuButton(_ref) {
  var label = _ref.label,
      open = _ref.open,
      submenu = _ref.submenu,
      rest = _objectWithoutPropertiesLoose(_ref, ["label", "open", "submenu"]);

  var Icon = open ? FormDown : FormNext;
  return React.createElement(Button, _extends({
    hoverIndicator: "background"
  }, rest), React.createElement(Box, {
    margin: submenu ? {
      left: 'small'
    } : undefined,
    direction: "row",
    align: "center",
    pad: "xsmall"
  }, React.createElement(Icon, {
    color: "brand"
  }), React.createElement(Text, {
    size: "small"
  }, label)));
};

var NestedCollapsible = function NestedCollapsible() {
  var _React$useState2 = React.useState(false),
      openMenu1 = _React$useState2[0],
      setOpenMenu1 = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      openSubmenu1 = _React$useState3[0],
      setOpenSubmenu1 = _React$useState3[1];

  var _React$useState4 = React.useState(false),
      openMenu2 = _React$useState4[0],
      setOpenMenu2 = _React$useState4[1];

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    width: "small"
  }, React.createElement(MenuButton, {
    open: openMenu1,
    label: "Accordion",
    onClick: function onClick() {
      var newOpenMenu1 = !openMenu1;
      setOpenMenu1(newOpenMenu1);
      setOpenSubmenu1(!newOpenMenu1 ? false : openSubmenu1);
    }
  }), React.createElement(Collapsible, {
    open: openMenu1
  }, React.createElement(MenuButton, {
    submenu: true,
    open: openSubmenu1,
    label: "Accordion Basics",
    onClick: function onClick() {
      return setOpenSubmenu1(!openSubmenu1);
    }
  }), React.createElement(Collapsible, {
    open: openSubmenu1
  }, React.createElement(Button, {
    hoverIndicator: "background",
    onClick: function onClick() {
      return alert('Submenu item 1 selected');
    }
  }, React.createElement(Box, {
    margin: {
      left: 'medium'
    },
    direction: "row",
    align: "center",
    pad: "xsmall"
  }, React.createElement(Text, {
    size: "small"
  }, "Submenu item 1"))), React.createElement(Button, {
    hoverIndicator: "background",
    onClick: function onClick() {
      return alert('Submenu item 2 selected');
    }
  }, React.createElement(Box, {
    margin: {
      left: 'medium'
    },
    direction: "row",
    align: "center",
    pad: "xsmall"
  }, React.createElement(Text, {
    size: "small"
  }, "Submenu item 2"))))), React.createElement(MenuButton, {
    open: openMenu2,
    label: "Button",
    onClick: function onClick() {
      return setOpenMenu2(!openMenu2);
    }
  }), React.createElement(Collapsible, {
    open: openMenu2
  }, React.createElement(Button, {
    hoverIndicator: "background",
    onClick: function onClick() {
      return alert('Submenu item 1 selected');
    }
  }, React.createElement(Box, {
    margin: {
      left: 'medium'
    },
    direction: "row",
    align: "center",
    pad: "xsmall"
  }, React.createElement(Text, {
    size: "small"
  }, "Submenu item 1"))))));
};

var HorizontalCollapsible = function HorizontalCollapsible() {
  var _React$useState5 = React.useState(),
      openNotification = _React$useState5[0],
      setOpenNotification = _React$useState5[1];

  return React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, React.createElement(Box, {
    fill: true
  }, React.createElement(Box, {
    as: "header",
    direction: "row",
    align: "center",
    pad: {
      vertical: 'small',
      horizontal: 'medium'
    },
    justify: "between",
    background: "neutral-3",
    elevation: "large",
    style: {
      zIndex: '1000'
    }
  }, React.createElement(Heading, {
    level: 3,
    margin: "none",
    color: "white"
  }, React.createElement("strong", null, "My App")), React.createElement(Button, {
    onClick: function onClick() {
      return setOpenNotification(!openNotification);
    },
    icon: React.createElement(Notification, {
      color: "white"
    })
  })), React.createElement(Box, {
    flex: true,
    direction: "row"
  }, React.createElement(Box, {
    flex: true,
    align: "center",
    justify: "center"
  }, "Dashboard content goes here, click on the notification icon"), React.createElement(Collapsible, {
    direction: "horizontal",
    open: openNotification
  }, React.createElement(Box, {
    flex: true,
    width: "medium",
    background: "light-2",
    pad: "small",
    elevation: "small"
  }, React.createElement(Text, {
    size: "xlarge"
  }, "Sidebar"))))));
};

storiesOf('Collapsible', module).add('Default', function () {
  return React.createElement(SimpleCollapsible, null);
}).add('Nested', function () {
  return React.createElement(NestedCollapsible, null);
}).add('Horizontal', function () {
  return React.createElement(HorizontalCollapsible, null);
});