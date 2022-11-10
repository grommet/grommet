"use strict";

exports.__esModule = true;
exports["default"] = exports.Custom = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Custom = function Custom() {
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
exports.Custom = Custom;
var _default = {
  title: 'Visualizations/Skeleton/Custom Themed/Custom'
};
exports["default"] = _default;