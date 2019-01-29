function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFocus, withForwardRef } from '../hocs';
import { StyledRangeInput } from './StyledRangeInput';

var RangeInput =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(RangeInput, _Component);

  function RangeInput() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = RangeInput.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        forwardRef = _this$props.forwardRef,
        rest = _objectWithoutPropertiesLoose(_this$props, ["forwardRef"]);

    return React.createElement(StyledRangeInput, _extends({}, rest, {
      ref: forwardRef,
      type: "range"
    }));
  };

  return RangeInput;
}(Component);

var RangeInputDoc;

if (process.env.NODE_ENV !== 'production') {
  RangeInputDoc = require('./doc').doc(RangeInput); // eslint-disable-line global-require
}

var RangeInputWrapper = compose(withFocus(), withForwardRef)(RangeInputDoc || RangeInput);
export { RangeInputWrapper as RangeInput };