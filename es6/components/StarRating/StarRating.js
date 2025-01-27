var _excluded = ["name", "defaultValue", "value"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useContext } from 'react';
import styled from 'styled-components';
import { Star } from 'grommet-icons/icons/Star';
import { StarOutline } from 'grommet-icons/icons/StarOutline';
import { Box } from '../Box';
import { FormContext } from '../Form/FormContext';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { useThemeValue } from '../../utils/useThemeValue';
import { useKeyboard, focusStyle } from '../../utils';
var StyledStarRatingBox = styled(Box).withConfig({
  displayName: "StarRating__StyledStarRatingBox",
  componentId: "sc-34rgjv-0"
})(["", ";"], function (props) {
  return props.focus && focusStyle();
});
var StarRating = function StarRating(_ref) {
  var name = _ref.name,
    defaultValue = _ref.defaultValue,
    valueProp = _ref.value,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var formContext = useContext(FormContext);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var usingKeyboard = useKeyboard();
  var _formContext$useFormI = formContext.useFormInput({
      name: name,
      value: valueProp,
      initialValue: defaultValue != null ? defaultValue : 0
    }),
    value = _formContext$useFormI[0],
    setValue = _formContext$useFormI[1];
  var options = [];
  for (var i = 1; i < 6; i += 1) {
    options.push(i);
  }
  return /*#__PURE__*/React.createElement(RadioButtonGroup, _extends({
    name: name,
    direction: "row",
    options: options,
    onChange: function onChange(event) {
      setValue(event.value);
    }
  }, rest), function (option, _ref2) {
    var _theme$starRating, _theme$starRating2;
    var focus = _ref2.focus;
    return /*#__PURE__*/React.createElement(StyledStarRatingBox, {
      focus: focus && usingKeyboard
    }, option <= value ? /*#__PURE__*/React.createElement(Star, {
      color: (_theme$starRating = theme.starRating) == null ? void 0 : _theme$starRating.color
    }) : /*#__PURE__*/React.createElement(StarOutline, {
      color: (_theme$starRating2 = theme.starRating) == null ? void 0 : _theme$starRating2.color
    }));
  });
};
StarRating.displayName = 'StarRating';
export { StarRating };