"use strict";

exports.__esModule = true;
exports["default"] = exports.Layout = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("./data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Layout = exports.Layout = function Layout() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "small",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      weight: "bold",
      size: "2xl"
    }, "layout = grid / pairProps direction = column"), /*#__PURE__*/_react["default"].createElement(_grommet.NameValueList, {
      layout: "grid",
      pairProps: {
        direction: 'column'
      }
    }, Object.entries(_data.data).map(function (_ref) {
      var name = _ref[0],
        value = _ref[1];
      return /*#__PURE__*/_react["default"].createElement(_grommet.NameValuePair, {
        key: name,
        name: name
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, value));
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      weight: "bold",
      size: "2xl"
    }, "layout = grid / pairProps direction = column-reverse"), /*#__PURE__*/_react["default"].createElement(_grommet.NameValueList, {
      valueProps: {
        width: 'small'
      },
      pairProps: {
        direction: 'column-reverse'
      },
      layout: "grid"
    }, Object.entries(_data.metricData).map(function (_ref2) {
      var name = _ref2[0],
        value = _ref2[1];
      return /*#__PURE__*/_react["default"].createElement(_grommet.NameValuePair, {
        key: name,
        name: name
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, value));
    })))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/NameValueList/Layout'
};