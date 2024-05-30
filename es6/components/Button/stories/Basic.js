function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Box, Button } from 'grommet';
export var Basic = function Basic(props) {
  return /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Button, _extends({
    label: "Default",
    onClick: function onClick() {}
  }, props))), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Button, {
    label: "Anchor",
    href: "#"
  })), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Button, _extends({
    disabled: true,
    label: "Disabled",
    onClick: function onClick() {}
  }, props))), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Button, _extends({
    primary: true,
    label: "Primary",
    onClick: function onClick() {}
  }, props))), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Button, _extends({
    primary: true,
    label: "Active Primary",
    active: true,
    onClick: function onClick() {}
  }, props))));
};
export default {
  title: 'Controls/Button/Basic'
};