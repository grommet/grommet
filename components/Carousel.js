'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames4 = require('classnames');

var _classnames5 = _interopRequireDefault(_classnames4);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Tiles = require('./Tiles');

var _Tiles2 = _interopRequireDefault(_Tiles);

var _Tile = require('./Tile');

var _Tile2 = _interopRequireDefault(_Tile);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Previous = require('./icons/base/Previous');

var _Previous2 = _interopRequireDefault(_Previous);

var _Next = require('./icons/base/Next');

var _Next2 = _interopRequireDefault(_Next);

var _DOM = require('../utils/DOM');

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Announcer = require('../utils/Announcer');

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CAROUSEL;

var Carousel = function (_Component) {
  _inherits(Carousel, _Component);

  function Carousel(props, context) {
    _classCallCheck(this, Carousel);

    var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props, context));

    _this._onSelect = _this._onSelect.bind(_this);
    _this._stopAutoplay = _this._stopAutoplay.bind(_this);
    _this._startAutoplay = _this._startAutoplay.bind(_this);
    _this._onResize = _this._onResize.bind(_this);
    _this._slidePrev = _this._slidePrev.bind(_this);
    _this._slideNext = _this._slideNext.bind(_this);
    _this._handleScroll = _this._handleScroll.bind(_this);
    _this._announce = _this._announce.bind(_this);

    _this.state = {
      activeIndex: props.activeIndex || 0,
      animate: typeof props.activeIndex == 'undefined',
      hideControls: !props.persistentNav,
      sequence: 1,
      width: 0,
      slide: false
    };
    return _this;
  }

  _createClass(Carousel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.carouselRef) {
        this.setState({
          width: this.carouselRef.offsetWidth
        });

        window.addEventListener('resize', this._onResize);

        var _Hammer = require('hammerjs');
        this.hammer = new _Hammer(this.carouselRef);
        this._updateHammer();

        this._handleScroll();
        var scrollParents = (0, _DOM.findScrollParents)(this.carouselRef);
        scrollParents.forEach(function (scrollParent) {
          scrollParent.addEventListener('scroll', _this2._handleScroll);
        }, this);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ((nextProps.activeIndex || 0 === nextProps.activeIndex) && this.state.activeIndex !== nextProps.activeIndex) {
        this.setState({ activeIndex: nextProps.activeIndex, animate: true }, this._announce);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var autoplay = this.props.autoplay;

      this._updateHammer();
      if (autoplay) {
        this._startAutoplay();
      } else if (!autoplay) {
        this._stopAutoplay();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this3 = this;

      clearInterval(this._slideAnimation);

      window.removeEventListener('resize', this._onResize);

      var scrollParents = (0, _DOM.findScrollParents)(this.carouselRef);
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', _this3._handleScroll);
      }, this);

      this._unmountHammer();
    }
  }, {
    key: '_unmountHammer',
    value: function _unmountHammer() {
      if (this.hammer) {
        this.hammer.stop();
        this.hammer.destroy();
      }
      this.hammer = undefined;
    }
  }, {
    key: '_updateHammer',
    value: function _updateHammer() {
      var _this4 = this;

      if (this.hammer) {
        this.hammer.get('swipe').set({
          direction: Hammer.DIRECTION_HORIZONTAL
        });

        this.hammer.off('panend');
        this.hammer.on('panend', function (event) {
          if (event.direction === 4) {
            _this4._slidePrev();
          } else if (event.direction === 2) {
            _this4._slideNext();
          }
        });
      }
    }
  }, {
    key: '_handleScroll',
    value: function _handleScroll() {
      var autoplay = this.props.autoplay;
      var slide = this.state.slide;

      var viewportHeight = document.documentElement.clientHeight;
      var carouselTopPosition = this.carouselRef.getBoundingClientRect().top;
      var carouselHeight = this.carouselRef.offsetHeight;
      var startScroll = viewportHeight - carouselHeight / 2;

      if (autoplay && carouselTopPosition <= startScroll && carouselTopPosition >= -carouselHeight / 2) {
        if (slide === false) {
          this._setSlideInterval();
          this.setState({
            slide: true
          });
        }
      } else {
        clearInterval(this._slideAnimation);
        this.setState({
          slide: false
        });
      }
    }
  }, {
    key: '_announce',
    value: function _announce() {
      var intl = this.context.intl;

      var slideNumber = _Intl2.default.getMessage(intl, 'Slide Number', {
        slideNumber: this.state.activeIndex + 1
      });
      var activatedMessage = _Intl2.default.getMessage(intl, 'Activated');
      (0, _Announcer.announce)(slideNumber + ' ' + activatedMessage, 'polite');
    }
  }, {
    key: '_setSlideInterval',
    value: function _setSlideInterval() {
      var autoplaySpeed = this.props.autoplaySpeed;

      clearInterval(this._slideAnimation);
      this._slideAnimation = setInterval(function () {
        var _props = this.props,
            children = _props.children,
            infinite = _props.infinite;
        var activeIndex = this.state.activeIndex;


        var numSlides = children.length;
        var index = (activeIndex + 1) % numSlides;

        if (!this.props.hasOwnProperty('activeIndex')) {
          this.setState({
            activeIndex: index
          }, this._announce);
        }
        if (!infinite && activeIndex === numSlides - 1) {
          clearInterval(this._slideAnimation);
        }

        if (this.props.onActive) {
          this.props.onActive(index);
        }
      }.bind(this), autoplaySpeed);
    }
  }, {
    key: '_onSelect',
    value: function _onSelect(index) {
      if (!this.props.hasOwnProperty('activeIndex') && index !== this.state.activeIndex) {
        this.setState({
          activeIndex: index
        }, this._announce);
      }

      if (this.props.onActive) {
        this.props.onActive(index);
      }
    }
  }, {
    key: '_stopAutoplay',
    value: function _stopAutoplay() {
      var persistentNav = this.props.persistentNav;

      if (this._slideAnimation) {
        clearInterval(this._slideAnimation);
      }

      if (!persistentNav) {
        this.setState({
          hideControls: false
        });
      }
    }
  }, {
    key: '_startAutoplay',
    value: function _startAutoplay() {
      var activeIndex = this.state.activeIndex;
      var _props2 = this.props,
          autoplay = _props2.autoplay,
          children = _props2.children,
          infinite = _props2.infinite,
          persistentNav = _props2.persistentNav;

      if (autoplay && (infinite || activeIndex !== children.length - 1) &&
      // making sure to only start autoplay if the focus is not inside
      // the carousel
      !this.carouselRef.contains(document.activeElement)) {
        this._setSlideInterval();
      }

      if (!persistentNav) {
        this.setState({
          hideControls: true
        });
      }
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      this.setState({
        width: this.carouselRef.offsetWidth
      });
    }
  }, {
    key: '_slidePrev',
    value: function _slidePrev() {
      var children = this.props.children;
      var activeIndex = this.state.activeIndex;

      var numSlides = children.length;
      var index = !this.props.infinite && activeIndex === 0 ? activeIndex : (activeIndex + numSlides - 1) % numSlides;

      if (!this.props.hasOwnProperty('activeIndex')) {
        this.setState({
          activeIndex: index
        }, this._announce);
      }

      if (this.props.onActive) {
        this.props.onActive(index);
      }
    }
  }, {
    key: '_slideNext',
    value: function _slideNext() {
      var children = this.props.children;
      var activeIndex = this.state.activeIndex;

      var numSlides = children.length;
      var index = !this.props.infinite && activeIndex === children.length - 1 ? activeIndex : (activeIndex + 1) % numSlides;

      if (!this.props.hasOwnProperty('activeIndex')) {
        this.setState({
          activeIndex: index
        }, this._announce);
      }

      if (this.props.onActive) {
        this.props.onActive(index);
      }
    }
  }, {
    key: '_renderPrevButton',
    value: function _renderPrevButton() {
      var infinite = this.props.infinite;
      var activeIndex = this.state.activeIndex;
      var intl = this.context.intl;

      var prevButton = void 0;
      if (infinite || activeIndex !== 0) {
        var prevMessage = _Intl2.default.getMessage(intl, 'Previous Slide');
        prevButton = _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Previous2.default, { size: 'large' }),
          a11yTitle: prevMessage,
          className: CLASS_ROOT + '__arrow ' + CLASS_ROOT + '__arrow--prev',
          onClick: this._slidePrev });
      }

      return prevButton;
    }
  }, {
    key: '_renderNextButton',
    value: function _renderNextButton() {
      var _props3 = this.props,
          children = _props3.children,
          infinite = _props3.infinite;
      var activeIndex = this.state.activeIndex;
      var intl = this.context.intl;

      var nextButton = void 0;
      if (infinite || activeIndex !== children.length - 1) {
        var nextMessage = _Intl2.default.getMessage(intl, 'Next Slide');
        nextButton = _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Next2.default, { size: 'large' }),
          a11yTitle: nextMessage,
          className: CLASS_ROOT + '__arrow ' + CLASS_ROOT + '__arrow--next',
          onClick: this._slideNext });
      }

      return nextButton;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _props4 = this.props,
          a11yTitle = _props4.a11yTitle,
          children = _props4.children,
          className = _props4.className,
          props = _objectWithoutProperties(_props4, ['a11yTitle', 'children', 'className']);

      delete props.activeIndex;
      delete props.onActive;
      var restProps = _Props2.default.omit(_extends({}, props), Object.keys(Carousel.propTypes));
      var _state = this.state,
          activeIndex = _state.activeIndex,
          hideControls = _state.hideControls,
          width = _state.width;
      var intl = this.context.intl;

      var classes = (0, _classnames5.default)(CLASS_ROOT, _defineProperty({}, CLASS_ROOT + '--hide-controls', hideControls), className);

      var trackWidth = width * children.length;
      var trackOffset = width * activeIndex;

      var tiles = _react2.default.Children.map(children, function (child, index) {
        var ariaHidden = activeIndex !== index ? true : false;
        return _react2.default.createElement(
          _Tile2.default,
          { className: CLASS_ROOT + '__item', 'aria-hidden': ariaHidden },
          child
        );
      });

      var controls = _react2.default.Children.map(children, function (child, index) {
        var active = index === activeIndex;
        var controlClasses = (0, _classnames5.default)(CLASS_ROOT + '__control', _defineProperty({}, CLASS_ROOT + '__control--active', active));
        var activateMessage = _Intl2.default.getMessage(intl, 'Activate');
        var slideNumberMessage = _Intl2.default.getMessage(intl, 'Slide Number', {
          slideNumber: index + 1
        });

        var currentlyActiveMessage = '';
        if (active) {
          currentlyActiveMessage = '(' + _Intl2.default.getMessage(intl, 'Currently Active') + ')';
        }
        return _react2.default.createElement(
          _Button2.default,
          { plain: true, onClick: _this5._onSelect.bind(_this5, index),
            a11yTitle: activateMessage + ' ' + slideNumberMessage + ' ' + currentlyActiveMessage },
          _react2.default.createElement(
            'svg',
            { className: controlClasses, viewBox: '0 0 24 24', version: '1.1' },
            _react2.default.createElement('circle', { cx: 12, cy: 12, r: 6 })
          )
        );
      }, this);

      var carouselMessage = a11yTitle || _Intl2.default.getMessage(intl, 'Carousel');
      var trackClasses = (0, _classnames5.default)(CLASS_ROOT + '__track', _defineProperty({}, CLASS_ROOT + '__track--animate', this.state.animate));
      return _react2.default.createElement(
        'div',
        _extends({ ref: function ref(_ref) {
            return _this5.carouselRef = _ref;
          } }, restProps, {
          className: classes, role: 'group', 'aria-label': carouselMessage,
          onFocus: this._stopAutoplay, onBlur: this._startAutoplay,
          onMouseOver: this._stopAutoplay, onMouseOut: this._startAutoplay }),
        _react2.default.createElement(
          'div',
          {
            className: trackClasses,
            style: {
              width: trackWidth && trackWidth > 0 ? trackWidth : '',
              marginLeft: -trackOffset,
              marginRight: -(trackWidth - trackOffset - width)
            } },
          _react2.default.createElement(
            _Tiles2.default,
            { fill: true, responsive: false, wrap: false, direction: 'row' },
            tiles
          )
        ),
        this._renderPrevButton(),
        this._renderNextButton(),
        _react2.default.createElement(
          _Box2.default,
          { className: CLASS_ROOT + "__controls", direction: 'row',
            justify: 'center', responsive: false },
          controls
        )
      );
    }
  }]);

  return Carousel;
}(_react.Component);

Carousel.displayName = 'Carousel';
exports.default = Carousel;


Carousel.contextTypes = {
  intl: _propTypes2.default.object
};

Carousel.defaultProps = {
  autoplay: true,
  autoplaySpeed: 5000,
  infinite: true,
  persistentNav: true
};

Carousel.propTypes = {
  a11yTitle: _propTypes2.default.string,
  activeIndex: _propTypes2.default.number,
  autoplay: _propTypes2.default.bool,
  autoplaySpeed: _propTypes2.default.number,
  infinite: _propTypes2.default.bool,
  onActive: _propTypes2.default.func,
  persistentNav: _propTypes2.default.bool
};
module.exports = exports['default'];