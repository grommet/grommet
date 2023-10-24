"use strict";

exports.__esModule = true;
exports["default"] = exports.Lazy = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _themes = require("grommet/themes");
var _utils = require("grommet/utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var lazyTheme = (0, _utils.deepMerge)(_themes.grommet, {
  global: {
    drop: {
      background: 'rgba(255, 255, 255, 0.7)'
    }
  }
});
var finalLazyPad = 'xlarge';
var alignBottomLeft = {
  top: 'bottom',
  left: 'left'
};
var alignTopRight = {
  bottom: 'top',
  right: 'right'
};
var alignTopLeft = {
  bottom: 'top',
  left: 'left'
};
var alignBottomRight = {
  top: 'bottom',
  right: 'right'
};
var LazyDrop = function LazyDrop() {
  var _useState = (0, _react.useState)(null),
    pad = _useState[0],
    setPad = _useState[1];
  var topLeftTargetRef = (0, _react.useRef)();
  var topRightTargetRef = (0, _react.useRef)();
  var bottomLeftTargetRef = (0, _react.useRef)();
  var bottomRightTargetRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    setPad('small');
    setTimeout(function () {
      setPad(finalLazyPad);
    }, 2000);
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: lazyTheme,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    justify: "between",
    pad: "large",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    justify: "between",
    pad: {
      horizontal: 'small'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "dark-3",
    pad: "medium",
    align: "center",
    ref: topLeftTargetRef
  }, "Target"), topLeftTargetRef.current && /*#__PURE__*/_react["default"].createElement(_grommet.Drop, {
    align: alignBottomLeft,
    target: topLeftTargetRef.current,
    responsive: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    height: pad === 'small' ? 'xsmall' : undefined,
    pad: {
      horizontal: 'xlarge',
      vertical: pad
    }
  }, "align top to bottom")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "dark-3",
    pad: "medium",
    align: "center",
    ref: topRightTargetRef
  }, "Target"), topRightTargetRef.current && /*#__PURE__*/_react["default"].createElement(_grommet.Drop, {
    align: alignTopRight,
    target: topRightTargetRef.current,
    responsive: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    height: pad === 'small' ? 'xsmall' : undefined,
    pad: {
      horizontal: 'xlarge',
      vertical: pad
    }
  }, "align bottom to top"))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    justify: "between"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "dark-3",
    pad: "medium",
    ref: bottomLeftTargetRef
  }, "Target"), bottomLeftTargetRef.current && /*#__PURE__*/_react["default"].createElement(_grommet.Drop, {
    align: alignTopLeft,
    target: bottomLeftTargetRef.current,
    responsive: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    height: pad === 'small' ? 'xsmall' : undefined,
    pad: {
      horizontal: 'xlarge',
      vertical: pad
    }
  }, "align bottom to top")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "dark-3",
    pad: "medium",
    ref: bottomRightTargetRef
  }, "Target"), bottomRightTargetRef.current && /*#__PURE__*/_react["default"].createElement(_grommet.Drop, {
    align: alignBottomRight,
    target: bottomRightTargetRef.current,
    responsive: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    height: pad === 'small' ? 'xsmall' : undefined,
    pad: {
      horizontal: 'xlarge',
      vertical: pad
    }
  }, "align top to bottom")))));
};
var Lazy = exports.Lazy = function Lazy() {
  return /*#__PURE__*/_react["default"].createElement(LazyDrop, null);
};
Lazy.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Controls/Drop/Custom Themed/Lazy'
};