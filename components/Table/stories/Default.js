"use strict";

exports.__esModule = true;
exports["default"] = exports.Default = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("./data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Default = exports.Default = function Default() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Table, {
      caption: "Default Table"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TableHeader, null, /*#__PURE__*/_react["default"].createElement(_grommet.TableRow, null, _data.columns.map(function (c) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.TableCell, {
        key: c.property,
        scope: "col",
        align: c.align
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, c.label));
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.TableBody, null, _data.data.map(function (datum) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.TableRow, {
        key: datum.id
      }, _data.columns.map(function (c) {
        return /*#__PURE__*/_react["default"].createElement(_grommet.TableCell, {
          key: c.property,
          scope: c.dataScope,
          align: c.align
        }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, c.format ? c.format(datum) : datum[c.property]));
      }));
    })), /*#__PURE__*/_react["default"].createElement(_grommet.TableFooter, null, /*#__PURE__*/_react["default"].createElement(_grommet.TableRow, null, _data.columns.map(function (c) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.TableCell, {
        key: c.property,
        align: c.align
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, c.footer));
    })))))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Table/Default'
};