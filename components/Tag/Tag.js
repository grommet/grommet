"use strict";

exports.__esModule = true;
exports.Tag = void 0;
var _react = _interopRequireWildcard(require("react"));
var _FormClose = require("grommet-icons/icons/FormClose");
var _propTypes = require("./propTypes");
var _Box = require("../Box");
var _Text = require("../Text");
var _StyledTag = require("./StyledTag");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["name", "value", "size", "onRemove", "onClick"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Tag = exports.Tag = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _theme$tag$icons, _theme$tag$size, _theme$tag$size2, _theme$tag$size3, _theme$tag$size4, _theme$tag$size5;
  var name = _ref.name,
    value = _ref.value,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    onRemove = _ref.onRemove,
    onClick = _ref.onClick,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var RemoveIcon = ((_theme$tag$icons = theme.tag.icons) == null ? void 0 : _theme$tag$icons.remove) || _FormClose.FormClose;
  var containerProps = _extends({
    ref: ref,
    align: 'center',
    background: theme.tag.background,
    border: theme.tag.border,
    round: ((_theme$tag$size = theme.tag.size) == null || (_theme$tag$size = _theme$tag$size[size]) == null ? void 0 : _theme$tag$size.round) || theme.tag.round
  }, rest);
  var contents = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    width: {
      min: 'min-content'
    },
    pad: ((_theme$tag$size2 = theme.tag.size) == null || (_theme$tag$size2 = _theme$tag$size2[size]) == null ? void 0 : _theme$tag$size2.pad) || theme.tag.pad
  }, /*#__PURE__*/_react["default"].createElement(_Text.Text, {
    size: size
  }, name && /*#__PURE__*/_react["default"].createElement(_Text.Text, _extends({}, theme.tag.name, {
    size: size
  }), ' ', name), name && value ? /*#__PURE__*/_react["default"].createElement(_Text.Text, {
    size: size
  }, theme.tag.separator) : '', value && /*#__PURE__*/_react["default"].createElement(_Text.Text, _extends({}, theme.tag.value, {
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
  return onRemove || !onClick ? /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    flex: false,
    direction: "row",
    width: {
      min: 'min-content'
    }
  }, containerProps), contents, onRemove && /*#__PURE__*/_react["default"].createElement(_StyledTag.StyledRemoveButton, _extends({
    onClick: onRemove
  }, removeProps, {
    icon: /*#__PURE__*/_react["default"].createElement(RemoveIcon, (_theme$tag$size3 = theme.tag.size) == null || (_theme$tag$size3 = _theme$tag$size3[size]) == null ? void 0 : _theme$tag$size3.icon),
    round: ((_theme$tag$size4 = theme.tag.size) == null || (_theme$tag$size4 = _theme$tag$size4[size]) == null ? void 0 : _theme$tag$size4.round) || theme.tag.round
  }, theme.tag.remove, (_theme$tag$size5 = theme.tag.size) == null || (_theme$tag$size5 = _theme$tag$size5[size]) == null ? void 0 : _theme$tag$size5.remove, passThemeFlag))) : /*#__PURE__*/_react["default"].createElement(_StyledTag.StyledTagButton, _extends({
    flex: false,
    plain: true,
    onClick: onClick,
    hoverIndicator: true,
    focusIndicator: true
  }, containerProps, passThemeFlag), contents);
});
Tag.displayName = 'Tag';
Tag.prototype = _propTypes.TagPropTypes;