"use strict";

exports.__esModule = true;
exports.ThemeContext = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _themes = require("../../themes");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ThemeContext = _react.default.createContext(_themes.base);

exports.ThemeContext = ThemeContext;

ThemeContext.Extend = function (_ref) {
  var children = _ref.children,
      value = _ref.value;
  return _react.default.createElement(ThemeContext.Consumer, null, function (theme) {
    return _react.default.createElement(ThemeContext.Provider, {
      value: (0, _utils.deepMerge)(theme, value)
    }, children);
  });
};

ThemeContext.Extend.propTypes = {
  children: _propTypes.default.node.isRequired,
  value: _propTypes.default.shape({}).isRequired
};