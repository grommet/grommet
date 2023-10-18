"use strict";

exports.__esModule = true;
exports.Carousel = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../../utils");
var _defaultProps = require("../../default-props");
var _contexts = require("../../contexts");
var _MessageContext = require("../../contexts/MessageContext");
var _Box = require("../Box");
var _Button = require("../Button");
var _Keyboard = require("../Keyboard");
var _StyledCarousel = require("./StyledCarousel");
var _CarouselChild = require("./CarouselChild");
var _propTypes = require("./propTypes");
var _excluded = ["activeChild", "initialChild", "onChild", "play", "children", "controls", "height", "fill", "width", "onFocus", "onBlur", "wrap"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Carousel = exports.Carousel = function Carousel(_ref) {
  var activeChild = _ref.activeChild,
    initialChild = _ref.initialChild,
    onChild = _ref.onChild,
    play = _ref.play,
    children = _ref.children,
    controls = _ref.controls,
    height = _ref.height,
    fill = _ref.fill,
    width = _ref.width,
    onFocus = _ref.onFocus,
    onBlur = _ref.onBlur,
    wrap = _ref.wrap,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var theme = (0, _react.useContext)(_contexts.ThemeContext) || _defaultProps.defaultProps.theme;
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
    selectors.push( /*#__PURE__*/_react["default"].createElement(_Button.Button, {
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
Carousel.defaultProps = {
  initialChild: 0,
  controls: true
};
Object.setPrototypeOf(Carousel.defaultProps, _defaultProps.defaultProps);
Carousel.displayName = 'Carousel';
Carousel.propTypes = _propTypes.CarouselPropTypes;