var _excluded = ["children", "color", "tag", "as", "tip", "a11yTitle", "truncate", "size", "skeleton", "level"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef, useMemo, useState } from 'react';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { StyledText } from './StyledText';
import { Tip } from '../Tip';
import { useForwardedRef } from '../../utils';
import { TextPropTypes } from './propTypes';
import { useSkeleton } from '../Skeleton';
import { TextSkeleton } from './TextSkeleton';
import { TextContext } from './TextContext';
import { useThemeValue } from '../../utils/useThemeValue';
var Text = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var children = _ref.children,
    color = _ref.color,
    tag = _ref.tag,
    as = _ref.as,
    tipProp = _ref.tip,
    _ref$a11yTitle = _ref.a11yTitle,
    a11yTitle = _ref$a11yTitle === void 0 ? typeof tipProp === 'string' && tipProp || (tipProp == null ? void 0 : tipProp.content) || undefined : _ref$a11yTitle,
    truncate = _ref.truncate,
    size = _ref.size,
    skeletonProp = _ref.skeleton,
    _ref$level = _ref.level,
    level = _ref$level === void 0 ? 1 : _ref$level,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  var textRef = useForwardedRef(ref);
  var _useState = useState(false),
    textTruncated = _useState[0],
    setTextTruncated = _useState[1];
  var textContextValue = useMemo(function () {
    return {
      size: size
    };
  }, [size]);
  var skeleton = useSkeleton();
  useLayoutEffect(function () {
    var updateTip = function updateTip() {
      setTextTruncated(false);
      if (truncate === 'tip' && textRef.current && textRef.current.scrollWidth > textRef.current.offsetWidth) {
        setTextTruncated(true);
      }
    };
    window.addEventListener('resize', updateTip);
    window.addEventListener('pagechange', updateTip);
    updateTip();
    return function () {
      window.removeEventListener('resize', updateTip);
      window.removeEventListener('pagechange', updateTip);
    };
  }, [textRef, truncate]);
  if (skeleton) {
    return /*#__PURE__*/React.createElement(TextSkeleton, _extends({
      ref: ref,
      as: as,
      level: level,
      size: size
    }, skeletonProp, rest));
  }
  var styledTextResult = /*#__PURE__*/React.createElement(StyledText, _extends({
    as: !as && tag ? tag : as,
    colorProp: color,
    "aria-label": a11yTitle,
    level: level,
    truncate: truncate,
    size: size
  }, passThemeFlag, rest, {
    ref: textRef
  }), children !== undefined ? /*#__PURE__*/React.createElement(TextContext.Provider, {
    value: textContextValue
  }, children) : undefined);
  if (tipProp || textTruncated) {
    // place the text content in a tip if truncate === 'tip'
    // and the text has been truncated
    if (textTruncated) {
      return /*#__PURE__*/React.createElement(Tip, _extends({
        content: children
      }, tipProp), styledTextResult);
    }
    // place the text content in a tip if truncate !== 'tip'
    // it displays even if the text has not truncated
    if (truncate !== 'tip') {
      return /*#__PURE__*/React.createElement(Tip, tipProp, styledTextResult);
    }
  }
  return styledTextResult;
});
Text.displayName = 'Text';
Text.propTypes = TextPropTypes;
export { Text };