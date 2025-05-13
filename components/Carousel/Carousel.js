"use strict";

exports.__esModule = true;
exports.Carousel = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../../utils");
var _MessageContext = require("../../contexts/MessageContext");
var _Box = require("../Box");
var _Button = require("../Button");
var _Keyboard = require("../Keyboard");
var _StyledCarousel = require("./StyledCarousel");
var _CarouselChild = require("./CarouselChild");
var _propTypes = require("./propTypes");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["activeChild", "initialChild", "onChild", "play", "children", "controls", "height", "fill", "width", "onFocus", "onBlur", "wrap"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Carousel = exports.Carousel = function Carousel(_ref) {
  var activeChild = _ref.activeChild,
    _ref$initialChild = _ref.initialChild,
    initialChild = _ref$initialChild === void 0 ? 0 : _ref$initialChild,
    onChild = _ref.onChild,
    play = _ref.play,
    children = _ref.children,
    _ref$controls = _ref.controls,
    controls = _ref$controls === void 0 ? true : _ref$controls,
    height = _ref.height,
    fill = _ref.fill,
    width = _ref.width,
    onFocus = _ref.onFocus,
    onBlur = _ref.onBlur,
    wrap = _ref.wrap,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var timerRef = (0, _react.useRef)();
  var animationDuration = (0, _react.useMemo)(function () {
    return play && play < theme.carousel.animation.duration ? play : theme.carousel.animation.duration;
  }, [play, theme.carousel.animation.duration]);
  var _useState = (0, _react.useState)({
      activeIndex: activeChild !== undefined ? activeChild : initialChild
    }),
    indexes = _useState[0],
    setIndexes = _useState[1];
  var _useState2 = (0, _react.useState)(activeChild),
    activeChildState = _useState2[0],
    setActiveChildState = _useState2[1];
  var _useState3 = (0, _react.useState)(),
    direction = _useState3[0],
    setDirection = _useState3[1];
  var _useState4 = (0, _react.useState)(false),
    inTransition = _useState4[0],
    setInTransition = _useState4[1];
  var activeIndex = indexes.activeIndex,
    priorActiveIndex = indexes.priorActiveIndex;
  var lastIndex = _react.Children.count(children) - 1;
  var onChildChange = (0, _react.useCallback)(function (index) {
    if (onChild) {
      onChild(index);
    }
  }, [onChild]);
  var onRight = (0, _react.useCallback)(function () {
    if (inTransition) return;
    clearInterval(timerRef.current);
    var nextActiveIndex = activeIndex < lastIndex ? activeIndex + 1 : 0;
    setIndexes({
      activeIndex: nextActiveIndex,
      priorActiveIndex: activeIndex
    });
    setInTransition(true);
    setDirection('left');
    onChildChange(nextActiveIndex);
  }, [activeIndex, inTransition, lastIndex, onChildChange]);
  var onLeft = (0, _react.useCallback)(function () {
    if (inTransition) return;
    clearInterval(timerRef.current);
    var nextActiveIndex = activeIndex === 0 ? lastIndex : activeIndex - 1;
    setIndexes({
      activeIndex: nextActiveIndex,
      priorActiveIndex: activeIndex
    });
    setInTransition(true);
    setDirection('right');
    onChildChange(nextActiveIndex);
  }, [activeIndex, inTransition, lastIndex, onChildChange]);
  var onSelect = (0, _react.useCallback)(function (index) {
    return function () {
      if (!inTransition && activeIndex !== index) {
        clearInterval(timerRef.current);
        setIndexes({
          activeIndex: index,
          priorActiveIndex: activeIndex
        });
        setInTransition(true);
        setDirection(index > activeIndex ? 'left' : 'right');
        onChildChange(index);
      }
    };
  }, [activeIndex, inTransition, onChildChange]);
  var onControlledNavigation = (0, _react.useCallback)(function () {
    if (inTransition || activeChild === activeChildState || activeChild === activeIndex || activeChild === undefined || activeChild < 0 || activeChild > lastIndex) return;
    setDirection(activeChild > activeIndex ? 'left' : 'right');
    setInTransition(true);
    setIndexes({
      activeIndex: activeChild,
      priorActiveIndex: activeIndex
    });
    setActiveChildState(activeChild);
    onChildChange(activeChild);
  }, [activeChild, activeChildState, activeIndex, inTransition, lastIndex, onChildChange]);

  /**
   * Delays the transitions between Carousel slides. This is needed to
   * avoid users "spamming" the controls which results in jarring animations
   * and a bad user experience.
   */
  (0, _react.useEffect)(function () {
    var transitionTimer;
    if (inTransition) {
      transitionTimer = setTimeout(function () {
        setInTransition(false);
      }, animationDuration);
    }
    return function () {
      return clearTimeout(transitionTimer);
    };
  }, [inTransition, setInTransition, animationDuration]);

  // Handles auto-playing Carousel slides
  (0, _react.useEffect)(function () {
    // stop playing if wrap is explicitly false and we're at the end
    if (play && (wrap !== false || activeIndex < lastIndex)) {
      var timer = setInterval(function () {
        var nextActiveIndex = activeIndex < lastIndex ? activeIndex + 1 : 0;
        setIndexes({
          activeIndex: nextActiveIndex,
          priorActiveIndex: activeIndex
        });
        setInTransition(true);
        setDirection('left');
        onChildChange(nextActiveIndex);
      }, play);
      timerRef.current = timer;
      return function () {
        clearTimeout(timer);
      };
    }
    return function () {};
  }, [activeIndex, play, children, lastIndex, onChildChange, wrap]);

  // Allow Carousel slides to be controlled outside the component
  (0, _react.useEffect)(function () {
    onControlledNavigation(activeIndex, activeChild, activeChildState, inTransition);
  }, [onControlledNavigation, activeIndex, activeChild, activeChildState, inTransition]);
  var showArrows = controls && controls !== 'selectors';
  var showSelectors = controls && controls !== 'arrows';
  var CurrentIcon = theme.carousel.icons.current;
  var iconColor = (0, _utils.normalizeColor)(theme.carousel.icons.color || 'control', theme);
  var selectors = [];
  var wrappedChildren = _react.Children.map(children, function (child, index) {
    selectors.push(/*#__PURE__*/_react["default"].createElement(_Button.Button, {
      a11yTitle: format({
        id: 'carousel.jump',
        values: {
          slide: index + 1
        }
      })
      // eslint-disable-next-line react/no-array-index-key
      ,
      key: index,
      icon: /*#__PURE__*/_react["default"].createElement(CurrentIcon, {
        color: activeIndex === index ? iconColor : undefined
      }),
      onClick: onSelect(index)
    }));
    return /*#__PURE__*/_react["default"].createElement(_CarouselChild.CarouselChild, {
      animationDuration: animationDuration,
      fill: fill || !!height || !!width,
      index: index,
      activeIndex: activeIndex,
      priorActiveIndex: priorActiveIndex,
      direction: direction
    }, child);
  });
  var NextIcon = theme.carousel.icons.next;
  var PreviousIcon = theme.carousel.icons.previous;
  var nextIconDisabled = !wrap && activeIndex >= lastIndex;
  var previousIconDisabled = !wrap && activeIndex <= 0;
  return /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onLeft: onLeft,
    onRight: onRight
  }, /*#__PURE__*/_react["default"].createElement(_StyledCarousel.StyledCarouselContainer, _extends({
    fill: fill,
    height: height,
    width: width
  }, rest), showArrows && /*#__PURE__*/_react["default"].createElement(_StyledCarousel.StyledControl, {
    offsetProp: "left",
    fill: "vertical"
  }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    fill: "vertical",
    icon: /*#__PURE__*/_react["default"].createElement(PreviousIcon, {
      color: (0, _utils.normalizeColor)(previousIconDisabled ? theme.carousel.disabled.icons.color : theme.carousel.icons.color, theme)
    }),
    a11yTitle: format({
      id: 'carousel.previous',
      values: {
        slide: activeIndex
      }
    }),
    plain: true,
    disabled: previousIconDisabled,
    onClick: onLeft,
    hoverIndicator: true
  })), wrappedChildren, showSelectors && /*#__PURE__*/_react["default"].createElement(_StyledCarousel.StyledControl, {
    offsetProp: "bottom",
    fill: "horizontal"
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    justify: "end",
    fill: !showArrows && 'horizontal'
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    direction: "row",
    justify: "center"
  }, selectors))), showArrows && /*#__PURE__*/_react["default"].createElement(_StyledCarousel.StyledControl, {
    offsetProp: "right",
    fill: "vertical"
  }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    fill: "vertical",
    icon: /*#__PURE__*/_react["default"].createElement(NextIcon, {
      color: (0, _utils.normalizeColor)(nextIconDisabled ? theme.carousel.disabled.icons.color : theme.carousel.icons.color, theme)
    }),
    a11yTitle: format({
      id: 'carousel.next',
      values: {
        slide: activeIndex + 2
      }
    }),
    plain: true,
    disabled: nextIconDisabled,
    onClick: onRight,
    hoverIndicator: true
  }))));
};
Carousel.displayName = 'Carousel';
Carousel.propTypes = _propTypes.CarouselPropTypes;