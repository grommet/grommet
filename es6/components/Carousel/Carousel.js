function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Children, Component } from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { Stack } from '../Stack';
import { withFocus } from '../hocs';

var Carousel =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Carousel, _Component);

  function Carousel() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      activeIndex: 0
    });

    _defineProperty(_assertThisInitialized(_this), "play", function () {
      var play = _this.props.play;
      clearInterval(_this.timer);
      _this.timer = setInterval(function () {
        var children = _this.props.children;
        var activeIndex = _this.state.activeIndex;
        var lastIndex = Children.count(children) - 1;

        if (activeIndex < lastIndex) {
          _this.setState({
            activeIndex: activeIndex + 1,
            priorActiveIndex: activeIndex
          });
        } else {
          _this.setState({
            activeIndex: 0,
            priorActiveIndex: activeIndex
          });
        }
      }, play);
    });

    _defineProperty(_assertThisInitialized(_this), "onRight", function () {
      var activeIndex = _this.state.activeIndex;
      clearInterval(_this.timer);

      _this.setState({
        activeIndex: activeIndex + 1,
        priorActiveIndex: activeIndex
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onLeft", function () {
      var activeIndex = _this.state.activeIndex;
      clearInterval(_this.timer);

      _this.setState({
        activeIndex: activeIndex - 1,
        priorActiveIndex: activeIndex
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (index) {
      return function () {
        var activeIndex = _this.state.activeIndex;
        clearInterval(_this.timer);

        _this.setState({
          activeIndex: index,
          priorActiveIndex: activeIndex
        });
      };
    });

    return _this;
  }

  var _proto = Carousel.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var play = this.props.play;

    if (play) {
      this.play();
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var play = this.props.play;

    if (play && (!prevProps.play || play !== prevProps.play)) {
      this.play();
    } else if (!play && prevProps.play) {
      clearInterval(this.timer);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearInterval(this.timer);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        children = _this$props.children,
        fill = _this$props.fill,
        focus = _this$props.focus,
        theme = _this$props.theme,
        rest = _objectWithoutPropertiesLoose(_this$props, ["children", "fill", "focus", "theme"]);

    var _this$state = this.state,
        activeIndex = _this$state.activeIndex,
        priorActiveIndex = _this$state.priorActiveIndex;
    var lastIndex = Children.count(children) - 1;
    var onLeft = activeIndex > 0 ? this.onLeft : undefined;
    var onRight = activeIndex < lastIndex ? this.onRight : undefined;
    var CurrentIcon = theme.carousel.icons.current;
    var iconColor = normalizeColor(theme.carousel.icons.color || 'control', theme);
    var selectors = [];
    var wrappedChildren = Children.map(children, function (child, index) {
      selectors.push(React.createElement(Button // eslint-disable-next-line react/no-array-index-key
      , {
        key: index,
        icon: React.createElement(CurrentIcon, {
          color: activeIndex === index ? iconColor : undefined
        }),
        onClick: _this2.onSelect(index)
      }));
      var animation;

      if (index === activeIndex) {
        if (priorActiveIndex !== undefined) {
          animation = {
            type: priorActiveIndex < activeIndex ? 'slideLeft' : 'slideRight',
            size: 'xlarge'
          };
        }
      } else if (index === priorActiveIndex) {
        animation = {
          type: 'fadeOut'
        };
      } else {
        animation = {
          type: 'fadeOut',
          duration: 0
        };
      }

      return React.createElement(Box, {
        overflow: "hidden"
      }, React.createElement(Box, {
        animation: animation
      }, child));
    });
    var NextIcon = theme.carousel.icons.next;
    var PreviousIcon = theme.carousel.icons.previous;
    return React.createElement(Keyboard, {
      onLeft: onLeft,
      onRight: onRight
    }, React.createElement(Stack, _extends({
      guidingChild: activeIndex,
      fill: fill
    }, rest), wrappedChildren, React.createElement(Box, {
      tabIndex: "0",
      focus: focus,
      fill: true,
      direction: "row",
      justify: "between"
    }, React.createElement(Button, {
      fill: "vertical",
      icon: React.createElement(PreviousIcon, null),
      plain: true,
      disabled: activeIndex <= 0,
      onClick: onLeft,
      hoverIndicator: true
    }), React.createElement(Box, {
      justify: "end"
    }, React.createElement(Box, {
      direction: "row",
      justify: "center"
    }, selectors)), React.createElement(Button, {
      fill: "vertical",
      icon: React.createElement(NextIcon, null),
      plain: true,
      disabled: activeIndex >= lastIndex,
      onClick: onRight,
      hoverIndicator: true
    }))));
  };

  return Carousel;
}(Component);

Carousel.defaultProps = {};
Object.setPrototypeOf(Carousel.defaultProps, defaultProps);
var CarouselDoc;

if (process.env.NODE_ENV !== 'production') {
  CarouselDoc = require('./doc').doc(Carousel); // eslint-disable-line global-require
}

var CarouselWrapper = compose(withFocus(), withTheme)(CarouselDoc || Carousel);
export { CarouselWrapper as Carousel };