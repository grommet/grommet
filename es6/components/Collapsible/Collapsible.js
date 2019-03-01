function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { createRef, Component } from 'react';
import { compose } from 'recompose';
import styled, { withTheme } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';

var animatedBoxProperty = function animatedBoxProperty(direction) {
  return direction === 'horizontal' ? 'width' : 'height';
};

var AnimatedBox = styled(Box).withConfig({
  displayName: "Collapsible__AnimatedBox",
  componentId: "sc-15kniua-0"
})(["", ";"], function (props) {
  return !props.animate && (props.open ? "\n    max-" + animatedBoxProperty(props.collapsibleDirection) + ": unset;\n    visibility: visible;\n  " : "\n    max-" + animatedBoxProperty(props.collapsibleDirection) + ": 0;\n    visibility: hidden;\n    overflow: hidden;\n  ");
});

var Collapsible =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Collapsible, _Component);

  Collapsible.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var open = nextProps.open;

    if (open !== prevState.open) {
      return {
        animate: true,
        open: open
      };
    }

    return null;
  };

  function Collapsible(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;
    /* eslint-disable-next-line react/prop-types */

    _defineProperty(_assertThisInitialized(_this), "ref", createRef());

    _defineProperty(_assertThisInitialized(_this), "getSnapshotBeforeUpdate", function () {
      return _this.ref.current && _this.ref.current.getBoundingClientRect();
    });

    _this.state = {
      open: props.open,
      animate: false
    };
    return _this;
  }

  var _proto = Collapsible.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState, snapshot) {
    var _this2 = this;

    var _this$props = this.props,
        direction = _this$props.direction,
        _this$props$theme$col = _this$props.theme.collapsible,
        minSpeed = _this$props$theme$col.minSpeed,
        baseline = _this$props$theme$col.baseline;
    var _this$state = this.state,
        animate = _this$state.animate,
        open = _this$state.open;
    var container = this.ref.current;

    if (container) {
      var dimension = animatedBoxProperty(direction);
      var boudingClientRect = container.getBoundingClientRect();
      var dimensionSize = boudingClientRect[dimension];
      var shouldAnimate = animate && prevState.open !== open;

      if (open && snapshot[dimension] && dimensionSize !== snapshot[dimension]) {
        shouldAnimate = true;
      }

      if (shouldAnimate) {
        if (this.animationTimeout) {
          clearTimeout(this.animationTimeout);
        }

        var speed = Math.max(dimensionSize / baseline * minSpeed, minSpeed);
        container.style["max-" + dimension] = snapshot[dimension] + "px";
        container.style.overflow = 'hidden';
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            container.style.transition = "max-" + dimension + " " + speed + "ms, visibility 50ms";
            container.style["max-" + dimension] = open ? dimensionSize + "px" : '0px';
            _this2.animationTimeout = setTimeout(function () {
              container.removeAttribute('style');

              _this2.setState({
                animate: false
              });
            }, speed);
          });
        });
      }
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  };

  _proto.render = function render() {
    /* eslint-disable-next-line react/prop-types */
    var _this$props2 = this.props,
        children = _this$props2.children,
        direction = _this$props2.direction;
    var _this$state2 = this.state,
        animate = _this$state2.animate,
        open = _this$state2.open;
    return React.createElement(AnimatedBox, {
      "aria-hidden": !open,
      ref: this.ref,
      open: open,
      animate: animate,
      collapsibleDirection: direction
    }, children);
  };

  return Collapsible;
}(Component);

Collapsible.defaultProps = {};
Object.setPrototypeOf(Collapsible.defaultProps, defaultProps);
var CollapsibleDoc;

if (process.env.NODE_ENV !== 'production') {
  CollapsibleDoc = require('./doc').doc(Collapsible); // eslint-disable-line global-require
}

var CollapsibleWrapper = compose(withTheme)(CollapsibleDoc || Collapsible);
export { CollapsibleWrapper as Collapsible };