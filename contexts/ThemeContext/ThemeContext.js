"use strict";

exports.__esModule = true;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = require("styled-components");

exports.ThemeContext = _styledComponents.ThemeContext;

var _utils = require("../../utils");

var _propTypes2 = require("./propTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_styledComponents.ThemeContext.Extend = function (_ref) {
  var children = _ref.children,
      value = _ref.value;
  return /*#__PURE__*/_react["default"].createElement(_styledComponents.ThemeContext.Consumer, null, function (theme) {
    return /*#__PURE__*/_react["default"].createElement(_styledComponents.ThemeContext.Provider, {
      value: (0, _utils.deepMerge)(theme, value)
    }, children);
  });
};

_styledComponents.ThemeContext.Extend.propTypes = {
  children: _propTypes["default"].node.isRequired,
  value: _propTypes["default"].shape({}).isRequired
};
_styledComponents.ThemeContext.propTypes = _propTypes2.ThemeContextPropTypes;