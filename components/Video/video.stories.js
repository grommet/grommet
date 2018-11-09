"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SimpleVideo = function SimpleVideo() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Video, null, _react.default.createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.webm",
    type: "video/webm"
  }), _react.default.createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.ogv",
    type: "video/ogg"
  }), _react.default.createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.mp4",
    type: "video/mp4"
  }), _react.default.createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.3gp",
    type: "video/3gp"
  })));
};

(0, _react2.storiesOf)('Video', module).add('Simple Video', function () {
  return _react.default.createElement(SimpleVideo, null);
});