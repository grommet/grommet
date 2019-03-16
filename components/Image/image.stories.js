"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Simple = function Simple() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Image, {
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  }));
};

var Fit = function Fit() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    align: "start",
    gap: "medium"
  }, _react.default.createElement(_grommet.Box, {
    height: "small",
    width: "small",
    border: true
  }, _react.default.createElement(_grommet.Image, {
    src: "//v2.grommet.io/assets/IMG_4245.jpg",
    fit: "contain"
  })), _react.default.createElement(_grommet.Box, {
    height: "small",
    width: "small",
    border: true
  }, _react.default.createElement(_grommet.Image, {
    src: "//v2.grommet.io/assets/IMG_4245.jpg",
    fit: "cover"
  }))));
};

var Fallback = function Fallback() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Image, {
    fallback: "//v2.grommet.io/assets/IMG_4245.jpg",
    src: "//v2.grommet.io/assets/IMG_4245_not_exists.jpg"
  }));
};

var Opacity = function Opacity() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    gap: "small",
    direction: "row"
  }, _react.default.createElement(_grommet.Image, {
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  }), _react.default.createElement(_grommet.Image, {
    opacity: "strong",
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  })), _react.default.createElement(_grommet.Box, {
    gap: "small",
    direction: "row"
  }, _react.default.createElement(_grommet.Image, {
    opacity: "medium",
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  }), _react.default.createElement(_grommet.Image, {
    opacity: "weak",
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  })), _react.default.createElement(_grommet.Box, {
    gap: "small",
    direction: "row"
  }, _react.default.createElement(_grommet.Image, {
    opacity: false,
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  }), _react.default.createElement(_grommet.Image, {
    opacity: true,
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  })), _react.default.createElement(_grommet.Box, {
    gap: "small",
    direction: "row"
  }, _react.default.createElement(_grommet.Image, {
    opacity: "0.6",
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  })));
};

(0, _react2.storiesOf)('Image', module).add('Simple', function () {
  return _react.default.createElement(Simple, null);
}).add('Fit', function () {
  return _react.default.createElement(Fit, null);
}).add('Fallback', function () {
  return _react.default.createElement(Fallback, null);
}).add('Opacity', function () {
  return _react.default.createElement(Opacity, null);
});