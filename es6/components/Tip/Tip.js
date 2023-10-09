function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { Children, cloneElement, forwardRef, useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { Drop } from '../Drop';
import { useForwardedRef, useKeyboard } from '../../utils';
import { TipPropTypes } from './propTypes';
var Tip = /*#__PURE__*/forwardRef(function (_ref, tipRef) {
  var children = _ref.children,
    content = _ref.content,
    dropProps = _ref.dropProps,
    plain = _ref.plain;
  var theme = useContext(ThemeContext);
  var _useState = useState(false),
    over = _useState[0],
    setOver = _useState[1];
  var _useState2 = useState(false),
    tooltipOver = _useState2[0],
    setTooltipOver = _useState2[1];
  var usingKeyboard = useKeyboard();
  var componentRef = useForwardedRef(tipRef);

  // Three use case for children
  // 1. Tip has a single child + it is a React Element => Great!
  // 2. Tip has a single child +  not React Element =>
  // span will wrap the child so we can use ref and events.
  // 3. Tip has more than one child => Abort, display Children.only error
  var child = Children.count(children) <= 1 && ! /*#__PURE__*/React.isValidElement(children) && /*#__PURE__*/React.createElement("span", null, children) || Children.only(children);
  var clonedChild = /*#__PURE__*/cloneElement(child, {
    onMouseEnter: function onMouseEnter(event) {
      var _child$props;
      setOver(true);
      if ((_child$props = child.props) != null && _child$props.onMouseEnter) child.props.onMouseEnter(event);
    },
    onMouseLeave: function onMouseLeave(event) {
      var _child$props2;
      setOver(false);
      if ((_child$props2 = child.props) != null && _child$props2.onMouseLeave) child.props.onMouseLeave(event);
    },
    onFocus: function onFocus(event) {
      var _child$props3;
      if (usingKeyboard) setOver(true);
      if ((_child$props3 = child.props) != null && _child$props3.onFocus) child.props.onFocus(event);
    },
    onBlur: function onBlur(event) {
      var _child$props4;
      if (usingKeyboard) setOver(false);
      if ((_child$props4 = child.props) != null && _child$props4.onBlur) child.props.onBlur(event);
    },
    key: 'tip-child',
    ref: function ref(node) {
      // https://github.com/facebook/react/issues/8873#issuecomment-287873307
      if (typeof componentRef === 'function') {
        componentRef(node);
      } else if (componentRef) {
        // eslint-disable-next-line no-param-reassign
        componentRef.current = node;
      }
      // Call the original ref, if any
      var callerRef = child.ref;
      if (typeof callerRef === 'function') {
        callerRef(node);
      } else if (callerRef) {
        callerRef.current = node;
      }
    }
  });
  return [clonedChild, (over || tooltipOver) && /*#__PURE__*/React.createElement(Drop, _extends({
    target: componentRef.current,
    trapFocus: false,
    key: "tip-drop"
  }, theme.tip.drop, dropProps, {
    onMouseEnter: function onMouseEnter() {
      return setTooltipOver(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setTooltipOver(false);
    }
  }), plain ? content : /*#__PURE__*/React.createElement(Box, theme.tip.content, content))];
});
Tip.displayName = 'Tip';
Tip.propTypes = TipPropTypes;
export { Tip };