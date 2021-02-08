"use strict";

exports.__esModule = true;
exports["default"] = exports.OnSelect = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var suggestions = Array(100).fill().map(function (_, i) {
  return "suggestion " + (i + 1);
});

var OnSelect = function OnSelect() {
  var _React$useState = _react["default"].useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  var onSelect = function onSelect(event) {
    return setValue(event.suggestion);
  };

  var onHighlight = function onHighlight(event) {
    if (event.target.selectionStart !== event.target.selectionEnd) {
      console.log(event.target.value.substring(event.target.selectionStart, event.target.selectionEnd));
    }
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
    onSelect: onHighlight,
    onSuggestionSelect: onSelect,
    suggestions: suggestions
  }))));
};

exports.OnSelect = OnSelect;
OnSelect.storyName = 'onSelect and onSuggestionSelect';
OnSelect.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Input/TextInput/onSelect and onSuggestionSelect'
};
exports["default"] = _default;