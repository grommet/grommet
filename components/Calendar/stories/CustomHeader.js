"use strict";

exports.__esModule = true;
exports["default"] = exports.CustomHeaderCalendar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _grommetIcons = require("grommet-icons");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var CustomHeaderCalendar = function CustomHeaderCalendar() {
  var _useState = (0, _react.useState)(),
      date = _useState[0],
      setDate = _useState[1];

  var onSelect = function onSelect(nextDate) {
    setDate(nextDate !== date ? nextDate : undefined);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    date: date,
    onSelect: onSelect,
    size: "small",
    bounds: ['2020-09-08', '2025-12-13'],
    header: function header(_ref) {
      var currentDate = _ref.date,
          locale = _ref.locale,
          onPreviousMonth = _ref.onPreviousMonth,
          onNextMonth = _ref.onNextMonth,
          previousInBound = _ref.previousInBound,
          nextInBound = _ref.nextInBound;
      return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        direction: "row",
        align: "center",
        justify: "between"
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
        disabled: !previousInBound,
        onClick: onPreviousMonth
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormPreviousLink, null))), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        size: "small"
      }, /*#__PURE__*/_react["default"].createElement("strong", null, currentDate.toLocaleDateString(locale, {
        month: 'long',
        year: 'numeric'
      }))), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
        disabled: !nextInBound,
        onClick: onNextMonth
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormNextLink, null))));
    }
  })));
};

exports.CustomHeaderCalendar = CustomHeaderCalendar;
CustomHeaderCalendar.storyName = 'Header';
var _default = {
  title: 'Visualizations/Calendar/Header'
};
exports["default"] = _default;