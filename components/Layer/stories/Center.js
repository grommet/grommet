"use strict";

exports.__esModule = true;
exports.CenterLayer = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CenterLayer = function CenterLayer() {
  var _React$useState = _react["default"].useState(),
      open = _React$useState[0],
      setOpen = _React$useState[1];

  var _React$useState2 = _react["default"].useState(),
      open2 = _React$useState2[0],
      setOpen2 = _React$useState2[1];

  var onOpen = function onOpen() {
    return setOpen(true);
  };

  var onClose = function onClose() {
    return setOpen(undefined);
  };

  var onOpen2 = function onOpen2() {
    return setOpen2(true);
  };

  var onClose2 = function onClose2() {
    return setOpen2(undefined);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Trash, null),
    label: /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, /*#__PURE__*/_react["default"].createElement("strong", null, "Remove")),
    onClick: onOpen,
    plain: true
  })), open && /*#__PURE__*/_react["default"].createElement(_grommet.Layer, {
    position: "center",
    onClickOutside: onClose,
    onEsc: onClose
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    gap: "small",
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 3,
    margin: "none"
  }, "Confirm"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Are you sure you want to delete?"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    as: "footer",
    gap: "small",
    direction: "row",
    align: "center",
    justify: "end",
    pad: {
      top: 'medium',
      bottom: 'small'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Open 2",
    onClick: onOpen2,
    color: "dark-3"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      color: "white"
    }, /*#__PURE__*/_react["default"].createElement("strong", null, "Delete")),
    onClick: onClose,
    primary: true,
    color: "status-critical"
  })))), open2 && /*#__PURE__*/_react["default"].createElement(_grommet.Layer, {
    position: "top",
    onClickOutside: onClose2,
    onEsc: onClose2
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    gap: "small",
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 3,
    margin: "none"
  }, "Confirm 2"), /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    options: ['one', 'two', 'three']
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    as: "footer",
    gap: "small",
    direction: "row",
    align: "center",
    justify: "end",
    pad: {
      top: 'medium',
      bottom: 'small'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Close",
    onClick: onClose2,
    color: "dark-3"
  })))));
};

exports.CenterLayer = CenterLayer;
CenterLayer.story = {
  name: 'Center',
  parameters: {
    chromatic: {
      disable: true
    }
  }
};