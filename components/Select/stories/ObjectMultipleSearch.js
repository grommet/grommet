"use strict";

exports.__esModule = true;
exports.ObjectMultipleSearch = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var objectOptions = [];

for (var i = 1; i <= 200; i += 1) {
  objectOptions.push({
    lab: "option " + i,
    val: i,
    dis: i % 5 === 0
  });
}

var ObjectMultipleSearch = function ObjectMultipleSearch() {
  var _useState = (0, _react.useState)(objectOptions),
      options = _useState[0],
      setOptions = _useState[1];

  var _useState2 = (0, _react.useState)([1, 2]),
      value = _useState2[0],
      setValue = _useState2[1];

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
    multiple: true,
    closeOnChange: false,
    disabledKey: "dis",
    labelKey: "lab",
    valueKey: {
      key: 'val',
      reduce: true
    },
    value: value,
    options: options,
    onChange: function onChange(_ref) {
      var nextValue = _ref.value;
      return setValue(nextValue);
    },
    onClose: function onClose() {
      return setOptions(objectOptions);
    },
    onSearch: function onSearch(text) {
      // The line below escapes regular expression special characters:
      // [ \ ^ $ . | ? * + ( )
      var escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&'); // Create the regular expression with modified value which
      // handles escaping special characters. Without escaping special
      // characters, errors will appear in the console

      var exp = new RegExp(escapedText, 'i');
      setOptions(objectOptions.filter(function (o) {
        return exp.test(o.lab);
      }));
    }
  })));
};

exports.ObjectMultipleSearch = ObjectMultipleSearch;
ObjectMultipleSearch.story = {
  name: 'Object options with search and multiple'
};