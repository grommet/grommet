"use strict";

exports.__esModule = true;
exports["default"] = exports.Custom = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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