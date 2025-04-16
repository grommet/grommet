"use strict";

exports.__esModule = true;
exports["default"] = exports.SizeUnitsMaskedInput = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var SizeUnitsMaskedInput = exports.SizeUnitsMaskedInput = function SizeUnitsMaskedInput() {
  var _React$useState = _react["default"].useState(''),
    value = _React$useState[0],
    setValue = _React$useState[1];
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
    }, /*#__PURE__*/_react["default"].createElement(_grommet.MaskedInput, {
      id: "grommet-size-units",
      mask: [{
        length: [1, 4],
        options: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024],
        regexp: /^\d{1,4}$/,
        placeholder: 'nnn'
      }, {
        fixed: ' '
      }, {
        length: 2,
        options: ['MB', 'GB', 'TB'],
        regexp: /^[mgt]b$|^[MGT]B$|^[mMgGtT]$/,
        placeholder: 'gb'
      }],
      value: value,
      onChange: function onChange(event) {
        return setValue(event.target.value);
      }
    })))
    // </Grommet>
  );
};
SizeUnitsMaskedInput.storyName = 'Size + units';
SizeUnitsMaskedInput.parameters = {
  chromatic: {
    disable: true
  }
};
SizeUnitsMaskedInput.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Input/MaskedInput/Size + units'
};