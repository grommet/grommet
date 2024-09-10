import React, { forwardRef } from 'react';
import { Skeleton } from '../Skeleton';
import { Box } from '../Box';
import { useThemeValue } from '../../utils/useThemeValue';
var ParagraphSkeleton = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var fill = _ref.fill,
    sizeProp = _ref.size;
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var size = sizeProp || 'medium';
  var data = theme.paragraph[size];
  var height = data ? data.size : size;
  return /*#__PURE__*/React.createElement(Box, {
    ref: ref,
    gap: "xsmall",
    width: {
      max: fill ? 'none' : data && data.maxWidth
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    height: height
  }), /*#__PURE__*/React.createElement(Skeleton, {
    height: height
  }), /*#__PURE__*/React.createElement(Skeleton, {
    height: height,
    width: "30%"
  }));
});
ParagraphSkeleton.displayName = 'ParagraphSkeleton';
export { ParagraphSkeleton };