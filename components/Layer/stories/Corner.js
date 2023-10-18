"use strict";

exports.__esModule = true;
exports["default"] = exports.CornerLayer = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommetIcons = require("grommet-icons");
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var CornerLayer = exports.CornerLayer = function CornerLayer() {
  var _React$useState = _react["default"].useState(),
    open = _React$useState[0],
    setOpen = _React$useState[1];
  var onOpen = function onOpen() {
    return setOpen(true);
  };
  var onClose = function onClose() {
    return setOpen(undefined);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, {
        color: "brand"
      }),
      label: /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, /*#__PURE__*/_react["default"].createElement("strong", null, "Add Corner Layer")),
      onClick: onOpen,
      plain: true
    })), open && /*#__PURE__*/_react["default"].createElement(_grommet.Layer, {
      position: "top-right",
      onClickOutside: onClose
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      height: "small",
      overflow: "auto"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "xlarge"
    }, "Corner top-right position"))))
    // </Grommet>
  );
};

CornerLayer.storyName = 'Corner';
CornerLayer.parameters = {
  chromatic: {
    disable: true
  }
};
CornerLayer.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Layout/Layer/Corner'
};