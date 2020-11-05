"use strict";

exports.__esModule = true;
exports.ObjectOptions = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var objectOptions = [];

for (var i = 1; i <= 5; i += 1) {
  objectOptions.push({
    lab: "option " + i,
    val: i
  });
}

var ObjectOptions = function ObjectOptions() {
  var _useState = (0, _react.useState)([]),
      value = _useState[0],
      setValue = _useState[1];

  var _useState2 = (0, _react.useState)([]),
      value2 = _useState2[0],
      setValue2 = _useState2[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBoxGroup, {
    labelKey: "lab",
    valueKey: "val",
    value: value,
    onChange: function onChange(event) {
      setValue(event.value);
      console.log('Group1: ', event.value);
    },
    options: objectOptions
  }), /*#__PURE__*/_react["default"].createElement(_grommet.CheckBoxGroup, {
    gap: "xsmall",
    labelKey: "label",
    valueKey: "key",
    value: value2,
    onChange: function onChange(event) {
      setValue2(event.value);
      console.log('Group2: ', event.value);
    },
    options: [{
      label: 'Maui',
      key: 'M'
    }, {
      label: 'Jerusalem',
      key: 'J'
    }, {
      label: 'Wuhan',
      key: 'W'
    }]
  })));
};

exports.ObjectOptions = ObjectOptions;
ObjectOptions.story = {
  name: 'Object options'
};