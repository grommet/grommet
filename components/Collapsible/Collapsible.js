"use strict";

exports.__esModule = true;
exports.Collapsible = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _defaultProps = require("../../default-props");

var _utils = require("../../utils");

var _Box = require("../Box");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var AnimatedBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "Collapsible__AnimatedBox",
  componentId: "sc-15kniua-0"
})(["", ""], function (props) {
  return (// eslint-disable-next-line max-len
    "transition: " + ("max-" + props.dimension + " " + props.speedProp + "ms, opacity " + props.speedProp + "ms") + ";\n      opacity: " + (props.open ? 1 : 0) + ";\n      overflow: " + (props.animate || !props.open ? 'hidden' : 'visible') + ";\n      max-" + props.dimension + ": " + (props.open ? 'unset' : 0) + ";\n    "
  );
});
var Collapsible = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
      direction = _ref.direction,
      openArg = _ref.open;

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var _useState = (0, _react.useState)(openArg),
      open = _useState[0],
      setOpen = _useState[1];

  var _useState2 = (0, _react.useState)(false),
      animate = _useState2[0],
      setAnimate = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      size = _useState3[0],
      setSize = _useState3[1];

  var _useState4 = (0, _react.useState)(theme.collapsible.minSpeed),
      speed = _useState4[0],
      setSpeed = _useState4[1];

  var dimension = (0, _react.useMemo)(function () {
    return direction === 'horizontal' ? 'width' : 'height';
  }, [direction]);
  var containerRef = (0, _utils.useForwardedRef)(ref); // when the caller changes openArg, trigger animation

  (0, _react.useEffect)(function () {
    if (openArg !== open) {
      setAnimate(true);
      setOpen(openArg);
    }
  }, [open, openArg]); // When we animate, start a timer to clear out the animation when it
  // has finished.

  (0, _react.useEffect)(function () {
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
  (0, _react.useEffect)(function () {
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
  (0, _react.useLayoutEffect)(function () {
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
  return /*#__PURE__*/_react["default"].createElement(AnimatedBox, {
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
exports.Collapsible = CollapsibleWrapper;