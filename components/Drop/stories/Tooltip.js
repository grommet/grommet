"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var TooltipButton = function TooltipButton(_ref) {
  var icon = _ref.icon,
      name = _ref.name;

  var _useState = (0, _react.useState)(false),
      over = _useState[0],
      setOver = _useState[1];

  var ref = (0, _react.useRef)();
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    ref: ref,
    onMouseOver: function onMouseOver() {
      return setOver(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setOver(false);
    },
    onFocus: function onFocus() {
      return setOver(true);
    },
    onBlur: function onBlur() {
      return setOver(false);
    },
    plain: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: {
      vertical: 'small'
    },
    align: "center"
  }, icon)), ref.current && over && /*#__PURE__*/_react["default"].createElement(_grommet.Drop, {
    align: {
      left: 'right'
    },
    target: ref.current,
    plain: true // trapFocus set to false allows tabbing through
    ,
    trapFocus: false
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    background: "pink"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "white"
  }, name))));
};

var Tooltip = function Tooltip() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(TooltipButton, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Calculator, null),
    name: "Calculator"
  }), /*#__PURE__*/_react["default"].createElement(TooltipButton, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Bug, null),
    name: "Bug"
  }), /*#__PURE__*/_react["default"].createElement(TooltipButton, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Achievement, null),
    name: "Achievement"
  })));
};

(0, _react2.storiesOf)('Drop', module).add('Tooltip', function () {
  return /*#__PURE__*/_react["default"].createElement(Tooltip, null);
});