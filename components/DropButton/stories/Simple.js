"use strict";

exports.__esModule = true;
exports.Simple = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DropContent = function DropContent(_ref) {
  var onClose = _ref.onClose;
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    justify: "between",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 3,
    margin: "small"
  }, "Heading"), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Close, null),
    onClick: onClose
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Content"));
};

DropContent.propTypes = {
  onClose: _propTypes["default"].func.isRequired
};

var SimpleDropButton = function SimpleDropButton() {
  var _React$useState = _react["default"].useState(),
      open = _React$useState[0],
      setOpen = _React$useState[1];

  var onOpen = function onOpen() {
    setOpen(true);
  };

  var onClose = function onClose() {
    setOpen(false);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DropButton, {
    label: "Open",
    open: open,
    onOpen: onOpen,
    onClose: onClose,
    dropContent: /*#__PURE__*/_react["default"].createElement(DropContent, {
      onClose: onClose
    }),
    dropProps: {
      align: {
        top: 'bottom'
      }
    }
  })));
};

var Simple = function Simple() {
  return /*#__PURE__*/_react["default"].createElement(SimpleDropButton, null);
};

exports.Simple = Simple;
Simple.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};