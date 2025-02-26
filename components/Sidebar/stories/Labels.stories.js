"use strict";

exports.__esModule = true;
exports["default"] = exports.Labels = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
var _Sidebar = require("../Sidebar");
var _excluded = ["icon", "label"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
var SidebarHeader = function SidebarHeader() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    gap: "small",
    direction: "row",
    margin: {
      bottom: 'large'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
    alignSelf: "start",
    align: "center",
    anchor: "top-right"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    src: src
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xsmall",
    background: "orange",
    round: true,
    responsive: false
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Shimrit Yacobi"));
};
var SidebarButton = function SidebarButton(_ref) {
  var icon = _ref.icon,
    label = _ref.label,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    gap: "medium",
    alignSelf: "start",
    plain: true,
    icon: icon,
    label: label
  }, rest)));
};
var SidebarFooter = function SidebarFooter() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Nav, {
    "aria-label": "sidebar footer"
  }, /*#__PURE__*/_react["default"].createElement(SidebarButton, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Chat, null)
  }), /*#__PURE__*/_react["default"].createElement(SidebarButton, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Help, null)
  }));
};
var MainNavigation = function MainNavigation() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Nav, {
    "aria-label": "main navigation",
    gap: "large",
    responsive: false
  }, /*#__PURE__*/_react["default"].createElement(SidebarButton, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.StatusInfoSmall, null),
    label: "Focus"
  }), /*#__PURE__*/_react["default"].createElement(SidebarButton, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Projects, null),
    label: "Services"
  }), /*#__PURE__*/_react["default"].createElement(SidebarButton, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Clock, null),
    label: "Glances"
  }), /*#__PURE__*/_react["default"].createElement(SidebarButton, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Split, null),
    label: "Flows"
  }), /*#__PURE__*/_react["default"].createElement(SidebarButton, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Analytics, null),
    label: "Analytics"
  }), /*#__PURE__*/_react["default"].createElement(SidebarButton, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Configure, null),
    label: "Configure"
  }));
};
var Labels = exports.Labels = function Labels() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      direction: "row",
      height: {
        min: '100%'
      }
    }, /*#__PURE__*/_react["default"].createElement(_Sidebar.Sidebar, {
      responsive: false,
      background: "light-2",
      header: /*#__PURE__*/_react["default"].createElement(SidebarHeader, null),
      footer: /*#__PURE__*/_react["default"].createElement(SidebarFooter, null),
      pad: {
        left: 'medium',
        right: 'large',
        vertical: 'medium'
      }
    }, /*#__PURE__*/_react["default"].createElement(MainNavigation, null)))
    // </Grommet>
  );
};
Labels.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Layout/Sidebar/Labels'
};