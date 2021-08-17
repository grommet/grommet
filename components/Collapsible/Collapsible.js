"use strict";

exports.__esModule = true;
exports.Collapsible = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _useIsomorphicLayoutEffect = require("../../utils/use-isomorphic-layout-effect");

var _defaultProps = require("../../default-props");

var _utils = require("../../utils");

var _Box = require("../Box");

var _propTypes = require("./propTypes");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var AnimatedBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "Collapsible__AnimatedBox",
  componentId: "sc-15kniua-0"
})(["", ""], function (props) {
  return props.shouldOpen ? "visibility: hidden;\n      position: absolute;\n      pointer-events: none;" : // eslint-disable-next-line max-len
  "transition: " + ("max-" + props.dimension + " " + props.speedProp + "ms, opacity " + props.speedProp + "ms") + ";\n      opacity: " + (props.open ? 1 : 0) + ";\n      overflow: " + (props.animate || !props.open ? 'hidden' : 'visible') + ";";
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

  var _useState3 = (0, _react.useState)(theme.collapsible.minSpeed),
      speed = _useState3[0],
      setSpeed = _useState3[1];

  var dimension = (0, _react.useMemo)(function () {
    return direction === 'horizontal' ? 'width' : 'height';
  }, [direction]);
  var containerRef = (0, _utils.useForwardedRef)(ref);
  var sizeRef = (0, _react.useRef)();
  var shouldOpen = !open && openArg;
  var shouldClose = open && !openArg; // when the caller changes openArg, trigger animation

  (0, _react.useEffect)(function () {
    if (openArg !== open) {
      setAnimate(true);
      setOpen(openArg);
    }
  }, [open, openArg]); // prepare to open or close

  (0, _useIsomorphicLayoutEffect.useLayoutEffect)(function () {
    var container = containerRef.current; // skip this if animation is in progress

    if (!animate && shouldOpen) {
      var parentPrevPosition = container.parentNode.style.position;
      container.parentNode.style.position = 'relative';

      var _container$getBoundin = container.getBoundingClientRect(),
          size = _container$getBoundin[dimension];

      container.parentNode.style.position = parentPrevPosition;
      sizeRef.current = size;
    }

    if (shouldOpen) {
      container.style["max-" + dimension] = 0;
    } else if (shouldClose) {
      var _container$getBoundin2 = container.getBoundingClientRect(),
          _size = _container$getBoundin2[dimension];

      container.style["max-" + dimension] = _size + "px";
    }
  }, [shouldOpen, shouldClose, containerRef, dimension, animate]);
  (0, _react.useEffect)(function () {
    if (shouldOpen || shouldClose) {
      var container = containerRef.current;
      var _theme$collapsible = theme.collapsible,
          minSpeed = _theme$collapsible.minSpeed,
          baseline = _theme$collapsible.baseline;
      var nextSpeed = Math.max(sizeRef.current / baseline * minSpeed, minSpeed);
      setSpeed(nextSpeed);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          // Change the max to where we want to end up, the transition will
          // animate to get there. We do this in an animation frame to
          // give our starter setting a chance to fully render.
          container.style["max-" + dimension] = shouldOpen ? sizeRef.current + "px" : 0;
        });
      });
    }
  }, [shouldOpen, shouldClose, containerRef, dimension, theme]);
  (0, _react.useEffect)(function () {
    if (animate) {
      var container = containerRef.current;
      var timer = setTimeout(function () {
        setAnimate(false);
        container.removeAttribute('style');
      }, speed);
      return function () {
        return clearTimeout(timer);
      };
    }

    return undefined; // we need open here to cancel the timer and restart it
  }, [animate, containerRef, speed, open]);
  return /*#__PURE__*/_react["default"].createElement(AnimatedBox, {
    "aria-hidden": !open,
    ref: containerRef,
    open: open,
    animate: animate,
    dimension: dimension,
    speedProp: speed // an intermediate state that will render invisible element
    // we need to do this because we can't use scrollHeight/scrollWidth
    // to get size while overflow is hidden.
    // skipped if animation is in progress
    ,
    shouldOpen: !animate && shouldOpen
  }, shouldOpen || open || animate ? children : null);
});
exports.Collapsible = Collapsible;
Collapsible.displayName = 'Collapsible';
Collapsible.propTypes = _propTypes.CollapsiblePropTypes;