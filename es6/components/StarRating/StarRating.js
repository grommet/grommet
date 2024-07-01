var _excluded = ["name", "defaultValue", "value"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
import React, { useContext } from 'react';
import { Star } from 'grommet-icons/icons/Star';
import { StarOutline } from 'grommet-icons/icons/StarOutline';
import { FormContext } from '../Form/FormContext';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { useThemeValue } from '../../utils/useThemeValue';
var StarRating = function StarRating(_ref) {
  var name = _ref.name,
    defaultValue = _ref.defaultValue,
    valueProp = _ref.value,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var formContext = useContext(FormContext);
  var theme = useThemeValue();
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
  }, rest), function (option) {
    var _theme$starRating, _theme$starRating2;
    return option <= value ? /*#__PURE__*/React.createElement(Star, {
      color: (_theme$starRating = theme.starRating) == null ? void 0 : _theme$starRating.color
    }) : /*#__PURE__*/React.createElement(StarOutline, {
      color: (_theme$starRating2 = theme.starRating) == null ? void 0 : _theme$starRating2.color
    });
  });
};
StarRating.displayName = 'StarRating';
export { StarRating };