function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Children, cloneElement, forwardRef, useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { Drop } from '../Drop';
import { useForwardedRef } from '../../utils/refs';
var Tip = /*#__PURE__*/forwardRef(function (_ref, tipRef) {
  var children = _ref.children,
      content = _ref.content,
      dropProps = _ref.dropProps,
      plain = _ref.plain;
  var theme = useContext(ThemeContext);

  var _useState = useState(false),
      over = _useState[0],
      setOver = _useState[1];

  var componentRef = useForwardedRef(tipRef); // In cases the child is a primitive

  var wrapInvalidElement = function wrapInvalidElement() {
    return (// Handle the use case of a primitive string child
      // so we'll be able to assign ref and events on the child.
      ! /*#__PURE__*/React.isValidElement(children) ? /*#__PURE__*/React.createElement("span", null, children) : children
    );
  };
  /* Three use case for children
    1. Tip has a single child + it is a React Element => Great!
    2. Tip has a single child +  not React Element => span will wrap the child.
    3. Tip has more than one child => Abort, display Children.only error 
  */


  var child = Children.count(children) === 1 ? wrapInvalidElement() : Children.only(children);
  var clonedChild = /*#__PURE__*/cloneElement(child, {
    onMouseOver: function onMouseOver() {
      return setOver(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setOver(false);
    },
    onFocus: function onFocus() {
      return setOver(true);
    },
    onBlur: function onBlur() {
      return setOver(false);
    },
    key: 'tip-child',
    ref: function ref(node) {
      // https://github.com/facebook/react/issues/8873#issuecomment-287873307
      if (typeof componentRef === 'function') {
        componentRef(node);
      } else if (componentRef) {
        // eslint-disable-next-line no-param-reassign
        componentRef.current = node;
      } // Call the original ref, if any


      var callerRef = child.ref;

      if (typeof callerRef === 'function') {
        callerRef(node);
      } else if (callerRef) {
        callerRef.current = node;
      }
    }
  });
  return [clonedChild, over && /*#__PURE__*/React.createElement(Drop, _extends({
    target: componentRef.current,
    trapFocus: false,
    key: "tip-drop",
    plain: true
  }, theme.tip.drop, dropProps), plain ? content : /*#__PURE__*/React.createElement(Box, theme.tip.content, content))];
});
Tip.displayName = 'Tip';
var TipDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TipDoc = require('./doc').doc(Tip);
}

var TipWrapper = TipDoc || Tip;
export { TipWrapper as Tip };