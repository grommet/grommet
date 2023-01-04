"use strict";

exports.__esModule = true;
exports["default"] = exports.Label = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _RangeSelector = require("../RangeSelector");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Label = function Label() {
  var _useState = (0, _react.useState)([0, 100]),
    range = _useState[0],
    setRange = _useState[1];
  var _useState2 = (0, _react.useState)([0, 100]),
    range2 = _useState2[0],
    setRange2 = _useState2[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "xlarge",
      align: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      width: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      name: "range",
      htmlFor: "range",
      label: "Range"
    }, /*#__PURE__*/_react["default"].createElement(_RangeSelector.RangeSelector, {
      id: "range",
      min: 0,
      max: 100,
      label: true,
      values: range,
      onChange: function onChange(nextRange) {
        setRange(nextRange);
      }
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      name: "range2",
      htmlFor: "range2",
      label: "Range units"
    }, /*#__PURE__*/_react["default"].createElement(_RangeSelector.RangeSelector, {
      id: "range2",
      min: 0,
      max: 100,
      label: function label(value) {
        return value + "%";
      },
      values: range2,
      onChange: function onChange(nextRange) {
        setRange2(nextRange);
      }
    }))))
    // </Grommet>
  );
};
exports.Label = Label;
var _default = {
  title: 'Input/RangeSelector/Label'
};
exports["default"] = _default;