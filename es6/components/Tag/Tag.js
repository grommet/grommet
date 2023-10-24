var _excluded = ["name", "value", "size", "onRemove", "onClick"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { FormClose } from 'grommet-icons/icons/FormClose';
import { defaultProps } from '../../default-props';
import { TagPropTypes } from './propTypes';
import { Box } from '../Box';
import { Text } from '../Text';
import { StyledRemoveButton, StyledTagButton } from './StyledTag';
var Tag = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _theme$tag$icons, _theme$tag$size, _theme$tag$size2, _theme$tag$size3, _theme$tag$size4;
  var name = _ref.name,
    value = _ref.value,
    size = _ref.size,
    onRemove = _ref.onRemove,
    onClick = _ref.onClick,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var theme = useContext(ThemeContext) || defaultProps.theme;
  var RemoveIcon = ((_theme$tag$icons = theme.tag.icons) == null ? void 0 : _theme$tag$icons.remove) || FormClose;
  var containerProps = _extends({
    ref: ref,
    align: 'center',
    background: theme.tag.background,
    border: theme.tag.border,
    round: ((_theme$tag$size = theme.tag.size) == null || (_theme$tag$size = _theme$tag$size[size]) == null ? void 0 : _theme$tag$size.round) || theme.tag.round
  }, rest);
  var contents = /*#__PURE__*/React.createElement(Box, {
    width: {
      min: 'min-content'
    },
    pad: ((_theme$tag$size2 = theme.tag.size) == null || (_theme$tag$size2 = _theme$tag$size2[size]) == null ? void 0 : _theme$tag$size2.pad) || theme.tag.pad
  }, /*#__PURE__*/React.createElement(Text, {
    size: size
  }, name && /*#__PURE__*/React.createElement(Text, _extends({}, theme.tag.name, {
    size: size
  }), ' ', name), name && value ? /*#__PURE__*/React.createElement(Text, {
    size: size
  }, theme.tag.separator) : '', value && /*#__PURE__*/React.createElement(Text, _extends({}, theme.tag.value, {
    size: size
  }), value)));
  if (onClick && onRemove) {
    console.warn('Tag cannot combine "onClick" and "onRemove".');
  }
  return onRemove || !onClick ? /*#__PURE__*/React.createElement(Box, _extends({
    flex: false,
    direction: "row",
    width: {
      min: 'min-content'
    }
  }, containerProps), contents, onRemove && /*#__PURE__*/React.createElement(StyledRemoveButton, _extends({
    onClick: onRemove,
    plain: true,
    hoverIndicator: true,
    focusIndicator: true,
    icon: /*#__PURE__*/React.createElement(RemoveIcon, (_theme$tag$size3 = theme.tag.size) == null || (_theme$tag$size3 = _theme$tag$size3[size]) == null ? void 0 : _theme$tag$size3.icon),
    round: ((_theme$tag$size4 = theme.tag.size) == null || (_theme$tag$size4 = _theme$tag$size4[size]) == null ? void 0 : _theme$tag$size4.round) || theme.tag.round
  }, theme.tag.remove))) : /*#__PURE__*/React.createElement(StyledTagButton, _extends({
    flex: false,
    plain: true,
    onClick: onClick,
    hoverIndicator: true,
    focusIndicator: true
  }, containerProps), contents);
});
Tag.displayName = 'Tag';
Tag.prototype = TagPropTypes;
export { Tag };