"use strict";

exports.__esModule = true;
exports.Text = void 0;

var _react = _interopRequireDefault(require("react"));

var _StyledText = require("./StyledText");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Text = function Text(_ref) {
  var color = _ref.color,
      tag = _ref.tag,
      as = _ref.as,
      rest = _objectWithoutPropertiesLoose(_ref, ["color", "tag", "as"]);

  return _react.default.createElement(_StyledText.StyledText, _extends({
    as: !as && tag ? tag : as,
    colorProp: color
  }, rest));
};

Text.defaultProps = {
  level: 1
};
var TextDoc;

if (process.env.NODE_ENV !== 'production') {
  TextDoc = require('./doc').doc(Text); // eslint-disable-line global-require
}

var TextWrapper = TextDoc || Text;
exports.Text = TextWrapper;