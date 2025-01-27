var _excluded = ["children", "color", "fill", "size"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef, useMemo } from 'react';
import { StyledParagraph } from './StyledParagraph';
import { ParagraphPropTypes } from './propTypes';
import { useSkeleton } from '../Skeleton';
import { ParagraphSkeleton } from './ParagraphSkeleton';
import { TextContext } from '../Text/TextContext';
import { useThemeValue } from '../../utils/useThemeValue';
var Paragraph = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var children = _ref.children,
    color = _ref.color,
    fill = _ref.fill,
    size = _ref.size,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  var skeleton = useSkeleton();
  var textContextValue = useMemo(function () {
    return {
      size: size
    };
  }, [size]);
  if (skeleton) {
    return /*#__PURE__*/React.createElement(ParagraphSkeleton, _extends({
      ref: ref,
      fill: fill,
      size: size
    }, rest), children);
  }
  return /*#__PURE__*/React.createElement(StyledParagraph, _extends({
    ref: ref,
    colorProp: color,
    fillProp: fill,
    size: size
  }, passThemeFlag, rest), children !== undefined ? /*#__PURE__*/React.createElement(TextContext.Provider, {
    value: textContextValue
  }, children) : undefined);
});
Paragraph.displayName = 'Paragraph';
Paragraph.prototype = ParagraphPropTypes;
export { Paragraph };