import React from 'react';
import { storiesOf } from '@storybook/react';
import { Avatar, Button, Box, grommet, Grommet, Nav, Sidebar } from 'grommet';
import { Analytics } from "grommet-icons/es6/icons/Analytics";
import { Chat } from "grommet-icons/es6/icons/Chat";
import { Clock } from "grommet-icons/es6/icons/Clock";
import { Configure } from "grommet-icons/es6/icons/Configure";
import { Help } from "grommet-icons/es6/icons/Help";
import { Projects } from "grommet-icons/es6/icons/Projects";
import { StatusInfoSmall } from "grommet-icons/es6/icons/StatusInfoSmall";

var SidebarHeader = function SidebarHeader() {
  return /*#__PURE__*/React.createElement(Avatar, {
    border: {
      size: 'small',
      color: 'accent-2'
    },
    background: "white"
  }, "SY");
};

var SidebarFooter = function SidebarFooter() {
  return /*#__PURE__*/React.createElement(Nav, {
    gap: "small"
  }, /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(Chat, null),
    hoverIndicator: true
  }), /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(Help, null),
    hoverIndicator: true
  }));
};

var MainNavigation = function MainNavigation() {
  return /*#__PURE__*/React.createElement(Nav, {
    gap: "small"
  }, /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(StatusInfoSmall, null),
    hoverIndicator: true
  }), /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(Projects, null),
    hoverIndicator: true
  }), /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(Clock, null),
    hoverIndicator: true
  }), /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    border: {
      color: 'white',
      side: 'bottom'
    },
    hoverIndicator: true
  }), /*#__PURE__*/React.createElement(Box, {
    gap: "small",
    pad: {
      vertical: 'medium'
    },
    hoverIndicator: true
  }, /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(Analytics, null),
    hoverIndicator: true
  }), /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(Configure, null),
    hoverIndicator: true
  })));
};

export var SidebarIcons = function SidebarIcons() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    height: {
      min: '100%'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    background: "accent-1",
    header: /*#__PURE__*/React.createElement(SidebarHeader, null),
    footer: /*#__PURE__*/React.createElement(SidebarFooter, null)
  }, /*#__PURE__*/React.createElement(MainNavigation, null))));
};
storiesOf('Sidebar', module).add('Icons', function () {
  return /*#__PURE__*/React.createElement(SidebarIcons, null);
});