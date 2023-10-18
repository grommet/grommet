"use strict";

exports.__esModule = true;
exports["default"] = exports.Suggestions = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var allSuggestions = Array(100).fill().map(function (_, i) {
  return i + 1 + " suggestion";
});
var Suggestions = exports.Suggestions = function Suggestions() {
  var _React$useState = _react["default"].useState(allSuggestions),
    suggestions = _React$useState[0],
    setSuggestions = _React$useState[1];
  var _React$useState2 = _react["default"].useState(''),
    value = _React$useState2[0],
    setValue = _React$useState2[1];
  var onChange = function onChange(event) {
    var nextValue = event.target.value;
    setValue(nextValue);
    if (!nextValue) setSuggestions(allSuggestions);else {
      var regexp = new RegExp("^" + nextValue);
      setSuggestions(allSuggestions.filter(function (s) {
        return regexp.test(s);
      }));
    }
  };
  var onSuggestionSelect = function onSuggestionSelect(event) {
    setValue(event.suggestion);
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
      id: "grommet-text-combobox",
      value: value,
      onChange: onChange,
      onSuggestionSelect: onSuggestionSelect,
      suggestions: suggestions,
      "aria-label": "Input Text"
    })))
    // </Grommet>
  );
};

Suggestions.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Input/TextInput/Suggestions'
};