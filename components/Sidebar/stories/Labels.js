"use strict";

exports.__esModule = true;
exports.Labels = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

var _Sidebar = require("../Sidebar");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

var SidebarHeader = function SidebarHeader() {
  return _react["default"].createElement(_grommet.Box, {
    align: "center",
    gap: "small",
    direction: "row",
    margin: {
      bottom: 'large'
    }
  }, _react["default"].createElement(_grommet.Stack, {
    alignSelf: "start",
    align: "center",
    anchor: "top-right"
  }, _react["default"].createElement(_grommet.Avatar, {
    src: src
  }), _react["default"].createElement(_grommet.Box, {
    pad: "xsmall",
    background: "orange",
    round: true,
    responsive: false
  })), _react["default"].createElement(_grommet.Text, null, "Shimrit Yacobi"));
};

var SidebarButton = function SidebarButton(_ref) {
  var icon = _ref.icon,
      label = _ref.label,
      rest = _objectWithoutPropertiesLoose(_ref, ["icon", "label"]);

  return _react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, _react["default"].createElement(_grommet.Button, _extends({
    gap: "medium",
    alignSelf: "start",
    plain: true,
    icon: icon,
    label: label
  }, rest)));
};

var SidebarFooter = function SidebarFooter() {
  return _react["default"].createElement(_grommet.Nav, null, _react["default"].createElement(SidebarButton, {
    icon: _react["default"].createElement(_grommetIcons.Chat, null),
    label: "Chat"
  }), _react["default"].createElement(SidebarButton, {
    icon: _react["default"].createElement(_grommetIcons.Help, null),
    label: "Support"
  }));
};

var MainNavigation = function MainNavigation() {
  return _react["default"].createElement(_grommet.Nav, {
    gap: "large",
    responsive: false
  }, _react["default"].createElement(SidebarButton, {
    icon: _react["default"].createElement(_grommetIcons.StatusInfoSmall, null),
    label: "Focus"
  }), _react["default"].createElement(SidebarButton, {
    icon: _react["default"].createElement(_grommetIcons.Projects, null),
    label: "Services"
  }), _react["default"].createElement(SidebarButton, {
    icon: _react["default"].createElement(_grommetIcons.Clock, null),
    label: "Glances"
  }), _react["default"].createElement(SidebarButton, {
    icon: _react["default"].createElement(_grommetIcons.Split, null),
    label: "Flows"
  }), _react["default"].createElement(SidebarButton, {
    icon: _react["default"].createElement(_grommetIcons.Analytics, null),
    label: "Analytics"
  }), _react["default"].createElement(SidebarButton, {
    icon: _react["default"].createElement(_grommetIcons.Configure, null),
    label: "Configure"
  }));
};

var Labels = function Labels() {
  return _react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet,
    full: true
  }, _react["default"].createElement(_grommet.Box, {
    direction: "row",
    height: {
      min: '100%'
    }
  }, _react["default"].createElement(_Sidebar.Sidebar, {
    responsive: false,
    background: "neutral-2",
    header: _react["default"].createElement(SidebarHeader, null),
    footer: _react["default"].createElement(SidebarFooter, null),
    pad: {
      left: 'medium',
      right: 'large',
      vertical: 'medium'
    }
  }, _react["default"].createElement(MainNavigation, null))));
};

exports.Labels = Labels;
(0, _react2.storiesOf)('Sidebar', module).add('Labels', function () {
  return _react["default"].createElement(Labels, null);
});