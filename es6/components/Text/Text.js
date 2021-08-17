var _excluded = ["children", "color", "tag", "as", "tip", "a11yTitle", "truncate"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useEffect, useState } from 'react';
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
      a11yTitle = _ref$a11yTitle === void 0 ? typeof tipProp === 'string' ? tipProp : undefined : _ref$a11yTitle,
      truncate = _ref.truncate,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var textRef = useForwardedRef(ref);

  var _useState = useState(tipProp),
      tip = _useState[0],
      setTip = _useState[1]; // place the text content in a tip if truncate === 'tip'
  // and the text has been truncated


  useEffect(function () {
    if (truncate === 'tip') {
      if (textRef.current && textRef.current.scrollWidth > textRef.current.offsetWidth) {
        setTip(children);
      } else setTip(undefined);
    }
  }, [children, textRef, truncate]);
  var styledTextResult = /*#__PURE__*/React.createElement(StyledText, _extends({
    as: !as && tag ? tag : as,
    colorProp: color,
    "aria-label": a11yTitle,
    truncate: truncate
  }, rest, {
    ref: textRef
  }), children);

  if (tip) {
    if (typeof tip === 'string') {
      return /*#__PURE__*/React.createElement(Tip, {
        content: tip
      }, styledTextResult);
    }

    return /*#__PURE__*/React.createElement(Tip, tip, styledTextResult);
  }

  return styledTextResult;
});
Text.displayName = 'Text';
Text.defaultProps = {
  level: 1
};
Text.propTypes = TextPropTypes;
export { Text };