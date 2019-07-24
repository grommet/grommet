"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SimpleCarousel = function SimpleCarousel(_ref) {
  var initialChild = _ref.initialChild;
  return _react["default"].createElement(_grommet.Grommet, null, _react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react["default"].createElement(_grommet.Carousel, {
    initialChild: initialChild
  }, _react["default"].createElement(_grommet.Box, {
    pad: "xlarge",
    background: "accent-1"
  }, _react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  })), _react["default"].createElement(_grommet.Box, {
    pad: "xlarge",
    background: "accent-2"
  }, _react["default"].createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  })), _react["default"].createElement(_grommet.Box, {
    pad: "xlarge",
    background: "accent-3"
  }, _react["default"].createElement(_grommetIcons.Car, {
    size: "xlarge"
  })))));
};

(0, _react2.storiesOf)('Carousel', module).add('Simple', function () {
  return _react["default"].createElement(SimpleCarousel, null);
});
(0, _react2.storiesOf)('Carousel', module).add('Initial child`', function () {
  return _react["default"].createElement(SimpleCarousel, {
    initialChild: 1
  });
});