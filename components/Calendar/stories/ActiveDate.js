"use strict";

exports.__esModule = true;
exports["default"] = exports.ActiveDate = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ActiveDate = function ActiveDate() {
  var _useState = (0, _react.useState)(),
      datesD = _useState[0],
      setDatesD = _useState[1];

  var _useState2 = (0, _react.useState)(undefined),
      activeDate = _useState2[0],
      setActiveDate = _useState2[1];

  var startDateButton = (0, _react.useRef)();
  var endDateButton = (0, _react.useRef)();
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "small",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    ref: startDateButton,
    active: activeDate === 'start',
    label: /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Start Date"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, datesD && datesD[0][0] && new Date(datesD[0][0]).toDateString())),
    onClick: function onClick() {
      return setActiveDate('start');
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    ref: endDateButton,
    active: activeDate === 'end',
    label: /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "End Date"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, datesD && datesD[0][1] && new Date(datesD[0][1]).toDateString())),
    onClick: function onClick() {
      return setActiveDate('end');
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    activeDate: activeDate,
    dates: datesD,
    onSelect: function onSelect(arg) {
      setDatesD(arg);
      setActiveDate('end');
    },
    range: "array"
  })));
};

exports.ActiveDate = ActiveDate;
ActiveDate.storyName = 'Active date';
var _default = {
  title: "Visualizations/Calendar/Active date"
};
exports["default"] = _default;