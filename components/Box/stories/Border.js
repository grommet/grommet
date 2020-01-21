"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("../../../themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BorderBox = function BorderBox() {
  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    pad: "small",
    gap: "small",
    align: "start"
  }, _react["default"].createElement(_grommet.Box, {
    pad: "small",
    border: true
  }, "true"), _react["default"].createElement(_grommet.Box, {
    direction: "row-responsive",
    gap: "small"
  }, ['horizontal', 'vertical', 'left', 'top', 'right', 'bottom'].map(function (border) {
    return _react["default"].createElement(_grommet.Box, {
      key: border,
      pad: "small",
      border: border
    }, border);
  })), _react["default"].createElement(_grommet.Box, {
    direction: "row-responsive",
    gap: "small",
    align: "start"
  }, _react["default"].createElement(_grommet.Box, {
    pad: "small",
    border: [{
      size: 'medium',
      style: 'dotted',
      side: 'top'
    }, {
      size: 'medium',
      style: 'double',
      side: 'vertical'
    }]
  }, "custom top & vertical borders")), _react["default"].createElement(_grommet.Box, {
    pad: "small",
    border: {
      color: 'brand'
    }
  }, "color"), _react["default"].createElement(_grommet.Box, {
    direction: "row-responsive",
    gap: "small",
    align: "start"
  }, ['small', 'medium', 'large'].map(function (size) {
    return _react["default"].createElement(_grommet.Box, {
      key: size,
      pad: "small",
      border: {
        size: size
      }
    }, size);
  })), _react["default"].createElement(_grommet.Box, {
    direction: "row-responsive",
    gap: "small",
    align: "start"
  }, ['small', 'medium', 'large'].map(function (size) {
    return _react["default"].createElement(_grommet.Box, {
      key: size,
      pad: "small",
      responsive: false,
      border: {
        size: size
      }
    }, size);
  })), _react["default"].createElement(_grommet.Box, {
    direction: "row-responsive",
    gap: "small",
    align: "start"
  }, ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset'].map(function (type) {
    return _react["default"].createElement(_grommet.Box, {
      key: type,
      pad: "small",
      border: {
        size: 'medium',
        style: type
      }
    }, type);
  })), _react["default"].createElement(_grommet.Box, {
    direction: "row-responsive",
    gap: "large",
    align: "center"
  }, ['column', 'row'].map(function (direction) {
    return _react["default"].createElement(_grommet.Box, {
      direction: direction,
      gap: "medium",
      border: "between"
    }, _react["default"].createElement(_grommet.Text, null, "between"), _react["default"].createElement(_grommet.Text, null, direction));
  }))));
};

(0, _react2.storiesOf)('Box', module).add('Border', function () {
  return _react["default"].createElement(BorderBox, null);
});