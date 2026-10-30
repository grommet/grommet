"use strict";

exports.__esModule = true;
exports["default"] = exports.Styled = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var alignBottomLeft = {
  top: 'bottom',
  left: 'left'
};
var alignTopLeft = {
  bottom: 'top',
  left: 'left'
};
var StyledDrop = function StyledDrop() {
  var targetRef = (0, _react.useRef)();
  var _useState = (0, _react.useState)(false),
    setShowDrop = _useState[1];
  (0, _react.useEffect)(function () {
    setShowDrop(true);
  }, []);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: "dark-2",
      pad: "medium",
      align: "center",
      justify: "start",
      ref: targetRef
    }, "Target"), targetRef.current && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_grommet.Drop, {
      align: alignBottomLeft,
      target: targetRef.current,
      elevation: "large",
      margin: {
        top: 'medium'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "large"
    }, "Drop Contents with elevation and margin")), /*#__PURE__*/_react["default"].createElement(_grommet.Drop, {
      align: alignTopLeft,
      target: targetRef.current,
      round: "large",
      background: "background-contrast",
      margin: {
        bottom: 'small'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "large"
    }, "Drop Contents with round, background and margin"))))
    // </Grommet>
  );
};
var Styled = exports.Styled = function Styled() {
  return /*#__PURE__*/_react["default"].createElement(StyledDrop, null);
};
Styled.parameters = {
  chromatic: {
    disable: true
  }
};
Styled.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Controls/Drop/Styled'
};