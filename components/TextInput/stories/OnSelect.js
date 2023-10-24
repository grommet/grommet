"use strict";

exports.__esModule = true;
exports["default"] = exports.OnSelect = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var suggestions = Array(100).fill().map(function (_, i) {
  return "suggestion " + (i + 1);
});
var OnSelect = exports.OnSelect = function OnSelect() {
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
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
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
      suggestions: suggestions,
      "aria-label": "Input text"
    })))
    // </Grommet>
  );
};

OnSelect.storyName = 'onSelect and onSuggestionSelect';
OnSelect.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Input/TextInput/onSelect and onSuggestionSelect'
};