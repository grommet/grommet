var _excluded = ["label"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useState } from 'react';
import { Box, Button, Grommet, Nav } from 'grommet';
import { Dashboard } from "grommet-icons/es6/icons/Dashboard";
import { Device } from "grommet-icons/es6/icons/Device";
import { SettingsOption } from "grommet-icons/es6/icons/SettingsOption";
var theme = {
  button: {
    padding: {
      horizontal: '12px',
      vertical: '6px'
    },
    border: {
      width: '0px',
      radius: '1px'
    }
  }
};
var SidebarButton = function SidebarButton(_ref) {
  var label = _ref.label,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Button, _extends({}, rest, {
    label: label
  }));
};
var SidebarNav = function SidebarNav() {
  var _useState = useState(),
    active = _useState[0],
    setActive = _useState[1];
  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: theme
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    direction: "row"
  }, /*#__PURE__*/React.createElement(Nav, {
    background: "dark-2"
  }, [{
    label: 'Dashboard',
    icon: /*#__PURE__*/React.createElement(Dashboard, null),
    justify: 'center'
  }, {
    label: 'Devices',
    icon: /*#__PURE__*/React.createElement(Device, null),
    justify: 'end'
  }, {
    label: 'Settings',
    icon: /*#__PURE__*/React.createElement(SettingsOption, null),
    justify: 'between'
  }].map(function (item) {
    return /*#__PURE__*/React.createElement(SidebarButton, {
      key: item.label,
      label: item.label,
      active: item.label === active,
      onClick: function onClick() {
        return setActive(item.label);
      },
      icon: item.icon,
      justify: item.justify
    });
  }))));
};
export var JustifySidebar = function JustifySidebar() {
  return /*#__PURE__*/React.createElement(SidebarNav, null);
};
JustifySidebar.storyName = 'Justify Sidebar';
export default {
  title: 'Controls/Nav/Custom Themed/Justify Sidebar'
};