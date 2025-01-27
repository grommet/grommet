var _excluded = ["name", "value", "size", "onRemove", "onClick"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef } from 'react';
import { FormClose } from 'grommet-icons/icons/FormClose';
import { TagPropTypes } from './propTypes';
import { Box } from '../Box';
import { Text } from '../Text';
import { StyledRemoveButton, StyledTagButton } from './StyledTag';
import { useThemeValue } from '../../utils/useThemeValue';
var Tag = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _theme$tag$icons, _theme$tag$size, _theme$tag$size2, _theme$tag$size3, _theme$tag$size4, _theme$tag$size5;
  var name = _ref.name,
    value = _ref.value,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    onRemove = _ref.onRemove,
    onClick = _ref.onClick,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
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
  var removeProps = !theme.tag.remove.kind ? {
    plain: true,
    hoverIndicator: true,
    focusIndicator: true
  } : {};
  return onRemove || !onClick ? /*#__PURE__*/React.createElement(Box, _extends({
    flex: false,
    direction: "row",
    width: {
      min: 'min-content'
    }
  }, containerProps), contents, onRemove && /*#__PURE__*/React.createElement(StyledRemoveButton, _extends({
    onClick: onRemove
  }, removeProps, {
    icon: /*#__PURE__*/React.createElement(RemoveIcon, (_theme$tag$size3 = theme.tag.size) == null || (_theme$tag$size3 = _theme$tag$size3[size]) == null ? void 0 : _theme$tag$size3.icon),
    round: ((_theme$tag$size4 = theme.tag.size) == null || (_theme$tag$size4 = _theme$tag$size4[size]) == null ? void 0 : _theme$tag$size4.round) || theme.tag.round
  }, theme.tag.remove, (_theme$tag$size5 = theme.tag.size) == null || (_theme$tag$size5 = _theme$tag$size5[size]) == null ? void 0 : _theme$tag$size5.remove, passThemeFlag))) : /*#__PURE__*/React.createElement(StyledTagButton, _extends({
    flex: false,
    plain: true,
    onClick: onClick,
    hoverIndicator: true,
    focusIndicator: true
  }, containerProps, passThemeFlag), contents);
});
Tag.displayName = 'Tag';
Tag.prototype = TagPropTypes;
export { Tag };