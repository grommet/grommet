"use strict";

exports.__esModule = true;
exports["default"] = exports.CustomBoxMaskedInput = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CustomBoxMaskedInput = function CustomBoxMaskedInput() {
  var _React$useState = _react["default"].useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var boxRef = _react["default"].useRef();

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    pad: {
      horizontal: 'xsmall'
    },
    border: "all",
    ref: boxRef,
    wrap: true
  }, /*#__PURE__*/_react["default"].createElement("span", {
    role: "img",
    "aria-label": "Disk size"
  }, "\uD83D\uDCBE"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    flex: true,
    width: "medium",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.MaskedInput, {
    plain: true,
    dropProps: {
      target: boxRef.current
    },
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
  }))));
};

exports.CustomBoxMaskedInput = CustomBoxMaskedInput;
CustomBoxMaskedInput.storyName = 'Custom box';
CustomBoxMaskedInput.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Input/MaskedInput/Custom box'
};
exports["default"] = _default;