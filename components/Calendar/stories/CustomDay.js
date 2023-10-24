"use strict";

exports.__esModule = true;
exports["default"] = exports.CustomDayCalendar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var CustomDayCalendar = exports.CustomDayCalendar = function CustomDayCalendar() {
  var calendarContent = [7, 8, 9];
  var _useState = (0, _react.useState)(),
    selectedDay = _useState[0],
    setSelectedDay = _useState[1];
  var onSelect = function onSelect(value) {
    setSelectedDay(value);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      level: 4
    }, "Example without onSelect set"), /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
      date: selectedDay,
      fill: true
    }, function (_ref) {
      var date = _ref.date,
        day = _ref.day,
        isSelected = _ref.isSelected;
      var hasContent = calendarContent.includes(day);
      return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        background: isSelected ? 'light-3' : 'white',
        onClick: function onClick() {
          return onSelect(date.toISOString());
        },
        border: true,
        fill: true
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
        anchor: "top-right",
        fill: true
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        pad: "small",
        align: "center",
        justify: "center",
        fill: true
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        size: "large"
      }, day)), hasContent ? /*#__PURE__*/_react["default"].createElement(_grommet.DropButton, {
        icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Notification, {
          size: "small",
          color: "neutral-3"
        }),
        dropContent: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
          pad: "small"
        }, "Vacation"),
        dropAlign: {
          top: 'bottom'
        }
      }) : null));
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      level: 4
    }, "Example with onSelect set"), /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
      onSelect: onSelect,
      date: selectedDay,
      fill: true
    }, function (_ref2) {
      var day = _ref2.day,
        isSelected = _ref2.isSelected;
      return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        background: isSelected ? 'light-3' : 'white',
        border: true,
        fill: true
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        pad: "small",
        align: "center",
        justify: "center",
        fill: true
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        size: "large"
      }, day)));
    })))
    // </Grommet>
  );
};

CustomDayCalendar.storyName = 'Custom day';
var _default = exports["default"] = {
  title: "Visualizations/Calendar/Custom day"
};