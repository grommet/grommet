function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { compose } from 'recompose';
import { withFocus, withForwardRef } from '../hocs';
import { StyledRangeInput } from './StyledRangeInput';

var RangeInput = function RangeInput(_ref) {
  var forwardRef = _ref.forwardRef,
      rest = _objectWithoutPropertiesLoose(_ref, ["forwardRef"]);

  return React.createElement(StyledRangeInput, _extends({}, rest, {
    ref: forwardRef,
    type: "range"
  }));
};

var RangeInputDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  RangeInputDoc = require('./doc').doc(RangeInput);
}

var RangeInputWrapper = compose(withFocus(), withForwardRef)(RangeInputDoc || RangeInput);
export { RangeInputWrapper as RangeInput };