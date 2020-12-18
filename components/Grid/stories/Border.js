"use strict";

exports.__esModule = true;
exports.BorderGrid = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("../../../themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BorderGrid = function BorderGrid() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    gap: "small",
    align: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
    pad: "small",
    border: true
  }, "true"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row-responsive",
    gap: "small"
  }, ['horizontal', 'vertical', 'left', 'top', 'right', 'bottom'].map(function (border) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
      key: border,
      pad: "small",
      border: border
    }, border);
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row-responsive",
    gap: "small",
    align: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
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
  }, "custom top & vertical borders")), /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
    pad: "small",
    border: {
      color: 'brand'
    }
  }, "color"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row-responsive",
    gap: "small",
    align: "start"
  }, ['small', 'medium', 'large'].map(function (size) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
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
    return /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
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
    return /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
      key: type,
      pad: "small",
      border: {
        size: 'medium',
        style: type
      }
    }, type);
  }))));
};

exports.BorderGrid = BorderGrid;
BorderGrid.story = {
  name: 'Border'
};