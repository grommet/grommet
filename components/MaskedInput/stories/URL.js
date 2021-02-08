"use strict";

exports.__esModule = true;
exports["default"] = exports.UrlMaskedInput = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UrlMaskedInput = function UrlMaskedInput() {
  var _React$useState = _react["default"].useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "medium",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.MaskedInput, {
    mask: [{
      fixed: 'https://'
    }, {
      regexp: /^.*$/
    }],
    value: value,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    }
  }))));
};

exports.UrlMaskedInput = UrlMaskedInput;
UrlMaskedInput.storyName = 'URL';
UrlMaskedInput.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Input/MaskedInput/URL'
};
exports["default"] = _default;