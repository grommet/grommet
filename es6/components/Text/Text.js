var _excluded = ["children", "color", "tag", "as", "tip", "a11yTitle", "truncate"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useState } from 'react';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { StyledText } from './StyledText';
import { Tip } from '../Tip';
import { useForwardedRef } from '../../utils';
import { TextPropTypes } from './propTypes';
var Text = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var children = _ref.children,
      color = _ref.color,
      tag = _ref.tag,
      as = _ref.as,
      tipProp = _ref.tip,
      _ref$a11yTitle = _ref.a11yTitle,
      a11yTitle = _ref$a11yTitle === void 0 ? typeof tipProp === 'string' && tipProp || (tipProp == null ? void 0 : tipProp.content) || undefined : _ref$a11yTitle,
      truncate = _ref.truncate,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var textRef = useForwardedRef(ref);

  var _useState = useState(false),
      textTruncated = _useState[0],
      setTextTruncated = _useState[1];

  useLayoutEffect(function () {
    var updateTip = function updateTip() {
      setTextTruncated(false);

      if (truncate === 'tip' && textRef.current && textRef.current.scrollWidth > textRef.current.offsetWidth) {
        setTextTruncated(true);
      }
    };

    window.addEventListener('resize', updateTip);
    updateTip();
    return function () {
      return window.removeEventListener('resize', updateTip);
    };
  }, [textRef, truncate]);
  var styledTextResult = /*#__PURE__*/React.createElement(StyledText, _extends({
    as: !as && tag ? tag : as,
    colorProp: color,
    "aria-label": a11yTitle,
    truncate: truncate
  }, rest, {
    ref: textRef
  }), children);

  if (tipProp || textTruncated) {
    // place the text content in a tip if truncate === 'tip'
    // and the text has been truncated
    if (textTruncated) {
      return /*#__PURE__*/React.createElement(Tip, _extends({
        content: children
      }, tipProp), styledTextResult);
    } // place the text content in a tip if truncate !== 'tip'
    // it displays even if the text has not truncated


    if (truncate !== 'tip') {
      return /*#__PURE__*/React.createElement(Tip, tipProp, styledTextResult);
    }
  }

  return styledTextResult;
});
Text.displayName = 'Text';
Text.defaultProps = {
  level: 1
};
Text.propTypes = TextPropTypes;
export { Text };