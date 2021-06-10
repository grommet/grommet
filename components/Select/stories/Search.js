"use strict";

exports.__esModule = true;
exports["default"] = exports.Search = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var defaultOptions = [];

for (var i = 1; i <= 200; i += 1) {
  defaultOptions.push("option " + i);
}

var Search = function Search() {
  var _useState = (0, _react.useState)(defaultOptions),
      options = _useState[0],
      setOptions = _useState[1];

  var _useState2 = (0, _react.useState)(''),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      valueMultiple = _useState3[0],
      setValueMultiple = _useState3[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    gap: "medium",
    direction: "row"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    size: "medium",
    placeholder: "Select single option",
    value: value,
    options: options,
    onChange: function onChange(_ref) {
      var option = _ref.option;
      return setValue(option);
    },
    onClose: function onClose() {
      return setOptions(defaultOptions);
    },
    onSearch: function onSearch(text) {
      // The line below escapes regular expression special characters:
      // [ \ ^ $ . | ? * + ( )
      var escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&'); // Create the regular expression with modified value which
      // handles escaping special characters. Without escaping special
      // characters, errors will appear in the console

      var exp = new RegExp(escapedText, 'i');
      setOptions(defaultOptions.filter(function (o) {
        return exp.test(o);
      }));
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    multiple: true,
    size: "medium",
    placeholder: "Select multiple options",
    value: valueMultiple,
    options: options,
    onChange: function onChange(_ref2) {
      var nextValue = _ref2.value;
      return setValueMultiple(nextValue);
    },
    closeOnChange: false,
    onClose: function onClose() {
      return setOptions(defaultOptions);
    },
    onSearch: function onSearch(text) {
      // The line below escapes regular expression special characters:
      // [ \ ^ $ . | ? * + ( )
      var escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&'); // Create the regular expression with modified value which
      // handles escaping special characters. Without escaping special
      // characters, errors will appear in the console

      var exp = new RegExp(escapedText, 'i');
      setOptions(defaultOptions.filter(function (o) {
        return exp.test(o);
      }));
    }
  })));
};

exports.Search = Search;
Search.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Input/Select/Search'
};
exports["default"] = _default;