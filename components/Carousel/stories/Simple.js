"use strict";

exports.__esModule = true;
exports.NoControls = exports.Initial = exports.Simple = exports.SimpleCarousel = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SimpleCarousel = function SimpleCarousel(_ref) {
  var initialChild = _ref.initialChild,
      props = _objectWithoutPropertiesLoose(_ref, ["initialChild"]);

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Carousel, _extends({
    initialChild: initialChild
  }, props), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
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

exports.SimpleCarousel = SimpleCarousel;

var Simple = function Simple() {
  return /*#__PURE__*/_react["default"].createElement(SimpleCarousel, null);
};

exports.Simple = Simple;

var Initial = function Initial() {
  return /*#__PURE__*/_react["default"].createElement(SimpleCarousel, {
    initialChild: 1
  });
};

exports.Initial = Initial;

var NoControls = function NoControls() {
  return /*#__PURE__*/_react["default"].createElement(SimpleCarousel, {
    controls: false,
    play: 1500
  });
};

exports.NoControls = NoControls;
Simple.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};
Initial.story = {
  name: 'Initial child'
};
NoControls.story = {
  name: 'Without controls'
};