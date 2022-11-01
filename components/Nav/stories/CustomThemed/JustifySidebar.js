"use strict";

exports.__esModule = true;
exports["default"] = exports.JustifySidebar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
var _excluded = ["label"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
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
  return /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({}, rest, {
    label: label
  }));
};
var SidebarNav = function SidebarNav() {
  var _useState = (0, _react.useState)(),
    active = _useState[0],
    setActive = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: theme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    direction: "row"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Nav, {
    background: "neutral-1"
  }, [{
    label: 'Dashboard',
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Dashboard, null),
    justify: 'center'
  }, {
    label: 'Devices',
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Device, null),
    justify: 'end'
  }, {
    label: 'Settings',
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.SettingsOption, null),
    justify: 'between'
  }].map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(SidebarButton, {
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
var JustifySidebar = function JustifySidebar() {
  return /*#__PURE__*/_react["default"].createElement(SidebarNav, null);
};
exports.JustifySidebar = JustifySidebar;
JustifySidebar.storyName = 'Justify Sidebar';
var _default = {
  title: 'Controls/Nav/Custom Themed/Justify Sidebar'
};
exports["default"] = _default;