import React, { forwardRef, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { useForwardedRef } from '../../utils';
import { Box } from '../Box';
var AnimatedBox = styled(Box).withConfig({
  displayName: "Collapsible__AnimatedBox",
  componentId: "sc-15kniua-0"
})(["", ""], function (props) {
  return (// eslint-disable-next-line max-len
    "transition: " + ("max-" + props.dimension + " " + props.speedProp + "ms, opacity " + props.speedProp + "ms") + ";\n      opacity: " + (props.open ? 1 : 0) + ";\n      overflow: " + (props.animate || !props.open ? 'hidden' : 'visible') + ";\n      max-" + props.dimension + ": " + (props.open ? 'unset' : 0) + ";\n    "
  );
});
var Collapsible = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var children = _ref.children,
      direction = _ref.direction,
      openArg = _ref.open;
  var theme = useContext(ThemeContext) || defaultProps.theme;

  var _useState = useState(openArg),
      open = _useState[0],
      setOpen = _useState[1];

  var _useState2 = useState(false),
      animate = _useState2[0],
      setAnimate = _useState2[1];

  var _useState3 = useState(),
      size = _useState3[0],
      setSize = _useState3[1];

  var _useState4 = useState(theme.collapsible.minSpeed),
      speed = _useState4[0],
      setSpeed = _useState4[1];

  var dimension = useMemo(function () {
    return direction === 'horizontal' ? 'width' : 'height';
  }, [direction]);
  var containerRef = useForwardedRef(ref); // when the caller changes openArg, trigger animation

  useEffect(function () {
    if (openArg !== open) {
      setAnimate(true);
      setOpen(openArg);
    }
  }, [open, openArg]); // When we animate, start a timer to clear out the animation when it
  // has finished.

  useEffect(function () {
    if (animate) {
      var timer = setTimeout(function () {
        setAnimate(false);
        setSize(undefined);
        var container = containerRef.current;
        container.removeAttribute('style');
      }, speed);
      return function () {
        return clearTimeout(timer);
      };
    }

    return undefined;
  }, [animate, containerRef, speed]);
  useEffect(function () {
    if (animate) {
      var _theme$collapsible = theme.collapsible,
          minSpeed = _theme$collapsible.minSpeed,
          baseline = _theme$collapsible.baseline;
      var container = containerRef.current; // get the desired size by unsetting the max temporarily

      container.style["max-" + dimension] = 'unset';
      var rect = container.getBoundingClientRect();
      container.removeAttribute('style');
      var nextSize = rect[dimension]; // start with the max set to the size we are starting from

      container.style["max-" + dimension] = open ? 0 : nextSize + "px";
      setSize(nextSize);
      var nextSpeed = Math.max(nextSize / baseline * minSpeed, minSpeed);
      setSpeed(nextSpeed);
    }
  }, [animate, containerRef, dimension, open, theme]);
  useLayoutEffect(function () {
    if (animate && size) {
      var container = containerRef.current;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          // Change the max to where we want to end up, the transition will
          // animate to get there. We do this in an animation frame to
          // give our starter setting a chance to fully render.
          container.style["max-" + dimension] = open ? size + "px" : 0;
        });
      });
    }
  }, [animate, containerRef, dimension, open, size]);
  return /*#__PURE__*/React.createElement(AnimatedBox, {
    "aria-hidden": !open,
    ref: containerRef,
    open: open,
    animate: animate,
    dimension: dimension,
    speedProp: speed
  }, children);
});
Collapsible.displayName = 'Collapsible';
var CollapsibleDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  CollapsibleDoc = require('./doc').doc(Collapsible);
}

var CollapsibleWrapper = CollapsibleDoc || Collapsible;
export { CollapsibleWrapper as Collapsible };