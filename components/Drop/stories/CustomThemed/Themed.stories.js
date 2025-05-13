"use strict";

exports.__esModule = true;
exports["default"] = exports.Themed = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _themes = require("grommet/themes");
var _utils = require("grommet/utils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var customTheme = (0, _utils.deepMerge)(_themes.grommet, {
  global: {
    drop: {
      background: {
        dark: 'neutral-2',
        light: 'background-contrast'
      },
      border: {
        radius: '10px'
      },
      // impacting 'round' behavior
      zIndex: '13',
      elevation: 'large',
      // impacting the elevation
      margin: 'xsmall',
      intelligentMargin: true
    }
  }
});
var align = {
  top: 'bottom',
  left: 'right'
};
var ThemedDrop = function ThemedDrop() {
  var _useState = (0, _react.useState)(false),
    setShowDrop = _useState[1];
  var targetRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    return setShowDrop(true);
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customTheme,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "dark-2",
    pad: "medium",
    align: "center",
    justify: "start",
    ref: targetRef
  }, "Box"), targetRef.current && /*#__PURE__*/_react["default"].createElement(_grommet.Drop, {
    align: align,
    target: targetRef.current
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, "This Drop uses a custom theme"))));
};
var Themed = exports.Themed = function Themed() {
  return /*#__PURE__*/_react["default"].createElement(ThemedDrop, null);
};
Themed.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Controls/Drop/Custom Themed/Themed'
};