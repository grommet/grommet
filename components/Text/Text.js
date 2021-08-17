"use strict";

exports.__esModule = true;
exports.Text = void 0;

var _react = _interopRequireWildcard(require("react"));

var _StyledText = require("./StyledText");

var _Tip = require("../Tip");

var _utils = require("../../utils");

var _propTypes = require("./propTypes");

var _excluded = ["children", "color", "tag", "as", "tip", "a11yTitle", "truncate"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Text = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
      color = _ref.color,
      tag = _ref.tag,
      as = _ref.as,
      tipProp = _ref.tip,
      _ref$a11yTitle = _ref.a11yTitle,
      a11yTitle = _ref$a11yTitle === void 0 ? typeof tipProp === 'string' ? tipProp : undefined : _ref$a11yTitle,
      truncate = _ref.truncate,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var textRef = (0, _utils.useForwardedRef)(ref);

  var _useState = (0, _react.useState)(tipProp),
      tip = _useState[0],
      setTip = _useState[1]; // place the text content in a tip if truncate === 'tip'
  // and the text has been truncated


  (0, _react.useEffect)(function () {
    if (truncate === 'tip') {
      if (textRef.current && textRef.current.scrollWidth > textRef.current.offsetWidth) {
        setTip(children);
      } else setTip(undefined);
    }
  }, [children, textRef, truncate]);

  var styledTextResult = /*#__PURE__*/_react["default"].createElement(_StyledText.StyledText, _extends({
    as: !as && tag ? tag : as,
    colorProp: color,
    "aria-label": a11yTitle,
    truncate: truncate
  }, rest, {
    ref: textRef
  }), children);

  if (tip) {
    if (typeof tip === 'string') {
      return /*#__PURE__*/_react["default"].createElement(_Tip.Tip, {
        content: tip
      }, styledTextResult);
    }

    return /*#__PURE__*/_react["default"].createElement(_Tip.Tip, tip, styledTextResult);
  }

  return styledTextResult;
});
exports.Text = Text;
Text.displayName = 'Text';
Text.defaultProps = {
  level: 1
};
Text.propTypes = _propTypes.TextPropTypes;