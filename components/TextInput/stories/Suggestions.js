"use strict";

exports.__esModule = true;
exports.Suggestions = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var suggestions = Array(100).fill().map(function (_, i) {
  return "suggestion " + (i + 1);
});

var Suggestions = function Suggestions() {
  var _React$useState = _react["default"].useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  var onSelect = function onSelect(event) {
    return setValue(event.suggestion);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    value: value,
    onChange: onChange,
    onSelect: onSelect,
    suggestions: suggestions
  }))));
};

exports.Suggestions = Suggestions;
Suggestions.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};