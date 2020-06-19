"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SimpleVideo = function SimpleVideo(props) {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Video, props, /*#__PURE__*/_react["default"].createElement("source", {
    src: "small.mp4",
    type: "video/mp4"
  }), /*#__PURE__*/_react["default"].createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.webm",
    type: "video/webm"
  }), /*#__PURE__*/_react["default"].createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.ogv",
    type: "video/ogg"
  }), /*#__PURE__*/_react["default"].createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.3gp",
    type: "video/3gp"
  }))));
};

(0, _react2.storiesOf)('Video', module).add('Simple', function () {
  return /*#__PURE__*/_react["default"].createElement(SimpleVideo, null);
}).add('Controls Below', function () {
  return /*#__PURE__*/_react["default"].createElement(SimpleVideo, {
    controls: "below"
  });
});