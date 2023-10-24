"use strict";

exports.__esModule = true;
exports["default"] = exports.TrapFocus = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var align = {
  left: 'right'
};
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
    align: align,
    target: ref.current,
    margin: {
      horizontal: 'small'
    }
    // trapFocus set to false allows tabbing through the buttons
    ,
    trapFocus: false
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    background: "brand"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "white"
  }, name))));
};
var TrapFocus = exports.TrapFocus = function TrapFocus() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Nav, {
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
    }))
    // </Grommet>
  );
};

TrapFocus.parameters = {
  chromatic: {
    disable: true
  }
};
TrapFocus.storyName = 'Trap focus';
var _default = exports["default"] = {
  title: 'Controls/Drop/Trap focus'
};