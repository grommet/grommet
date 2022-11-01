var _excluded = ["activeChild", "initialChild", "onChild", "play", "children", "controls", "height", "fill", "width", "onFocus", "onBlur", "wrap"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { Children, useCallback, useContext, useEffect, useMemo, useState, useRef } from 'react';
import { normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';
import { ThemeContext } from '../../contexts';
import { MessageContext } from '../../contexts/MessageContext';
import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { StyledCarouselContainer, StyledControl } from './StyledCarousel';
import { CarouselChild } from './CarouselChild';
import { CarouselPropTypes } from './propTypes';
var Carousel = function Carousel(_ref) {
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
  var theme = useContext(ThemeContext) || defaultProps.theme;
  var _useContext = useContext(MessageContext),
    format = _useContext.format;
  var timerRef = useRef();
  var animationDuration = useMemo(function () {
    return play && play < theme.carousel.animation.duration ? play : theme.carousel.animation.duration;
  }, [play, theme.carousel.animation.duration]);
  var _useState = useState({
      activeIndex: activeChild !== undefined ? activeChild : initialChild
    }),
    indexes = _useState[0],
    setIndexes = _useState[1];
  var _useState2 = useState(activeChild),
    activeChildState = _useState2[0],
    setActiveChildState = _useState2[1];
  var _useState3 = useState(),
    direction = _useState3[0],
    setDirection = _useState3[1];
  var _useState4 = useState(false),
    inTransition = _useState4[0],
    setInTransition = _useState4[1];
  var activeIndex = indexes.activeIndex,
    priorActiveIndex = indexes.priorActiveIndex;
  var lastIndex = Children.count(children) - 1;
  var onChildChange = useCallback(function (index) {
    if (onChild) {
      onChild(index);
    }
  }, [onChild]);
  var onRight = useCallback(function () {
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
  var onLeft = useCallback(function () {
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
  var onSelect = useCallback(function (index) {
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
  var onControlledNavigation = useCallback(function () {
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
  useEffect(function () {
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
  useEffect(function () {
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
  useEffect(function () {
    onControlledNavigation(activeIndex, activeChild, activeChildState, inTransition);
  }, [onControlledNavigation, activeIndex, activeChild, activeChildState, inTransition]);
  var showArrows = controls && controls !== 'selectors';
  var showSelectors = controls && controls !== 'arrows';
  var CurrentIcon = theme.carousel.icons.current;
  var iconColor = normalizeColor(theme.carousel.icons.color || 'control', theme);
  var selectors = [];
  var wrappedChildren = Children.map(children, function (child, index) {
    selectors.push( /*#__PURE__*/React.createElement(Button, {
      a11yTitle: format({
        id: 'carousel.jump',
        values: {
          slide: index + 1
        }
      })
      // eslint-disable-next-line react/no-array-index-key
      ,
      key: index,
      icon: /*#__PURE__*/React.createElement(CurrentIcon, {
        color: activeIndex === index ? iconColor : undefined
      }),
      onClick: onSelect(index)
    }));
    return /*#__PURE__*/React.createElement(CarouselChild, {
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
  return /*#__PURE__*/React.createElement(Keyboard, {
    onLeft: onLeft,
    onRight: onRight
  }, /*#__PURE__*/React.createElement(StyledCarouselContainer, _extends({
    fill: fill,
    height: height,
    width: width
  }, rest), showArrows && /*#__PURE__*/React.createElement(StyledControl, {
    offsetProp: "left",
    fill: "vertical"
  }, /*#__PURE__*/React.createElement(Button, {
    fill: "vertical",
    icon: /*#__PURE__*/React.createElement(PreviousIcon, {
      color: normalizeColor(previousIconDisabled ? theme.carousel.disabled.icons.color : theme.carousel.icons.color, theme)
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
  })), wrappedChildren, showSelectors && /*#__PURE__*/React.createElement(StyledControl, {
    offsetProp: "bottom",
    fill: "horizontal"
  }, /*#__PURE__*/React.createElement(Box, {
    justify: "end",
    fill: !showArrows && 'horizontal'
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    justify: "center"
  }, selectors))), showArrows && /*#__PURE__*/React.createElement(StyledControl, {
    offsetProp: "right",
    fill: "vertical"
  }, /*#__PURE__*/React.createElement(Button, {
    fill: "vertical",
    icon: /*#__PURE__*/React.createElement(NextIcon, {
      color: normalizeColor(nextIconDisabled ? theme.carousel.disabled.icons.color : theme.carousel.icons.color, theme)
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
Object.setPrototypeOf(Carousel.defaultProps, defaultProps);
Carousel.displayName = 'Carousel';
Carousel.propTypes = CarouselPropTypes;
export { Carousel };