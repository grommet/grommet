"use strict";

exports.__esModule = true;
exports["default"] = exports.Custom = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var Custom = exports.Custom = function Custom() {
  var customTheme = {
    skeleton: {
      colors: {
        light: ['#a2a8a8', '#adb9ba']
      },
      round: 'xsmall'
    },
    button: {
      skeleton: {
        round: 'xsmall'
      }
    },
    heading: {
      skeleton: {
        width: 'medium'
      }
    },
    text: {
      skeleton: {
        colors: {
          light: ['#c5d9d9', '#b2d6d6']
        }
      }
    }
  };
  var _useState = (0, _react.useState)(true),
    skeleton = _useState[0],
    setSkeleton = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    alignSelf: "start",
    label: "Toggle skeleton",
    onClick: function onClick() {
      return setSkeleton(!skeleton);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "small",
    pad: "small",
    align: "start",
    skeleton: skeleton
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 1
  }, "Heading 1"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "text"), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 2
  }, "Heading 2"), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    alignSelf: "end",
    label: "button"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "text"))));
};
var _default = exports["default"] = {
  title: 'Visualizations/Skeleton/Custom Themed/Custom'
};