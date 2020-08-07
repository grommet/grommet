"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _grommetIcons = require("grommet-icons");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DualCalendar = function DualCalendar() {
  var _useState = (0, _react.useState)(),
      date = _useState[0],
      setDate = _useState[1];

  var _useState2 = (0, _react.useState)(),
      dates = _useState2[0],
      setDates = _useState2[1];

  var _useState3 = (0, _react.useState)('2020-08-07T15:13:47.290Z'),
      reference1 = _useState3[0],
      setReference1 = _useState3[1];

  var _useState4 = (0, _react.useState)('2020-09-01T15:15:34.916Z'),
      reference2 = _useState4[0],
      setReference2 = _useState4[1];

  var onSelect = function onSelect(arg) {
    if (Array.isArray(arg)) {
      setDate(undefined);
      setDates(arg);
    } else {
      setDate(arg);
      setDates(undefined);
    }
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    justify: "center",
    pad: "large",
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    animate: false,
    showAdjacentDays: false,
    range: true,
    date: date,
    dates: dates,
    onSelect: onSelect,
    reference: reference1,
    onReference: function onReference(reference) {
      var refDate = new Date(reference);
      var nextDate = new Date(refDate);
      console.log(refDate);
      console.log(nextDate);
      nextDate.setMonth(refDate.getMonth() + 1, 1);
      setReference1(refDate);
      setReference2(nextDate);
    },
    header: function header(_ref) {
      var currentDate = _ref.date,
          locale = _ref.locale,
          onPreviousMonth = _ref.onPreviousMonth,
          previousInBound = _ref.previousInBound;
      return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        direction: "row",
        align: "center",
        justify: "between"
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
        disabled: !previousInBound,
        icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Previous, null),
        onClick: onPreviousMonth
      }), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
        level: 3,
        margin: "none"
      }, currentDate.toLocaleDateString(locale, {
        month: 'long',
        year: 'numeric'
      })), /*#__PURE__*/_react["default"].createElement(_grommetIcons.Blank, null));
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    animate: false,
    showAdjacentDays: false,
    date: date,
    dates: dates,
    range: true,
    onSelect: onSelect,
    reference: reference2,
    onReference: function onReference(reference) {
      var refDate = new Date(reference);
      var priorDate = new Date(refDate);
      priorDate.setMonth(refDate.getMonth() - 1, 1);
      setReference1(priorDate);
      setReference2(refDate);
    },
    header: function header(_ref2) {
      var currentDate = _ref2.date,
          locale = _ref2.locale,
          onNextMonth = _ref2.onNextMonth,
          nextInBound = _ref2.nextInBound;
      return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        direction: "row",
        align: "center",
        justify: "between"
      }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Blank, null), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
        level: 3,
        margin: "none"
      }, currentDate.toLocaleDateString(locale, {
        month: 'long',
        year: 'numeric'
      })), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
        disabled: !nextInBound,
        icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Next, null),
        onClick: onNextMonth
      }));
    }
  })));
};

(0, _react2.storiesOf)('Calendar', module).add('Dual', function () {
  return /*#__PURE__*/_react["default"].createElement(DualCalendar, null);
});