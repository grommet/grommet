function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
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
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    gap: "small",
    direction: "row",
    margin: {
      bottom: 'large'
    }
  }, /*#__PURE__*/React.createElement(Stack, {
    alignSelf: "start",
    align: "center",
    anchor: "top-right"
  }, /*#__PURE__*/React.createElement(Avatar, {
    src: src
  }), /*#__PURE__*/React.createElement(Box, {
    pad: "xsmall",
    background: "orange",
    round: true,
    responsive: false
  })), /*#__PURE__*/React.createElement(Text, null, "Shimrit Yacobi"));
};

var SidebarButton = function SidebarButton(_ref) {
  var icon = _ref.icon,
      label = _ref.label,
      rest = _objectWithoutPropertiesLoose(_ref, ["icon", "label"]);

  return /*#__PURE__*/React.createElement(Box, {
    pad: "small"
  }, /*#__PURE__*/React.createElement(Button, _extends({
    gap: "medium",
    alignSelf: "start",
    plain: true,
    icon: icon,
    label: label
  }, rest)));
};

var SidebarFooter = function SidebarFooter() {
  return /*#__PURE__*/React.createElement(Nav, null, /*#__PURE__*/React.createElement(SidebarButton, {
    icon: /*#__PURE__*/React.createElement(Chat, null),
    label: "Chat"
  }), /*#__PURE__*/React.createElement(SidebarButton, {
    icon: /*#__PURE__*/React.createElement(Help, null),
    label: "Support"
  }));
};

var MainNavigation = function MainNavigation() {
  return /*#__PURE__*/React.createElement(Nav, {
    gap: "large",
    responsive: false
  }, /*#__PURE__*/React.createElement(SidebarButton, {
    icon: /*#__PURE__*/React.createElement(StatusInfoSmall, null),
    label: "Focus"
  }), /*#__PURE__*/React.createElement(SidebarButton, {
    icon: /*#__PURE__*/React.createElement(Projects, null),
    label: "Services"
  }), /*#__PURE__*/React.createElement(SidebarButton, {
    icon: /*#__PURE__*/React.createElement(Clock, null),
    label: "Glances"
  }), /*#__PURE__*/React.createElement(SidebarButton, {
    icon: /*#__PURE__*/React.createElement(Split, null),
    label: "Flows"
  }), /*#__PURE__*/React.createElement(SidebarButton, {
    icon: /*#__PURE__*/React.createElement(Analytics, null),
    label: "Analytics"
  }), /*#__PURE__*/React.createElement(SidebarButton, {
    icon: /*#__PURE__*/React.createElement(Configure, null),
    label: "Configure"
  }));
};

export var Labels = function Labels() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    height: {
      min: '100%'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    responsive: false,
    background: "neutral-2",
    header: /*#__PURE__*/React.createElement(SidebarHeader, null),
    footer: /*#__PURE__*/React.createElement(SidebarFooter, null),
    pad: {
      left: 'medium',
      right: 'large',
      vertical: 'medium'
    }
  }, /*#__PURE__*/React.createElement(MainNavigation, null))));
};