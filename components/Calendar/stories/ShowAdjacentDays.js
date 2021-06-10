"use strict";

exports.__esModule = true;
exports["default"] = exports.ShowAdjacent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _Box = require("../../Box");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Container = function Container(_ref) {
  var rest = _extends({}, _ref);

  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    align: "center",
    border: true,
    gap: "small",
    pad: "medium"
  }, rest));
};

var ShowAdjacent = function ShowAdjacent() {
  var _useState = (0, _react.useState)(new Date(2020, 6, 15).toDateString()),
      date = _useState[0],
      setDate = _useState[1];

  var onSelect = function onSelect(nextDate) {
    setDate(nextDate !== date ? nextDate : undefined);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
    columns: {
      count: 'fit',
      size: ['small', 'auto']
    },
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(Container, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "small"
  }, "showAdjacentDays = false"), /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    date: date,
    onSelect: onSelect,
    size: "small",
    bounds: ['2018-09-08', '2020-12-13'],
    showAdjacentDays: false
  })), /*#__PURE__*/_react["default"].createElement(Container, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "small"
  }, "showAdjacentDays = true"), /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    date: date,
    onSelect: onSelect,
    size: "small",
    bounds: ['2018-09-08', '2020-12-13']
  })), /*#__PURE__*/_react["default"].createElement(Container, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "small"
  }, "showAdjacentDays = \"trim\""), /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    date: date,
    onSelect: onSelect,
    size: "small",
    bounds: ['2018-09-08', '2020-12-13'],
    showAdjacentDays: "trim"
  }))));
};

exports.ShowAdjacent = ShowAdjacent;
ShowAdjacent.storyName = 'Show adjacent days';
var _default = {
  title: "Visualizations/Calendar/Show adjacent days"
};
exports["default"] = _default;