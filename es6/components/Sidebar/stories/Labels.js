function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Avatar, Button, Box, grommet, Grommet, Nav, Stack, Text } from 'grommet';
import { Analytics } from "grommet-icons/es6/icons/Analytics";
import { Chat } from "grommet-icons/es6/icons/Chat";
import { Clock } from "grommet-icons/es6/icons/Clock";
import { Configure } from "grommet-icons/es6/icons/Configure";
import { Help } from "grommet-icons/es6/icons/Help";
import { Projects } from "grommet-icons/es6/icons/Projects";
import { Split } from "grommet-icons/es6/icons/Split";
import { StatusInfoSmall } from "grommet-icons/es6/icons/StatusInfoSmall";
import { Sidebar } from '../Sidebar';
var src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

var SidebarHeader = function SidebarHeader() {
  return React.createElement(Box, {
    align: "center",
    gap: "small",
    direction: "row",
    margin: {
      bottom: 'large'
    }
  }, React.createElement(Stack, {
    alignSelf: "start",
    align: "center",
    anchor: "top-right"
  }, React.createElement(Avatar, {
    src: src
  }), React.createElement(Box, {
    pad: "xsmall",
    background: "orange",
    round: true,
    responsive: false
  })), React.createElement(Text, null, "Shimrit Yacobi"));
};

var SidebarButton = function SidebarButton(_ref) {
  var icon = _ref.icon,
      label = _ref.label,
      rest = _objectWithoutPropertiesLoose(_ref, ["icon", "label"]);

  return React.createElement(Box, {
    pad: "small"
  }, React.createElement(Button, _extends({
    gap: "medium",
    alignSelf: "start",
    plain: true,
    icon: icon,
    label: label
  }, rest)));
};

var SidebarFooter = function SidebarFooter() {
  return React.createElement(Nav, null, React.createElement(SidebarButton, {
    icon: React.createElement(Chat, null),
    label: "Chat"
  }), React.createElement(SidebarButton, {
    icon: React.createElement(Help, null),
    label: "Support"
  }));
};

var MainNavigation = function MainNavigation() {
  return React.createElement(Nav, {
    gap: "large",
    responsive: false
  }, React.createElement(SidebarButton, {
    icon: React.createElement(StatusInfoSmall, null),
    label: "Focus"
  }), React.createElement(SidebarButton, {
    icon: React.createElement(Projects, null),
    label: "Services"
  }), React.createElement(SidebarButton, {
    icon: React.createElement(Clock, null),
    label: "Glances"
  }), React.createElement(SidebarButton, {
    icon: React.createElement(Split, null),
    label: "Flows"
  }), React.createElement(SidebarButton, {
    icon: React.createElement(Analytics, null),
    label: "Analytics"
  }), React.createElement(SidebarButton, {
    icon: React.createElement(Configure, null),
    label: "Configure"
  }));
};

export var Labels = function Labels() {
  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    direction: "row",
    height: {
      min: '100%'
    }
  }, React.createElement(Sidebar, {
    responsive: false,
    background: "neutral-2",
    header: React.createElement(SidebarHeader, null),
    footer: React.createElement(SidebarFooter, null),
    pad: {
      left: 'medium',
      right: 'large',
      vertical: 'medium'
    }
  }, React.createElement(MainNavigation, null))));
};
storiesOf('Sidebar', module).add('Labels', function () {
  return React.createElement(Labels, null);
});