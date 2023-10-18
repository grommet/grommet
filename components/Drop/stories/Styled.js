"use strict";

exports.__esModule = true;
exports["default"] = exports.Styled = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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