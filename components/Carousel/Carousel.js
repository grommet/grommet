"use strict";

exports.__esModule = true;
exports.Carousel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

var _contexts = require("../../contexts");

var _Box = require("../Box");

var _Button = require("../Button");

var _Keyboard = require("../Keyboard");

var _Stack = require("../Stack");

var _propTypes = require("./propTypes");

var _excluded = ["activeChild", "initialChild", "onChild", "play", "children", "controls", "fill", "onFocus", "onBlur"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Carousel = function Carousel(_ref) {
  var activeChild = _ref.activeChild,
      initialChild = _ref.initialChild,
      onChild = _ref.onChild,
      play = _ref.play,
      children = _ref.children,
      controls = _ref.controls,
      fill = _ref.fill,
      _onFocus = _ref.onFocus,
      _onBlur = _ref.onBlur,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var theme = (0, _react.useContext)(_contexts.ThemeContext) || _defaultProps.defaultProps.theme;

  var _useState = (0, _react.useState)(),
      focus = _useState[0],
      setFocus = _useState[1];

  var timerRef = (0, _react.useRef)();

  var _useState2 = (0, _react.useState)({
    activeIndex: activeChild !== undefined ? activeChild : initialChild
  }),
      indexes = _useState2[0],
      setIndexes = _useState2[1];

  var activeIndex = indexes.activeIndex,
      priorActiveIndex = indexes.priorActiveIndex;
  var lastIndex = _react.Children.count(children) - 1;

  if (activeIndex !== activeChild && activeChild !== undefined) {
    if (activeChild >= 0 && activeChild <= lastIndex) {
      setIndexes({
        activeIndex: activeChild,
        priorActiveIndex: activeIndex
      });
    }
  }

  var onChildChange = (0, _react.useCallback)(function (index) {
    if (onChild) {
      onChild(index);
    }
  }, [onChild]);
  (0, _react.useEffect)(function () {
    if (play) {
      var timer = setInterval(function () {
        if (activeIndex < lastIndex) {
          setIndexes({
            activeIndex: activeIndex + 1,
            priorActiveIndex: activeIndex
          });
          onChildChange(activeIndex + 1);
        } else {
          setIndexes({
            activeIndex: 0,
            priorActiveIndex: activeIndex
          });
          onChildChange(0);
        }
      }, play);
      timerRef.current = timer;
      return function () {
        clearTimeout(timer);
      };
    }

    return function () {};
  }, [activeIndex, play, children, lastIndex, onChildChange]);

  var onRight = function onRight() {
    if (activeIndex >= lastIndex) {
      return;
    }

    clearInterval(timerRef.current);
    setIndexes({
      activeIndex: activeIndex + 1,
      priorActiveIndex: activeIndex
    });
    onChildChange(activeIndex + 1);
  };

  var onLeft = function onLeft() {
    if (activeIndex <= 0) {
      return;
    }

    clearInterval(timerRef.current);
    setIndexes({
      activeIndex: activeIndex - 1,
      priorActiveIndex: activeIndex
    });
    onChildChange(activeIndex - 1);
  };

  var onSelect = function onSelect(index) {
    return function () {
      if (activeIndex !== index) {
        clearInterval(timerRef.current);
        setIndexes({
          activeIndex: index,
          priorActiveIndex: activeIndex
        });
        onChildChange(index);
      }
    };
  };

  var showArrows = controls && controls !== 'selectors';
  var showSelectors = controls && controls !== 'arrows';
  var CurrentIcon = theme.carousel.icons.current;
  var iconColor = (0, _utils.normalizeColor)(theme.carousel.icons.color || 'control', theme);
  var selectors = [];

  var wrappedChildren = _react.Children.map(children, function (child, index) {
    selectors.push( /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      a11yTitle: "Show carousel slide " + (index + 1) // eslint-disable-next-line react/no-array-index-key
      ,
      key: index,
      icon: /*#__PURE__*/_react["default"].createElement(CurrentIcon, {
        color: activeIndex === index ? iconColor : undefined
      }),
      onClick: onSelect(index)
    }));
    var animation;
    var visibility = 'visible';

    if (index === activeIndex) {
      if (priorActiveIndex !== undefined) {
        animation = {
          type: priorActiveIndex < activeIndex ? 'slideLeft' : 'slideRight',
          size: 'xlarge',
          duration: theme.carousel.animation.duration
        };
      }
    } else if (index === priorActiveIndex) {
      animation = {
        type: 'fadeOut',
        duration: theme.carousel.animation.duration
      };
    } else {
      animation = {
        type: 'fadeOut',
        duration: 0
      };
      visibility = 'hidden';
    }

    return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      fill: fill,
      style: {
        visibility: visibility
      },
      overflow: "hidden"
    }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      fill: fill,
      animation: animation
    }, child));
  });

  var NextIcon = theme.carousel.icons.next;
  var PreviousIcon = theme.carousel.icons.previous;
  var nextIconDisabled = activeIndex >= lastIndex;
  var previousIconDisabled = activeIndex <= 0;
  return /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onLeft: onLeft,
    onRight: onRight
  }, /*#__PURE__*/_react["default"].createElement(_Stack.Stack, _extends({
    guidingChild: activeIndex,
    fill: fill
  }, rest), wrappedChildren, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    tabIndex: "0",
    focus: focus,
    onFocus: function onFocus(event) {
      setFocus(true);
      if (_onFocus) _onFocus(event);
    },
    onBlur: function onBlur(event) {
      setFocus(false);
      if (_onBlur) _onBlur(event);
    },
    fill: true,
    direction: "row",
    justify: "between"
  }, showArrows && /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    fill: "vertical",
    icon: /*#__PURE__*/_react["default"].createElement(PreviousIcon, {
      color: (0, _utils.normalizeColor)(previousIconDisabled ? theme.carousel.disabled.icons.color : theme.carousel.icons.color, theme)
    }),
    plain: true,
    disabled: previousIconDisabled,
    onClick: onLeft,
    hoverIndicator: true
  }), showSelectors && /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    justify: "end",
    fill: !showArrows && 'horizontal'
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    direction: "row",
    justify: "center"
  }, selectors)), showArrows && /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    fill: "vertical",
    icon: /*#__PURE__*/_react["default"].createElement(NextIcon, {
      color: (0, _utils.normalizeColor)(nextIconDisabled ? theme.carousel.disabled.icons.color : theme.carousel.icons.color, theme)
    }),
    plain: true,
    disabled: nextIconDisabled,
    onClick: onRight,
    hoverIndicator: true
  }))));
};

exports.Carousel = Carousel;
Carousel.defaultProps = {
  initialChild: 0,
  controls: true
};
Object.setPrototypeOf(Carousel.defaultProps, _defaultProps.defaultProps);
Carousel.displayName = 'Carousel';
Carousel.propTypes = _propTypes.CarouselPropTypes;