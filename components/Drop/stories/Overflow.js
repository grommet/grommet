"use strict";

exports.__esModule = true;
exports["default"] = exports.Overflow = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var OverflowDrop = function OverflowDrop() {
  var targetRef = (0, _react.useRef)();
  var inputRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)(undefined),
      date = _useState[0],
      setDate = _useState[1];

  var _useState2 = (0, _react.useState)(false),
      showCalendar = _useState2[0],
      setShowCalendar = _useState2[1];

  var onSelect = function onSelect(nextDate) {
    setDate(nextDate !== date ? nextDate : undefined);
    setShowCalendar(false);
  };

  var _useState3 = (0, _react.useState)(false),
      setShowDrop = _useState3[1];

  (0, _react.useEffect)(function () {
    return setShowDrop(true);
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
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
  }, "Target"), targetRef.current && /*#__PURE__*/_react["default"].createElement(_grommet.Drop, {
    overflow: "unset",
    align: {
      top: 'bottom',
      left: 'left'
    },
    target: targetRef.current,
    onClose: function onClose() {
      return setShowCalendar(false);
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    height: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 4
  }, "Select Start Date"), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    ref: inputRef,
    value: date || '',
    placeholder: "Focus on me",
    onFocus: function onFocus() {
      return setShowCalendar(true);
    }
  }), showCalendar && /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: 'absolute',
      background: '#eee'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    date: date,
    onSelect: onSelect,
    size: "small"
  })))))));
};

var Overflow = function Overflow() {
  return /*#__PURE__*/_react["default"].createElement(OverflowDrop, null);
};

exports.Overflow = Overflow;
Overflow.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Controls/Drop/Overflow'
};
exports["default"] = _default;