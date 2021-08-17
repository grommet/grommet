var _excluded = ["activeChild", "initialChild", "onChild", "play", "children", "controls", "fill", "onFocus", "onBlur"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Children, useCallback, useContext, useEffect, useState, useRef } from 'react';
import { normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';
import { ThemeContext } from '../../contexts';
import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { Stack } from '../Stack';
import { CarouselPropTypes } from './propTypes';

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

  var theme = useContext(ThemeContext) || defaultProps.theme;

  var _useState = useState(),
      focus = _useState[0],
      setFocus = _useState[1];

  var timerRef = useRef();

  var _useState2 = useState({
    activeIndex: activeChild !== undefined ? activeChild : initialChild
  }),
      indexes = _useState2[0],
      setIndexes = _useState2[1];

  var activeIndex = indexes.activeIndex,
      priorActiveIndex = indexes.priorActiveIndex;
  var lastIndex = Children.count(children) - 1;

  if (activeIndex !== activeChild && activeChild !== undefined) {
    if (activeChild >= 0 && activeChild <= lastIndex) {
      setIndexes({
        activeIndex: activeChild,
        priorActiveIndex: activeIndex
      });
    }
  }

  var onChildChange = useCallback(function (index) {
    if (onChild) {
      onChild(index);
    }
  }, [onChild]);
  useEffect(function () {
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
  var iconColor = normalizeColor(theme.carousel.icons.color || 'control', theme);
  var selectors = [];
  var wrappedChildren = Children.map(children, function (child, index) {
    selectors.push( /*#__PURE__*/React.createElement(Button, {
      a11yTitle: "Show carousel slide " + (index + 1) // eslint-disable-next-line react/no-array-index-key
      ,
      key: index,
      icon: /*#__PURE__*/React.createElement(CurrentIcon, {
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

    return /*#__PURE__*/React.createElement(Box, {
      fill: fill,
      style: {
        visibility: visibility
      },
      overflow: "hidden"
    }, /*#__PURE__*/React.createElement(Box, {
      fill: fill,
      animation: animation
    }, child));
  });
  var NextIcon = theme.carousel.icons.next;
  var PreviousIcon = theme.carousel.icons.previous;
  var nextIconDisabled = activeIndex >= lastIndex;
  var previousIconDisabled = activeIndex <= 0;
  return /*#__PURE__*/React.createElement(Keyboard, {
    onLeft: onLeft,
    onRight: onRight
  }, /*#__PURE__*/React.createElement(Stack, _extends({
    guidingChild: activeIndex,
    fill: fill
  }, rest), wrappedChildren, /*#__PURE__*/React.createElement(Box, {
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
  }, showArrows && /*#__PURE__*/React.createElement(Button, {
    fill: "vertical",
    icon: /*#__PURE__*/React.createElement(PreviousIcon, {
      color: normalizeColor(previousIconDisabled ? theme.carousel.disabled.icons.color : theme.carousel.icons.color, theme)
    }),
    plain: true,
    disabled: previousIconDisabled,
    onClick: onLeft,
    hoverIndicator: true
  }), showSelectors && /*#__PURE__*/React.createElement(Box, {
    justify: "end",
    fill: !showArrows && 'horizontal'
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    justify: "center"
  }, selectors)), showArrows && /*#__PURE__*/React.createElement(Button, {
    fill: "vertical",
    icon: /*#__PURE__*/React.createElement(NextIcon, {
      color: normalizeColor(nextIconDisabled ? theme.carousel.disabled.icons.color : theme.carousel.icons.color, theme)
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