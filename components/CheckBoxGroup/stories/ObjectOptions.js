"use strict";

exports.__esModule = true;
exports["default"] = exports.ObjectOptions = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
ObjectOptions.storyName = 'Object options';
var _default = {
  title: 'Input/CheckBoxGroup/Object options'
};
exports["default"] = _default;