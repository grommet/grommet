"use strict";

exports.__esModule = true;
exports["default"] = exports.Themed = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    background: "dark-3",
    pad: "medium",
    align: "center",
    justify: "start",
    ref: targetRef
  }, "Box"), targetRef.current && /*#__PURE__*/_react["default"].createElement(_grommet.Drop, {
    align: {
      top: 'bottom',
      left: 'right'
    },
    target: targetRef.current
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, "This Drop uses a custom theme"))));
};

var Themed = function Themed() {
  return /*#__PURE__*/_react["default"].createElement(ThemedDrop, null);
};

exports.Themed = Themed;
Themed.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Controls/Drop/Themed'
};
exports["default"] = _default;