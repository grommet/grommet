"use strict";

exports.__esModule = true;
exports["default"] = exports.SVGChild = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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