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
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var usingKeyboard = useKeyboard();
  return /*#__PURE__*/React.createElement(RadioButtonGroup, _extends({
    direction: "row",
    options: ['like', 'dislike']
  }, rest), function (option, _ref2) {
    var _theme$thumbsRating3, _theme$thumbsRating4;
    var checked = _ref2.checked,
      focus = _ref2.focus;
    if (option === 'like') {
      var _theme$thumbsRating, _theme$thumbsRating2;
      return /*#__PURE__*/React.createElement(StyledThumbsRatingBox, {
        focus: focus && usingKeyboard
      }, checked ? /*#__PURE__*/React.createElement(LikeFill, {
        color: (_theme$thumbsRating = theme.thumbsRating) == null || (_theme$thumbsRating = _theme$thumbsRating.like) == null ? void 0 : _theme$thumbsRating.color
      }) : /*#__PURE__*/React.createElement(Like, {
        color: (_theme$thumbsRating2 = theme.thumbsRating) == null || (_theme$thumbsRating2 = _theme$thumbsRating2.like) == null ? void 0 : _theme$thumbsRating2.color
      }));
    }
    return /*#__PURE__*/React.createElement(StyledThumbsRatingBox, {
      focus: focus && usingKeyboard
    }, checked ? /*#__PURE__*/React.createElement(DislikeFill, {
      color: (_theme$thumbsRating3 = theme.thumbsRating) == null || (_theme$thumbsRating3 = _theme$thumbsRating3.dislike) == null ? void 0 : _theme$thumbsRating3.color
    }) : /*#__PURE__*/React.createElement(Dislike, {
      color: (_theme$thumbsRating4 = theme.thumbsRating) == null || (_theme$thumbsRating4 = _theme$thumbsRating4.dislike) == null ? void 0 : _theme$thumbsRating4.color
    }));
  });
};
ThumbsRating.displayName = 'ThumbsRating';
export { ThumbsRating };