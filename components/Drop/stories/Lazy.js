"use strict";

exports.__esModule = true;
exports.Lazy = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var lazyTheme = (0, _utils.deepMerge)(_themes.grommet, {
  global: {
    drop: {
      background: 'rgba(255, 255, 255, 0.7)'
    }
  }
});
var finalLazyPad = 'xlarge';

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
    align: {
      top: 'bottom',
      left: 'left'
    },
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
    align: {
      bottom: 'top',
      right: 'right'
    },
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
    align: {
      bottom: 'top',
      left: 'left'
    },
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
    align: {
      top: 'bottom',
      right: 'right'
    },
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

var Lazy = function Lazy() {
  return /*#__PURE__*/_react["default"].createElement(LazyDrop, null);
};

exports.Lazy = Lazy;
Lazy.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};