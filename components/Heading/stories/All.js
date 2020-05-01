"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var H = function H(_ref) {
  var level = _ref.level,
      size = _ref.size;
  return /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: level,
    size: size
  }, "Heading " + level + " " + size);
};

H.propTypes = {
  level: _propTypes["default"].number.isRequired,
  size: _propTypes["default"].string.isRequired
};

var Set = function Set(_ref2) {
  var size = _ref2.size;
  return /*#__PURE__*/_react["default"].createElement("div", null, [1, 2, 3, 4, 5, 6].map(function (level) {
    return /*#__PURE__*/_react["default"].createElement(H, {
      key: level,
      level: level,
      size: size
    });
  }));
};

Set.propTypes = {
  size: _propTypes["default"].string.isRequired
};

var All = function All() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
    columns: "large",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(Set, {
    size: "medium"
  }), /*#__PURE__*/_react["default"].createElement(Set, {
    size: "small"
  }), /*#__PURE__*/_react["default"].createElement(Set, {
    size: "large"
  }), /*#__PURE__*/_react["default"].createElement(Set, {
    size: "xlarge"
  })));
};

(0, _react2.storiesOf)('Heading', module).add('All', function () {
  return /*#__PURE__*/_react["default"].createElement(All, null);
});