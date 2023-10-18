"use strict";

exports.__esModule = true;
exports["default"] = exports.All = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var sizes = ['xxlarge', 'xlarge', 'large', 'medium', 'small', '10px'];
var paragraphFiller = "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua.\n";
var All = exports.All = function All() {
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, sizes.map(function (size) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
      key: size,
      size: size
    }, "Paragraph " + size, paragraphFiller);
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    color: "status-critical"
  }, "This is an error message."), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    fill: true
  }, "This is a full-width paragraph, using the \"fill\" property:", ' ', paragraphFiller), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    dangerouslySetInnerHTML: {
      __html: 'This is a dangerouslySetInnerHTML!'
    }
  }));
};
var _default = exports["default"] = {
  title: 'Type/Paragraph/All'
};