"use strict";

exports.__esModule = true;
exports["default"] = exports.CustomSizeCalendar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("grommet/utils");

var _grommet = require("grommet");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var customHeading = (0, _utils.deepMerge)(_grommet.grommet, {
  calendar: {
    heading: {
      level: '3'
    }
  }
});

var CustomSizeCalendar = function CustomSizeCalendar() {
  var _useState = (0, _react.useState)(),
      date = _useState[0],
      setDate = _useState[1];

  var onSelect = function onSelect(nextDate) {
    setDate(nextDate !== date ? nextDate : undefined);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customHeading
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    date: date,
    onSelect: onSelect,
    bounds: ['2020-09-08', '2025-12-13']
  })));
};

exports.CustomSizeCalendar = CustomSizeCalendar;
CustomSizeCalendar.storyName = 'Heading size';
var _default = {
  title: "Visualizations/Calendar/Heading size"
};
exports["default"] = _default;