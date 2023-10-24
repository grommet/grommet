"use strict";

exports.__esModule = true;
exports["default"] = exports.IPv4MaskedInput = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var IPv4ElementExp = /^[0-1][0-9][0-9]$|^2[0-4][0-9]$|^25[0-5]$|^[0-9][0-9]$|^[0-9]$/;
var IPv4MaskedInput = exports.IPv4MaskedInput = function IPv4MaskedInput() {
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
      mask: [{
        length: [1, 3],
        regexp: IPv4ElementExp,
        placeholder: 'xxx'
      }, {
        fixed: '.'
      }, {
        length: [1, 3],
        regexp: IPv4ElementExp,
        placeholder: 'xxx'
      }, {
        fixed: '.'
      }, {
        length: [1, 3],
        regexp: IPv4ElementExp,
        placeholder: 'xxx'
      }, {
        fixed: '.'
      }, {
        length: [1, 3],
        regexp: IPv4ElementExp,
        placeholder: 'xxx'
      }],
      value: value,
      onChange: function onChange(event) {
        return setValue(event.target.value);
      }
    })))
    // </Grommet>
  );
};

IPv4MaskedInput.storyName = 'IPv4 address';
IPv4MaskedInput.parameters = {
  chromatic: {
    disable: true
  }
};
IPv4MaskedInput.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Input/MaskedInput/IPv4 address'
};