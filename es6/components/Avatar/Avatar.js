function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { StyledAvatar, StyledAvatarText } from './StyledAvatar';

var Avatar = function Avatar(_ref) {
  var _ref$align = _ref.align,
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
      rest = _objectWithoutPropertiesLoose(_ref, ["align", "children", "height", "justify", "round", "size", "src", "width"]);

  var theme = useContext(ThemeContext) || defaultProps.theme;
  var avatarSize = theme.avatar.size[size] || size;
  var avatarProps = {
    align: align,
    height: avatarSize,
    justify: justify,
    overflow: 'hidden',
    round: round,
    width: avatarSize
  };

  var AvatarChildren = function AvatarChildren() {
    return /*#__PURE__*/React.createElement(StyledAvatar, _extends({}, avatarProps, rest), children);
  };

  if (height || width) {
    console.warn('Avatar should use `size` instead of `height` or `width` props');
  }

  if (typeof src === 'string') {
    return /*#__PURE__*/React.createElement(StyledAvatar, _extends({}, avatarProps, rest, {
      background: "url(" + src + ")"
    }));
  }

  if (typeof children === 'string') {
    return /*#__PURE__*/React.createElement(StyledAvatar, _extends({}, avatarProps, rest), /*#__PURE__*/React.createElement(StyledAvatarText, {
      alignSelf: "center",
      size: "large"
    }, children));
  }

  return /*#__PURE__*/React.createElement(AvatarChildren, null);
};

export { Avatar };