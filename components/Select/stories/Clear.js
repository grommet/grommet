"use strict";

exports.__esModule = true;
exports["default"] = exports.Clear = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var options = [];
for (var i = 0; i < 500; i += 1) {
  options.push("Number " + i);
}
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
    placeholder: "Clear Options",
    value: value,
    multiple: true,
    options: options,
    onChange: function onChange(_ref) {
      var nextValue = _ref.value;
      return setValue(nextValue);
    },
    dropHeight: "large",
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
    placeholder: "Clear Options",
    value: value,
    multiple: true,
    options: options,
    onChange: function onChange(_ref2) {
      var nextValue = _ref2.value;
      return setValue(nextValue);
    },
    dropHeight: "large",
    clear: {
      position: 'bottom'
    }
  }));
};
var Clear = function Clear() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(ClearTop, null), /*#__PURE__*/_react["default"].createElement(ClearBottom, null))
    // </Grommet>
  );
};
exports.Clear = Clear;
Clear.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Input/Select/Clear'
};
exports["default"] = _default;