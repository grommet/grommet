"use strict";

exports.__esModule = true;
exports.Avatar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Image = require("../Image");
var _StyledAvatar = require("./StyledAvatar");
var _propTypes = require("./propTypes");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["a11yTitle", "aria-label", "align", "children", "height", "imageProps", "justify", "round", "size", "src", "width"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Avatar = exports.Avatar = function Avatar(_ref) {
  var a11yTitle = _ref.a11yTitle,
    ariaLabel = _ref['aria-label'],
    _ref$align = _ref.align,
    align = _ref$align === void 0 ? 'center' : _ref$align,
    children = _ref.children,
    height = _ref.height,
    imageProps = _ref.imageProps,
    _ref$justify = _ref.justify,
    justify = _ref$justify === void 0 ? 'center' : _ref$justify,
    _ref$round = _ref.round,
    round = _ref$round === void 0 ? 'full' : _ref$round,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    src = _ref.src,
    width = _ref.width,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var avatarSize = theme.avatar.size[size] || size;
  var avatarTextSize = theme.avatar.text.size[size] || 'large';
  var avatarProps = (0, _react.useMemo)(function () {
    return {
      align: align,
      height: avatarSize,
      justify: justify,
      overflow: 'hidden',
      round: round,
      width: avatarSize
    };
  }, [align, avatarSize, justify, round]);
  var AvatarChildren = (0, _react.useCallback)(function () {
    return /*#__PURE__*/_react["default"].createElement(_StyledAvatar.StyledAvatar, _extends({}, avatarProps, rest), children);
  }, [avatarProps, children, rest]);
  if (height || width) {
    console.warn('Avatar should use `size` instead of `height` or `width` props');
  }
  var content;
  if (typeof children === 'string') {
    content = /*#__PURE__*/_react["default"].createElement(_StyledAvatar.StyledAvatarText, _extends({
      alignSelf: "center",
      size: avatarTextSize
    }, passThemeFlag), children);
  } else if (typeof src === 'string') {
    content = /*#__PURE__*/_react["default"].createElement(_Image.Image, _extends({
      role: "presentation",
      fit: "contain",
      src: src
    }, imageProps));
  }
  if (typeof children === 'string' || typeof src === 'string') {
    return /*#__PURE__*/_react["default"].createElement(_StyledAvatar.StyledAvatar, _extends({
      role: typeof src === 'string' ? 'figure' : undefined,
      a11yTitle: a11yTitle || ariaLabel
    }, avatarProps, passThemeFlag, rest), content);
  }
  return /*#__PURE__*/_react["default"].createElement(AvatarChildren, null);
};
Avatar.propTypes = _propTypes.AvatarPropTypes;