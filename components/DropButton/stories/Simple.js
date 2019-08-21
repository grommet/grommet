"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DropContent = function DropContent(_ref) {
  var onClose = _ref.onClose;
  return _react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, _react["default"].createElement(_grommet.Box, {
    direction: "row",
    justify: "between",
    align: "center"
  }, _react["default"].createElement(_grommet.Heading, {
    level: 3,
    margin: "small"
  }, "Heading"), _react["default"].createElement(_grommet.Button, {
    icon: _react["default"].createElement(_grommetIcons.Close, null),
    onClick: onClose
  })), _react["default"].createElement(_grommet.Text, null, "Content"));
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

  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react["default"].createElement(_grommet.DropButton, {
    label: "Open",
    open: open,
    onOpen: onOpen,
    onClose: onClose,
    dropContent: _react["default"].createElement(DropContent, {
      onClose: onClose
    }),
    dropProps: {
      align: {
        top: 'bottom'
      }
    }
  })));
};

(0, _react2.storiesOf)('DropButton', module).add('Simple', function () {
  return _react["default"].createElement(SimpleDropButton, null);
});