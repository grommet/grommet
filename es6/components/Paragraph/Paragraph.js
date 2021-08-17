var _excluded = ["color", "fill"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef } from 'react';
import { StyledParagraph } from './StyledParagraph';
import { ParagraphPropTypes } from './propTypes';
var Paragraph = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var color = _ref.color,
      fill = _ref.fill,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  return /*#__PURE__*/React.createElement(StyledParagraph, _extends({
    ref: ref,
    colorProp: color,
    fillProp: fill
  }, rest));
});
Paragraph.displayName = 'Paragraph';
Paragraph.prototype = ParagraphPropTypes;
export { Paragraph };