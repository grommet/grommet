"use strict";

exports.__esModule = true;
exports["default"] = exports.Border = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Border = function Border() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "large",
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Spinner, {
    border: [{
      side: 'all',
      color: 'transparent',
      size: 'medium'
    }, {
      side: 'horizontal',
      color: 'brand',
      size: 'medium'
    }]
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Loading...")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Spinner, {
    border: [{
      side: 'all',
      color: 'brand',
      size: 'medium',
      style: 'dotted'
    }]
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Loading...")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    direction: "row",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Spinner, {
    border: [{
      side: 'horizontal',
      color: 'brand',
      size: 'large',
      style: 'inset'
    }]
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Loading...")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Spinner, {
    border: [{
      side: 'all',
      color: 'brand',
      size: 'large',
      style: 'groove'
    }]
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Loading...")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Spinner, {
    border: [{
      side: 'all',
      color: 'background-contrast',
      size: 'medium'
    }, {
      side: 'right',
      color: 'brand',
      size: 'medium'
    }, {
      side: 'top',
      color: 'brand',
      size: 'medium'
    }, {
      side: 'left',
      color: 'brand',
      size: 'medium'
    }]
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Loading...")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Spinner, {
    border: [{
      side: 'horizontal',
      color: 'brand',
      size: 'medium'
    }]
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Loading..."))));
};

exports.Border = Border;
var _default = {
  title: 'Visualizations/Spinner/Border'
};
exports["default"] = _default;