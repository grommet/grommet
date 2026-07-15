"use strict";

exports.__esModule = true;
exports["default"] = exports.Example = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("../../DataTable/stories/data");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Example = exports.Example = function Example() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Main, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Data, {
      data: _data.DATA,
      toolbar: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Cards, {
      size: "medium"
    }, function (item) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Card, {
        as: "li",
        key: item.name,
        pad: "small"
      }, /*#__PURE__*/_react["default"].createElement(_grommet.CardBody, null, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
        level: 2,
        margin: "none"
      }, item.name)), /*#__PURE__*/_react["default"].createElement(_grommet.CardFooter, null, item.location || '--'));
    }))))
    // </Grommet>
  );
};
Example.storyName = 'Cards';
Example.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Data/Data/Cards'
};