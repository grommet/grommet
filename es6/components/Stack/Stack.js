function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Children } from 'react';
import { StyledStack, StyledStackLayer } from './StyledStack';

var buildStyledChildren = function buildStyledChildren(_ref) {
  var anchor = _ref.anchor,
      fill = _ref.fill,
      guidingIndex = _ref.guidingIndex,
      interactiveChild = _ref.interactiveChild,
      interactiveIndex = _ref.interactiveIndex;
  var childIndex = 0;
  return function (child) {
    if (child) {
      var interactive = interactiveChild === undefined || interactiveIndex === childIndex;
      var isGuidingIndex = childIndex === guidingIndex;
      childIndex += 1;
      var props = isGuidingIndex ? {
        guiding: true,
        fillContainer: fill
      } : {
        anchor: anchor
      };
      return React.createElement(StyledStackLayer, _extends({
        interactive: interactive
      }, props), child);
    }

    return child;
  };
};

var Stack = function Stack(_ref2) {
  var anchor = _ref2.anchor,
      children = _ref2.children,
      fill = _ref2.fill,
      guidingChild = _ref2.guidingChild,
      interactiveChild = _ref2.interactiveChild,
      rest = _objectWithoutPropertiesLoose(_ref2, ["anchor", "children", "fill", "guidingChild", "interactiveChild"]);

  var toChildIndex = function toChildIndex(child) {
    var index = child;
    if (index === 'first' || !index) index = 0;else if (index === 'last') index = React.Children.count(children) - 1;
    return index;
  };

  var guidingIndex = toChildIndex(guidingChild);
  var interactiveIndex = interactiveChild && toChildIndex(interactiveChild);
  var styledChildren = Children.map(children, buildStyledChildren({
    anchor: anchor,
    fill: fill,
    guidingIndex: guidingIndex,
    interactiveChild: interactiveChild,
    interactiveIndex: interactiveIndex
  }));
  return React.createElement(StyledStack, _extends({
    fillContainer: fill
  }, rest), styledChildren);
};

var StackDoc;

if (process.env.NODE_ENV !== 'production') {
  StackDoc = require('./doc').doc(Stack); // eslint-disable-line global-require
}

var StackWrapper = StackDoc || Stack;
export { StackWrapper as Stack };