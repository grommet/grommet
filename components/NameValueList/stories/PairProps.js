"use strict";

exports.__esModule = true;
exports["default"] = exports.PairProps = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("./data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PairProps = exports.PairProps = function PairProps() {
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
    }, "layout = column (default) / pairProps direction = column"), /*#__PURE__*/_react["default"].createElement(_grommet.NameValueList, {
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
    })))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/NameValueList/Pair Props'
};