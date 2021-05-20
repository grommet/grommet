"use strict";

exports.__esModule = true;
exports["default"] = exports.Controlled = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Controlled = function Controlled() {
  var _React$useState = _react["default"].useState(2),
      activeSlide = _React$useState[0],
      setActiveSlide = _React$useState[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "small",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "-",
    onClick: function onClick() {
      return setActiveSlide(activeSlide - 1);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, activeSlide), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "+",
    onClick: function onClick() {
      return setActiveSlide(activeSlide + 1);
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Carousel, {
    activeChild: activeSlide,
    onChild: setActiveSlide
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xlarge",
    background: "accent-1"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xlarge",
    background: "accent-2"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xlarge",
    background: "accent-3"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Car, {
    size: "xlarge"
  })))));
};

exports.Controlled = Controlled;
Controlled.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Media/Carousel/Controlled'
};
exports["default"] = _default;