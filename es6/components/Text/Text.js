var _excluded = ["color", "tag", "as", "tip", "a11yTitle"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef } from 'react';
import { StyledText } from './StyledText';
import { Tip } from '../Tip';
var Text = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var color = _ref.color,
      tag = _ref.tag,
      as = _ref.as,
      tip = _ref.tip,
      _ref$a11yTitle = _ref.a11yTitle,
      a11yTitle = _ref$a11yTitle === void 0 ? typeof tip === 'string' ? tip : undefined : _ref$a11yTitle,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var styledTextResult = /*#__PURE__*/React.createElement(StyledText, _extends({
    as: !as && tag ? tag : as,
    colorProp: color,
    "aria-label": a11yTitle
  }, rest, {
    ref: ref
  }));

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
var TextDoc;

if (process.env.NODE_ENV !== 'production') {
  TextDoc = require('./doc').doc(Text); // eslint-disable-line global-require
}

var TextWrapper = TextDoc || Text;
export { TextWrapper as Text };