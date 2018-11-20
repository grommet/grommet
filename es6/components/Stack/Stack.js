function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React, { Children, Component } from 'react';
import { compose } from 'recompose';
import { withTheme } from '../hocs';
import { StyledStack, StyledStackLayer } from './StyledStack';

var Stack =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Stack, _Component);

  function Stack() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Stack.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        anchor = _this$props.anchor,
        children = _this$props.children,
        fill = _this$props.fill,
        guidingChild = _this$props.guidingChild,
        rest = _objectWithoutPropertiesLoose(_this$props, ["anchor", "children", "fill", "guidingChild"]); // make all children but the first absolutely positioned


    var guidingIndex = guidingChild;

    if (guidingIndex === 'first' || !guidingIndex) {
      guidingIndex = 0;
    } else if (guidingIndex === 'last') {
      guidingIndex = React.Children.count(children) - 1;
    }

    var childIndex = 0;
    var styledChildren = Children.map(children, function (child) {
      if (child) {
        var layer;

        if (childIndex === guidingIndex) {
          layer = React.createElement(StyledStackLayer, {
            guiding: true,
            fillContainer: fill
          }, child);
        } else {
          layer = React.createElement(StyledStackLayer, {
            anchor: anchor
          }, child);
        }

        childIndex += 1;
        return layer;
      }

      return child;
    });
    return React.createElement(StyledStack, _extends({
      fillContainer: fill
    }, rest), styledChildren);
  };

  return Stack;
}(Component);

var StackDoc;

if (process.env.NODE_ENV !== 'production') {
  StackDoc = require('./doc').doc(Stack); // eslint-disable-line global-require
}

var StackWrapper = compose(withTheme)(StackDoc || Stack);
export { StackWrapper as Stack };