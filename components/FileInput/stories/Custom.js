"use strict";

exports.__esModule = true;
exports["default"] = exports.Custom = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var customTheme = {
  fileInput: {
    button: {
      hover: {
        color: 'accent-2'
      },
      border: {
        color: 'skyblue',
        width: '1px'
      },
      pad: {
        vertical: '4px',
        horizontal: '8px'
      }
    },
    background: '#f2f2f2',
    border: {
      size: 'medium'
    },
    pad: {
      horizontal: 'large',
      vertical: 'medium'
    },
    round: 'small',
    label: {
      size: 'large'
    },
    icons: {
      remove: _grommetIcons.Trash
    },
    dragOver: {
      border: {
        color: 'focus'
      }
    },
    hover: {
      border: {
        color: 'control'
      },
      extend: "letterSpacing: '0.1em'"
    }
  }
};

var Custom = function Custom() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: customTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FileInput, {
    renderFile: function renderFile(file) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        direction: "row",
        gap: "small"
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        weight: "bold"
      }, file.name), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        color: "text-weak"
      }, file.size, " bytes"));
    },
    onChange: function onChange(event, _ref) {
      var files = _ref.files;
      var fileList = files;

      for (var i = 0; i < fileList.length; i += 1) {
        var file = fileList[i];
        console.log(file.name);
      }
    }
  }))));
};

exports.Custom = Custom;
var _default = {
  title: 'Input/FileInput/Custom'
};
exports["default"] = _default;