"use strict";

exports.__esModule = true;
exports["default"] = exports.Test = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Test = function Test() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: {
      tip: {
        drop: {
          background: 'red',
          elevation: 'large',
          margin: '21px',
          round: 'medium'
        }
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Tip, {
    plain: true,
    content: "tooltip"
  }, "Example"));
};

exports.Test = Test;
Test.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Controls/Tip/Test'
};
exports["default"] = _default;