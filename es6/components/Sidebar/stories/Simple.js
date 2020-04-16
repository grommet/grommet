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
  return React.createElement(Avatar, {
    border: {
      size: 'small',
      color: 'accent-2'
    },
    background: "white"
  }, "SY");
};

var SidebarFooter = function SidebarFooter() {
  return React.createElement(Nav, {
    gap: "small"
  }, React.createElement(Button, {
    icon: React.createElement(Chat, null),
    hoverIndicator: true
  }), React.createElement(Button, {
    icon: React.createElement(Help, null),
    hoverIndicator: true
  }));
};

var MainNavigation = function MainNavigation() {
  return React.createElement(Nav, {
    gap: "small"
  }, React.createElement(Button, {
    icon: React.createElement(StatusInfoSmall, null),
    hoverIndicator: true
  }), React.createElement(Button, {
    icon: React.createElement(Projects, null),
    hoverIndicator: true
  }), React.createElement(Button, {
    icon: React.createElement(Clock, null),
    hoverIndicator: true
  }), React.createElement(Box, {
    pad: "small",
    border: {
      color: 'white',
      side: 'bottom'
    },
    hoverIndicator: true
  }), React.createElement(Box, {
    gap: "small",
    pad: {
      vertical: 'medium'
    },
    hoverIndicator: true
  }, React.createElement(Button, {
    icon: React.createElement(Analytics, null),
    hoverIndicator: true
  }), React.createElement(Button, {
    icon: React.createElement(Configure, null),
    hoverIndicator: true
  })));
};

export var SidebarIcons = function SidebarIcons() {
  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    direction: "row",
    height: {
      min: '100%'
    }
  }, React.createElement(Sidebar, {
    background: "accent-1",
    header: React.createElement(SidebarHeader, null),
    footer: React.createElement(SidebarFooter, null)
  }, React.createElement(MainNavigation, null))));
};
storiesOf('Sidebar', module).add('Icons', function () {
  return React.createElement(SidebarIcons, null);
});