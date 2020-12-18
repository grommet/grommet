"use strict";

exports.__esModule = true;
exports.BorderBox = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("../../../themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BorderBox = function BorderBox() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    gap: "small",
    align: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    border: true
  }, "true"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row-responsive",
    gap: "small"
  }, ['horizontal', 'vertical', 'left', 'top', 'right', 'bottom'].map(function (border) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: border,
      pad: "small",
      border: border
    }, border);
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row-responsive",
    gap: "small",
    align: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
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
  }, "custom top & vertical borders")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    border: {
      color: 'brand'
    }
  }, "color"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row-responsive",
    gap: "small",
    align: "start"
  }, ['small', 'medium', 'large'].map(function (size) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: size,
      pad: "small",
      border: {
        size: size
      }
    }, size);
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row-responsive",
    gap: "small",
    align: "start"
  }, ['small', 'medium', 'large'].map(function (size) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: size,
      pad: "small",
      responsive: false,
      border: {
        size: size
      }
    }, size);
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row-responsive",
    gap: "small",
    align: "start"
  }, ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset'].map(function (type) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: type,
      pad: "small",
      border: {
        size: 'medium',
        style: type
      }
    }, type);
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row-responsive",
    gap: "large",
    align: "center"
  }, ['column', 'row', 'row-responsive'].map(function (direction) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: direction,
      gap: "large",
      border: {
        side: 'between',
        size: 'large'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "between"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, direction));
  }))));
};

exports.BorderBox = BorderBox;
BorderBox.story = {
  name: 'Border'
};