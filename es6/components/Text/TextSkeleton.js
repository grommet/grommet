var _excluded = ["as", "size"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Skeleton } from '../Skeleton';
var TextSkeleton = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var as = _ref.as,
    sizeProp = _ref.size,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var theme = useContext(ThemeContext) || defaultProps.theme;
  var size = sizeProp || 'medium';
  var data = theme.text[size];
  var height = data ? data.size : sizeProp;
  return /*#__PURE__*/React.createElement(Skeleton, _extends({
    ref: ref,
    as: as,
    height: height
  }, theme.text.skeleton, rest));
});
TextSkeleton.displayName = 'TextSkeleton';
export { TextSkeleton };