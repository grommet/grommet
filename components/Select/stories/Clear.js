"use strict";

exports.__esModule = true;
exports.Clear = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var options = ['one', 'two', 'three'];

var ClearTop = function ClearTop() {
  var _useState = (0, _react.useState)(),
      value = _useState[0],
      setValue = _useState[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    placeholder: "Clear on top",
    multiple: true,
    value: value,
    options: options,
    onChange: function onChange(_ref) {
      var nextValue = _ref.value;
      return setValue(nextValue);
    },
    clear: true
  }));
};

var ClearBottom = function ClearBottom() {
  var _useState2 = (0, _react.useState)(),
      value = _useState2[0],
      setValue = _useState2[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    placeholder: "Clear on bottom",
    multiple: true,
    value: value,
    options: options,
    onChange: function onChange(_ref2) {
      var nextValue = _ref2.value;
      return setValue(nextValue);
    },
    clear: {
      position: 'bottom'
    }
  }));
};

var ClearLabel = function ClearLabel() {
  var _useState3 = (0, _react.useState)(),
      value = _useState3[0],
      setValue = _useState3[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    placeholder: "Clear with label",
    multiple: true,
    value: value,
    options: options,
    onChange: function onChange(_ref3) {
      var nextValue = _ref3.value;
      return setValue(nextValue);
    },
    clear: {
      label: 'Click me!'
    }
  }));
};

var ClearCustomTheme = function ClearCustomTheme() {
  var _useState4 = (0, _react.useState)(),
      value = _useState4[0],
      setValue = _useState4[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.ThemeContext.Extend, {
    value: {
      select: {
        clear: {
          container: {
            background: 'accent-4'
          },
          text: {
            color: 'neutral-3',
            weight: 900
          }
        }
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    placeholder: "Clear with a custom theme",
    multiple: true,
    value: value,
    options: options,
    onChange: function onChange(_ref4) {
      var nextValue = _ref4.value;
      return setValue(nextValue);
    },
    clear: true
  })));
};

var ClearForm = function ClearForm() {
  var _useState5 = (0, _react.useState)(),
      value = _useState5[0],
      setValue = _useState5[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Numbers",
    name: "numbers"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    name: "numbers",
    placeholder: "Clear within formfield",
    multiple: true,
    options: options,
    value: value,
    clear: true,
    onChange: function onChange(_ref5) {
      var nextValue = _ref5.value;
      return setValue(nextValue);
    }
  })));
};

var Clear = function Clear() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "column",
    align: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row"
  }, /*#__PURE__*/_react["default"].createElement(ClearTop, null), /*#__PURE__*/_react["default"].createElement(ClearBottom, null), /*#__PURE__*/_react["default"].createElement(ClearLabel, null)), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row"
  }, /*#__PURE__*/_react["default"].createElement(ClearForm, null), /*#__PURE__*/_react["default"].createElement(ClearCustomTheme, null))));
};

exports.Clear = Clear;
Clear.story = {
  name: 'Clear',
  parameters: {
    chromatic: {
      disable: true
    }
  }
};