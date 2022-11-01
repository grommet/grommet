var _excluded = ["label"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useState } from 'react';
import { Box, Button, Nav, Text } from 'grommet';
var SidebarButton = function SidebarButton(_ref) {
  var label = _ref.label,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Button, _extends({
    plain: true
  }, rest), function (_ref2) {
    var hover = _ref2.hover;
    return /*#__PURE__*/React.createElement(Box, {
      background: hover ? 'teal' : undefined,
      pad: {
        horizontal: 'large',
        vertical: 'medium'
      }
    }, /*#__PURE__*/React.createElement(Text, {
      size: "large"
    }, label));
  });
};
var SidebarNav = function SidebarNav() {
  var _useState = useState(),
    active = _useState[0],
    setActive = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      fill: true,
      direction: "row"
    }, /*#__PURE__*/React.createElement(Nav, {
      background: "brand"
    }, ['Dashboard', 'Devices', 'Settings'].map(function (label) {
      return /*#__PURE__*/React.createElement(SidebarButton, {
        key: label,
        label: /*#__PURE__*/React.createElement(Text, {
          color: "white"
        }, label),
        active: label === active,
        onClick: function onClick() {
          return setActive(label);
        }
      });
    })))
    // </Grommet>
  );
};

export var Sidebar = function Sidebar() {
  return /*#__PURE__*/React.createElement(SidebarNav, null);
};
Sidebar.args = {
  full: true
};
export default {
  title: 'Controls/Nav/Sidebar'
};