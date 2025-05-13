"use strict";

exports.__esModule = true;
exports["default"] = exports.SVGChild = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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