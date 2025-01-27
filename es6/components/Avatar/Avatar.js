var _excluded = ["a11yTitle", "aria-label", "align", "children", "height", "justify", "round", "size", "src", "width"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useCallback, useMemo } from 'react';
import { Image } from '../Image';
import { StyledAvatar, StyledAvatarText } from './StyledAvatar';
import { AvatarPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
var Avatar = function Avatar(_ref) {
  var a11yTitle = _ref.a11yTitle,
    ariaLabel = _ref['aria-label'],
    _ref$align = _ref.align,
    align = _ref$align === void 0 ? 'center' : _ref$align,
    children = _ref.children,
    height = _ref.height,
    _ref$justify = _ref.justify,
    justify = _ref$justify === void 0 ? 'center' : _ref$justify,
    _ref$round = _ref.round,
    round = _ref$round === void 0 ? 'full' : _ref$round,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    src = _ref.src,
    width = _ref.width,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var avatarSize = theme.avatar.size[size] || size;
  var avatarTextSize = theme.avatar.text.size[size] || 'large';
  var avatarProps = useMemo(function () {
    return {
      align: align,
      height: avatarSize,
      justify: justify,
      overflow: 'hidden',
      round: round,
      width: avatarSize
    };
  }, [align, avatarSize, justify, round]);
  var AvatarChildren = useCallback(function () {
    return /*#__PURE__*/React.createElement(StyledAvatar, _extends({}, avatarProps, rest), children);
  }, [avatarProps, children, rest]);
  if (height || width) {
    console.warn('Avatar should use `size` instead of `height` or `width` props');
  }
  var content;
  if (typeof children === 'string') {
    content = /*#__PURE__*/React.createElement(StyledAvatarText, _extends({
      alignSelf: "center",
      size: avatarTextSize
    }, passThemeFlag), children);
  } else if (typeof src === 'string') {
    content = /*#__PURE__*/React.createElement(Image, {
      role: "presentation",
      fit: "contain",
      src: src
    });
  }
  if (typeof children === 'string' || typeof src === 'string') {
    return /*#__PURE__*/React.createElement(StyledAvatar, _extends({
      role: typeof src === 'string' ? 'figure' : undefined,
      a11yTitle: a11yTitle || ariaLabel
    }, avatarProps, passThemeFlag, rest), content);
  }
  return /*#__PURE__*/React.createElement(AvatarChildren, null);
};
Avatar.propTypes = AvatarPropTypes;
export { Avatar };