"use strict";

exports.__esModule = true;
exports.Collapsible = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var animatedBoxProperty = function animatedBoxProperty(direction) {
  return direction === 'horizontal' ? 'width' : 'height';
};

var AnimatedBox = (0, _styledComponents.default)(_Box.Box).withConfig({
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

    _defineProperty(_assertThisInitialized(_this), "ref", (0, _react.createRef)());

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
    return _react.default.createElement(AnimatedBox, {
      "aria-hidden": !open,
      ref: this.ref,
      open: open,
      animate: animate,
      collapsibleDirection: direction
    }, children);
  };

  return Collapsible;
}(_react.Component);

Collapsible.defaultProps = {};
Object.setPrototypeOf(Collapsible.defaultProps, _defaultProps.defaultProps);
var CollapsibleDoc;

if (process.env.NODE_ENV !== 'production') {
  CollapsibleDoc = require('./doc').doc(Collapsible); // eslint-disable-line global-require
}

var CollapsibleWrapper = (0, _recompose.compose)(_styledComponents.withTheme)(CollapsibleDoc || Collapsible);
exports.Collapsible = CollapsibleWrapper;