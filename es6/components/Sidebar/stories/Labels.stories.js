var _excluded = ["icon", "label"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';
import { Avatar, Button, Box, Nav, Stack, Text } from 'grommet';
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
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
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
  return /*#__PURE__*/React.createElement(Nav, {
    "aria-label": "sidebar footer"
  }, /*#__PURE__*/React.createElement(SidebarButton, {
    icon: /*#__PURE__*/React.createElement(Chat, null)
  }), /*#__PURE__*/React.createElement(SidebarButton, {
    icon: /*#__PURE__*/React.createElement(Help, null)
  }));
};
var MainNavigation = function MainNavigation() {
  return /*#__PURE__*/React.createElement(Nav, {
    "aria-label": "main navigation",
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
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      direction: "row",
      height: {
        min: '100%'
      }
    }, /*#__PURE__*/React.createElement(Sidebar, {
      responsive: false,
      background: "light-2",
      header: /*#__PURE__*/React.createElement(SidebarHeader, null),
      footer: /*#__PURE__*/React.createElement(SidebarFooter, null),
      pad: {
        left: 'medium',
        right: 'large',
        vertical: 'medium'
      }
    }, /*#__PURE__*/React.createElement(MainNavigation, null)))
    // </Grommet>
  );
};
Labels.args = {
  full: true
};
export default {
  title: 'Layout/Sidebar/Labels'
};