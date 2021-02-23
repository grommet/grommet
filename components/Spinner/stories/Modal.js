"use strict";

exports.__esModule = true;
exports["default"] = exports.Modal = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Modal = function Modal() {
  var _React$useState = _react["default"].useState(),
      open = _React$useState[0],
      setOpen = _React$useState[1];

  var _React$useState2 = _react["default"].useState(false),
      isDataLoaded = _React$useState2[0],
      setIsDataLoaded = _React$useState2[1];

  var onOpen = function onOpen() {
    setOpen(true);
    setTimeout(function () {
      setOpen(undefined);
      setIsDataLoaded(true);
    }, 2000);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Load Data",
    onClick: onOpen
  }), isDataLoaded && /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Congrats! \uD83C\uDF89 "), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Data is now loaded"))), open && /*#__PURE__*/_react["default"].createElement(_grommet.Layer, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    justify: "center",
    gap: "small",
    direction: "row",
    alignSelf: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Spinner, null), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Loading..."))));
};

exports.Modal = Modal;
Modal.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Visualizations/Spinner/Modal'
};
exports["default"] = _default;