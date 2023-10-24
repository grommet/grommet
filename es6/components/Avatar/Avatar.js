var _excluded = ["a11yTitle", "aria-label", "align", "children", "height", "justify", "round", "size", "src", "width"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useCallback, useContext, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
import { Image } from '../Image';
import { defaultProps } from '../../default-props';
import { StyledAvatar, StyledAvatarText } from './StyledAvatar';
import { AvatarPropTypes } from './propTypes';
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
  var theme = useContext(ThemeContext) || defaultProps.theme;
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
    content = /*#__PURE__*/React.createElement(StyledAvatarText, {
      alignSelf: "center",
      size: avatarTextSize
    }, children);
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
    }, avatarProps, rest), content);
  }
  return /*#__PURE__*/React.createElement(AvatarChildren, null);
};
Avatar.propTypes = AvatarPropTypes;
export { Avatar };