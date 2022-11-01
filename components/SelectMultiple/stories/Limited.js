"use strict";

exports.__esModule = true;
exports["default"] = exports.SelectMultipleLimited = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var defaultOptions = ['Apple', 'Orange', 'Banana', 'Grape', 'Melon', 'Strawberry', 'Kiwi', 'Mango', 'Raspberry', 'Rhubarb'];
var SelectMultipleLimited = function SelectMultipleLimited() {
  var _useState = (0, _react.useState)([]),
    valueMultiple = _useState[0],
    setValueMultiple = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      pad: "large",
      gap: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "SelectMultiple Limited"), /*#__PURE__*/_react["default"].createElement(_grommet.SelectMultiple, {
      limit: 5,
      help: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        direction: "row",
        justify: "between",
        flex: false,
        pad: {
          horizontal: 'xsmall',
          bottom: 'xsmall'
        }
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        size: "small"
      }, "Select up to 5")),
      value: valueMultiple,
      placeholder: "Select",
      options: defaultOptions,
      onChange: function onChange(_ref) {
        var value = _ref.value;
        setValueMultiple(value);
      }
    }))
    // </Grommet>
  );
};
exports.SelectMultipleLimited = SelectMultipleLimited;
SelectMultipleLimited.parameters = {
  chromatic: {
    disable: true
  }
};
SelectMultipleLimited.args = {
  full: true
};
SelectMultipleLimited.storyName = 'Limited';
var _default = {
  title: 'Input/SelectMultiple/Limited'
};
exports["default"] = _default;