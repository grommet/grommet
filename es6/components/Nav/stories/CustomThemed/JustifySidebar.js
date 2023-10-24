var _excluded = ["label"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
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
    background: "neutral-1"
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