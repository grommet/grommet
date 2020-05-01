"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// the prefix name of the Create option entry
var prefix = 'Create';
var defaultOptions = [];

for (var i = 1; i <= 5; i += 1) {
  defaultOptions.push("option " + i);
}

var updateCreateOption = function updateCreateOption(text) {
  var len = defaultOptions.length;

  if (defaultOptions[len - 1].includes(prefix)) {
    // remove Create option before adding an updated one
    defaultOptions.pop();
  }

  defaultOptions.push(prefix + " '" + text + "'");
}; // improving Search support of special characters


var getRegExp = function getRegExp(text) {
  // The line below escapes regular expression special characters:
  // [ \ ^ $ . | ? * + ( )
  var escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&'); // Create the regular expression with modified value which
  // handles escaping special characters. Without escaping special
  // characters, errors will appear in the console

  return new RegExp(escapedText, 'i');
};

var CreateOption = function CreateOption() {
  var _useState = (0, _react.useState)(defaultOptions),
      options = _useState[0],
      setOptions = _useState[1];

  var _useState2 = (0, _react.useState)(''),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      searchValue = _useState3[0],
      setSearchValue = _useState3[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    size: "medium",
    placeholder: "Select",
    value: value,
    options: options,
    onChange: function onChange(_ref) {
      var option = _ref.option;

      if (option.includes(prefix)) {
        defaultOptions.pop(); // remove Create option

        defaultOptions.push(searchValue);
        setValue(searchValue);
      } else {
        setValue(option);
      }
    },
    onClose: function onClose() {
      return setOptions(defaultOptions);
    },
    onSearch: function onSearch(text) {
      updateCreateOption(text);
      var exp = getRegExp(text);
      setOptions(defaultOptions.filter(function (o) {
        return exp.test(o);
      }));
      setSearchValue(text);
    }
  })));
};

(0, _react2.storiesOf)('Select', module).add('Create Option', function () {
  return /*#__PURE__*/_react["default"].createElement(CreateOption, null);
});