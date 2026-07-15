function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import styled from 'styled-components';
import { Like } from 'grommet-icons/icons/Like';
import { LikeFill } from 'grommet-icons/icons/LikeFill';
import { Dislike } from 'grommet-icons/icons/Dislike';
import { DislikeFill } from 'grommet-icons/icons/DislikeFill';
import { Box } from '../Box';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { useThemeValue } from '../../utils/useThemeValue';
import { focusStyle, useKeyboard } from '../../utils';
var StyledThumbsRatingBox = styled(Box).withConfig({
  displayName: "ThumbsRating__StyledThumbsRatingBox",
  componentId: "sc-1xsgzvn-0"
})(["", ";"], function (props) {
  return props.focus && focusStyle();
});
var ThumbsRating = function ThumbsRating(_ref) {
  var _theme$thumbsRating, _theme$thumbsRating2, _theme$thumbsRating3, _theme$thumbsRating4;
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var usingKeyboard = useKeyboard();
  var LikeIcon = ((_theme$thumbsRating = theme.thumbsRating) == null || (_theme$thumbsRating = _theme$thumbsRating.icons) == null ? void 0 : _theme$thumbsRating.like) || Like;
  var LikeSelectedIcon = ((_theme$thumbsRating2 = theme.thumbsRating) == null || (_theme$thumbsRating2 = _theme$thumbsRating2.icons) == null ? void 0 : _theme$thumbsRating2.likeSelected) || LikeFill;
  var DislikeIcon = ((_theme$thumbsRating3 = theme.thumbsRating) == null || (_theme$thumbsRating3 = _theme$thumbsRating3.icons) == null ? void 0 : _theme$thumbsRating3.dislike) || Dislike;
  var DislikeSelectedIcon = ((_theme$thumbsRating4 = theme.thumbsRating) == null || (_theme$thumbsRating4 = _theme$thumbsRating4.icons) == null ? void 0 : _theme$thumbsRating4.dislikeSelected) || DislikeFill;
  return /*#__PURE__*/React.createElement(RadioButtonGroup, _extends({
    direction: "row",
    options: ['like', 'dislike']
  }, rest), function (option, _ref2) {
    var _theme$thumbsRating7, _theme$thumbsRating8;
    var checked = _ref2.checked,
      focus = _ref2.focus;
    if (option === 'like') {
      var _theme$thumbsRating5, _theme$thumbsRating6;
      return /*#__PURE__*/React.createElement(StyledThumbsRatingBox, {
        focus: focus && usingKeyboard
      }, checked ? /*#__PURE__*/React.createElement(LikeSelectedIcon, {
        color: (_theme$thumbsRating5 = theme.thumbsRating) == null || (_theme$thumbsRating5 = _theme$thumbsRating5.like) == null ? void 0 : _theme$thumbsRating5.color
      }) : /*#__PURE__*/React.createElement(LikeIcon, {
        color: (_theme$thumbsRating6 = theme.thumbsRating) == null || (_theme$thumbsRating6 = _theme$thumbsRating6.like) == null ? void 0 : _theme$thumbsRating6.color
      }));
    }
    return /*#__PURE__*/React.createElement(StyledThumbsRatingBox, {
      focus: focus && usingKeyboard
    }, checked ? /*#__PURE__*/React.createElement(DislikeSelectedIcon, {
      color: (_theme$thumbsRating7 = theme.thumbsRating) == null || (_theme$thumbsRating7 = _theme$thumbsRating7.dislike) == null ? void 0 : _theme$thumbsRating7.color
    }) : /*#__PURE__*/React.createElement(DislikeIcon, {
      color: (_theme$thumbsRating8 = theme.thumbsRating) == null || (_theme$thumbsRating8 = _theme$thumbsRating8.dislike) == null ? void 0 : _theme$thumbsRating8.color
    }));
  });
};
ThumbsRating.displayName = 'ThumbsRating';
export { ThumbsRating };