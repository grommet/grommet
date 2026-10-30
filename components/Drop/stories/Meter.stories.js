"use strict";

exports.__esModule = true;
exports["default"] = exports.SVGChild = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var align = {
  top: 'bottom',
  left: 'left'
};
var TestDrop = function TestDrop() {
  var targetRef = (0, _react.useRef)();
  var _useState = (0, _react.useState)(false),
    setShowDrop = _useState[1];
  (0, _react.useEffect)(function () {
    return setShowDrop(true);
  }, []);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Meter, {
      ref: targetRef,
      size: "small",
      background: "light-2",
      values: [{
        value: 20,
        color: 'brand'
      }]
    }), targetRef.current && /*#__PURE__*/_react["default"].createElement(_grommet.Drop, {
      id: "test-drop-with-svg",
      plain: true,
      align: align,
      target: targetRef.current
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "large"
    }, "target is an svg")))
    // </Grommet>
  );
};
var SVGChild = exports.SVGChild = function SVGChild() {
  return /*#__PURE__*/_react["default"].createElement(TestDrop, null);
};
SVGChild.parameters = {
  chromatic: {
    disable: true
  }
};
SVGChild.storyName = 'SVG child';
SVGChild.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Controls/Drop/SVG child'
};