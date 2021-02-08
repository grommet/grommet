"use strict";

exports.__esModule = true;
exports["default"] = exports.Sidebar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SidebarButton = function SidebarButton(_ref) {
  var label = _ref.label,
      rest = _objectWithoutPropertiesLoose(_ref, ["label"]);

  return /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    plain: true
  }, rest), function (_ref2) {
    var hover = _ref2.hover;
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: hover ? 'accent-1' : undefined,
      pad: {
        horizontal: 'large',
        vertical: 'medium'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "large"
    }, label));
  });
};

var SidebarNav = function SidebarNav() {
  var _useState = (0, _react.useState)(),
      active = _useState[0],
      setActive = _useState[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _grommet.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    direction: "row"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Nav, {
    background: "neutral-1"
  }, ['Dashboard', 'Devices', 'Settings'].map(function (label) {
    return /*#__PURE__*/_react["default"].createElement(SidebarButton, {
      key: label,
      label: label,
      active: label === active,
      onClick: function onClick() {
        return setActive(label);
      }
    });
  }))));
};

var Sidebar = function Sidebar() {
  return /*#__PURE__*/_react["default"].createElement(SidebarNav, null);
};

exports.Sidebar = Sidebar;
var _default = {
  title: 'Controls/Nav/Sidebar'
};
exports["default"] = _default;