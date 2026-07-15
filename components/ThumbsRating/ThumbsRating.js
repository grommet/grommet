"use strict";

exports.__esModule = true;
exports.ThumbsRating = void 0;
var _react = _interopRequireDefault(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _Like = require("grommet-icons/icons/Like");
var _LikeFill = require("grommet-icons/icons/LikeFill");
var _Dislike = require("grommet-icons/icons/Dislike");
var _DislikeFill = require("grommet-icons/icons/DislikeFill");
var _Box = require("../Box");
var _RadioButtonGroup = require("../RadioButtonGroup");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _utils = require("../../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var StyledThumbsRatingBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "ThumbsRating__StyledThumbsRatingBox",
  componentId: "sc-1xsgzvn-0"
})(["", ";"], function (props) {
  return props.focus && (0, _utils.focusStyle)();
});
var ThumbsRating = exports.ThumbsRating = function ThumbsRating(_ref) {
  var _theme$thumbsRating, _theme$thumbsRating2, _theme$thumbsRating3, _theme$thumbsRating4;
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var usingKeyboard = (0, _utils.useKeyboard)();
  var LikeIcon = ((_theme$thumbsRating = theme.thumbsRating) == null || (_theme$thumbsRating = _theme$thumbsRating.icons) == null ? void 0 : _theme$thumbsRating.like) || _Like.Like;
  var LikeSelectedIcon = ((_theme$thumbsRating2 = theme.thumbsRating) == null || (_theme$thumbsRating2 = _theme$thumbsRating2.icons) == null ? void 0 : _theme$thumbsRating2.likeSelected) || _LikeFill.LikeFill;
  var DislikeIcon = ((_theme$thumbsRating3 = theme.thumbsRating) == null || (_theme$thumbsRating3 = _theme$thumbsRating3.icons) == null ? void 0 : _theme$thumbsRating3.dislike) || _Dislike.Dislike;
  var DislikeSelectedIcon = ((_theme$thumbsRating4 = theme.thumbsRating) == null || (_theme$thumbsRating4 = _theme$thumbsRating4.icons) == null ? void 0 : _theme$thumbsRating4.dislikeSelected) || _DislikeFill.DislikeFill;
  return /*#__PURE__*/_react["default"].createElement(_RadioButtonGroup.RadioButtonGroup, _extends({
    direction: "row",
    options: ['like', 'dislike']
  }, rest), function (option, _ref2) {
    var _theme$thumbsRating7, _theme$thumbsRating8;
    var checked = _ref2.checked,
      focus = _ref2.focus;
    if (option === 'like') {
      var _theme$thumbsRating5, _theme$thumbsRating6;
      return /*#__PURE__*/_react["default"].createElement(StyledThumbsRatingBox, {
        focus: focus && usingKeyboard
      }, checked ? /*#__PURE__*/_react["default"].createElement(LikeSelectedIcon, {
        color: (_theme$thumbsRating5 = theme.thumbsRating) == null || (_theme$thumbsRating5 = _theme$thumbsRating5.like) == null ? void 0 : _theme$thumbsRating5.color
      }) : /*#__PURE__*/_react["default"].createElement(LikeIcon, {
        color: (_theme$thumbsRating6 = theme.thumbsRating) == null || (_theme$thumbsRating6 = _theme$thumbsRating6.like) == null ? void 0 : _theme$thumbsRating6.color
      }));
    }
    return /*#__PURE__*/_react["default"].createElement(StyledThumbsRatingBox, {
      focus: focus && usingKeyboard
    }, checked ? /*#__PURE__*/_react["default"].createElement(DislikeSelectedIcon, {
      color: (_theme$thumbsRating7 = theme.thumbsRating) == null || (_theme$thumbsRating7 = _theme$thumbsRating7.dislike) == null ? void 0 : _theme$thumbsRating7.color
    }) : /*#__PURE__*/_react["default"].createElement(DislikeIcon, {
      color: (_theme$thumbsRating8 = theme.thumbsRating) == null || (_theme$thumbsRating8 = _theme$thumbsRating8.dislike) == null ? void 0 : _theme$thumbsRating8.color
    }));
  });
};
ThumbsRating.displayName = 'ThumbsRating';