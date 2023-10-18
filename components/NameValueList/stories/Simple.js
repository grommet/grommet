"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("./data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Simple = exports.Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.NameValueList, null, Object.entries(_data.data).map(function (_ref) {
      var name = _ref[0],
        value = _ref[1];
      return /*#__PURE__*/_react["default"].createElement(_grommet.NameValuePair, {
        key: name,
        name: name
      }, value);
    })))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/NameValueList/Simple'
};