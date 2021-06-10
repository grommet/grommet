"use strict";

exports.__esModule = true;
exports["default"] = exports.TrapFocus = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    plain: true,
    align: {
      left: 'right'
    },
    target: ref.current,
    margin: {
      horizontal: 'small'
    } // trapFocus set to false allows tabbing through the buttons
    ,
    trapFocus: false
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    background: "brand"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "white"
  }, name))));
};

var TrapFocus = function TrapFocus() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Nav, {
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

exports.TrapFocus = TrapFocus;
TrapFocus.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Controls/Drop/Trap Focus'
};
exports["default"] = _default;