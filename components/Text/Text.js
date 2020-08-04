"use strict";

exports.__esModule = true;
exports.Text = void 0;

var _react = _interopRequireWildcard(require("react"));

var _StyledText = require("./StyledText");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Text = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var color = _ref.color,
      tag = _ref.tag,
      as = _ref.as,
      a11yTitle = _ref.a11yTitle,
      rest = _objectWithoutPropertiesLoose(_ref, ["color", "tag", "as", "a11yTitle"]);

  return /*#__PURE__*/_react["default"].createElement(_StyledText.StyledText, _extends({
    as: !as && tag ? tag : as,
    colorProp: color,
    "aria-label": a11yTitle
  }, rest, {
    ref: ref
  }));
});
Text.displayName = 'Text';
Text.defaultProps = {
  level: 1
};
var TextDoc;

if (process.env.NODE_ENV !== 'production') {
  TextDoc = require('./doc').doc(Text); // eslint-disable-line global-require
}

var TextWrapper = TextDoc || Text;
exports.Text = TextWrapper;