"use strict";

exports.__esModule = true;
exports.Avatar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _defaultProps = require("../../default-props");

var _StyledAvatar = require("./StyledAvatar");

var _propTypes = require("./propTypes");

var _excluded = ["align", "children", "height", "justify", "round", "size", "src", "width"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var avatarSize = theme.avatar.size[size] || size;
  var avatarTextSize = theme.avatar.text.size[size] || 'large';
  var avatarProps = {
    align: align,
    height: avatarSize,
    justify: justify,
    overflow: 'hidden',
    round: round,
    width: avatarSize
  };

  var AvatarChildren = function AvatarChildren() {
    return /*#__PURE__*/_react["default"].createElement(_StyledAvatar.StyledAvatar, _extends({}, avatarProps, rest), children);
  };

  if (height || width) {
    console.warn('Avatar should use `size` instead of `height` or `width` props');
  }

  if (typeof src === 'string') {
    return /*#__PURE__*/_react["default"].createElement(_StyledAvatar.StyledAvatar, _extends({}, avatarProps, rest, {
      background: "url(" + src + ")"
    }));
  }

  if (typeof children === 'string') {
    return /*#__PURE__*/_react["default"].createElement(_StyledAvatar.StyledAvatar, _extends({}, avatarProps, rest), /*#__PURE__*/_react["default"].createElement(_StyledAvatar.StyledAvatarText, {
      alignSelf: "center",
      size: avatarTextSize
    }, children));
  }

  return /*#__PURE__*/_react["default"].createElement(AvatarChildren, null);
};

exports.Avatar = Avatar;
Avatar.propTypes = _propTypes.AvatarPropTypes;