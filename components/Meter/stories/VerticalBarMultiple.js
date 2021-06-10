"use strict";

exports.__esModule = true;
exports["default"] = exports.MultipleValues = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var MultipleValues = function MultipleValues() {
  var total = 100;

  var _useState = (0, _react.useState)(0),
      active = _useState[0],
      setActive = _useState[1];

  var _useState2 = (0, _react.useState)(''),
      label = _useState2[0],
      setLabel = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      highlight = _useState3[0],
      setHighlight = _useState3[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Meter, {
    type: "bar",
    background: "light-2",
    values: [{
      value: 50,
      onHover: function onHover(over) {
        setActive(over ? 50 : 0);
        setLabel(over ? 'in use' : undefined);
      },
      onClick: function onClick() {
        setHighlight(function () {
          return !highlight;
        });
      },
      highlight: highlight
    }, {
      value: 30,
      onHover: function onHover(over) {
        setActive(over ? 30 : 0);
        setLabel(over ? 'available' : undefined);
      }
    }],
    max: 100,
    size: "medium",
    thickness: "medium",
    direction: "vertical"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    pad: {
      bottom: 'xsmall'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "xxlarge",
    weight: "bold"
  }, active || total), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "GB")), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, label || 'total'))));
};

exports.MultipleValues = MultipleValues;
MultipleValues.storyName = 'Vertical Bar Multiple';
var _default = {
  title: 'Visualizations/Meter/Vertical Bar Multiple'
};
exports["default"] = _default;