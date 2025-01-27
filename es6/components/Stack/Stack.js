var _excluded = ["anchor", "children", "fill", "guidingChild", "interactiveChild"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { Children, forwardRef } from 'react';
import { StyledStack, StyledStackLayer } from './StyledStack';
import { StackPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
var buildStyledChildren = function buildStyledChildren(_ref) {
  var anchor = _ref.anchor,
    fill = _ref.fill,
    guidingIndex = _ref.guidingIndex,
    interactiveChild = _ref.interactiveChild,
    interactiveIndex = _ref.interactiveIndex;
  return function (child, index) {
    var interactive = interactiveChild === undefined || interactiveIndex === index;
    var isGuidingIndex = index === guidingIndex;
    var props = isGuidingIndex ? {
      guiding: true,
      fillContainer: fill
    } : {
      anchor: anchor
    };
    return /*#__PURE__*/React.createElement(StyledStackLayer, _extends({
      key: index,
      interactive: interactive
    }, props), child);
  };
};
var Stack = /*#__PURE__*/forwardRef(function (_ref2, ref) {
  var anchor = _ref2.anchor,
    children = _ref2.children,
    fill = _ref2.fill,
    guidingChild = _ref2.guidingChild,
    interactiveChild = _ref2.interactiveChild,
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded);
  var _useThemeValue = useThemeValue(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  var prunedChildren = Children.toArray(children).filter(function (c) {
    return c;
  });
  var toChildIndex = function toChildIndex(child) {
    var index = child;
    if (index === 'first' || !index) index = 0;else if (index === 'last') index = prunedChildren.length - 1;
    return index;
  };
  var guidingIndex = toChildIndex(guidingChild);
  var interactiveIndex = interactiveChild && toChildIndex(interactiveChild);
  var styledChildren = prunedChildren.map(buildStyledChildren({
    anchor: anchor,
    fill: fill,
    guidingIndex: guidingIndex,
    interactiveChild: interactiveChild,
    interactiveIndex: interactiveIndex
  }));
  return /*#__PURE__*/React.createElement(StyledStack, _extends({
    ref: ref,
    fillContainer: fill
  }, passThemeFlag, rest), styledChildren);
});
Stack.displayName = 'Stack';
Stack.propTypes = StackPropTypes;
export { Stack };