'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

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

var _DOM2 = _interopRequireDefault(_DOM);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Announcer = require('../utils/Announcer');

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.CAROUSEL; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var Carousel = function (_Component) {
  (0, _inherits3.default)(Carousel, _Component);

  function Carousel(props, context) {
    (0, _classCallCheck3.default)(this, Carousel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Carousel.__proto__ || (0, _getPrototypeOf2.default)(Carousel)).call(this, props, context));

    _this._onSelect = _this._onSelect.bind(_this);
    _this._stopAutoplay = _this._stopAutoplay.bind(_this);
    _this._startAutoplay = _this._startAutoplay.bind(_this);
    _this._onResize = _this._onResize.bind(_this);
    _this._slidePrev = _this._slidePrev.bind(_this);
    _this._slideNext = _this._slideNext.bind(_this);
    _this._handleScroll = _this._handleScroll.bind(_this);

    _this.state = {
      activeIndex: 0,
      hideControls: !props.persistentNav,
      priorIndex: 0,
      sequence: 1,
      width: 0,
      slide: false
    };
    return _this;
  }

  (0, _createClass3.default)(Carousel, [{
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
        var scrollParents = _DOM2.default.findScrollParents(this.carouselRef);
        scrollParents.forEach(function (scrollParent) {
          scrollParent.addEventListener('scroll', _this2._handleScroll);
        }, this);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._updateHammer();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this3 = this;

      clearInterval(this._slideAnimation);

      window.removeEventListener('resize', this._onResize);

      var scrollParents = _DOM2.default.findScrollParents(this.carouselRef);
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
    key: '_setSlideInterval',
    value: function _setSlideInterval() {
      var autoplaySpeed = this.props.autoplaySpeed;

      clearInterval(this._slideAnimation);
      this._slideAnimation = setInterval(function () {
        var _this5 = this;

        var _props = this.props,
            children = _props.children,
            infinite = _props.infinite;
        var activeIndex = this.state.activeIndex;
        var intl = this.context.intl;

        var numSlides = children.length;

        this.setState({
          activeIndex: (activeIndex + 1) % numSlides
        }, function () {
          var slideNumber = _Intl2.default.getMessage(intl, 'Slide Number', {
            slideNumber: _this5.state.activeIndex + 1
          });
          var activatedMessage = _Intl2.default.getMessage(intl, 'Activated');
          (0, _Announcer.announce)(slideNumber + ' ' + activatedMessage, 'polite');
        });

        if (!infinite && activeIndex === numSlides - 1) {
          clearInterval(this._slideAnimation);
        }
      }.bind(this), autoplaySpeed);
    }
  }, {
    key: '_onSelect',
    value: function _onSelect(index) {
      if (index !== this.state.activeIndex) {
        this.setState({
          activeIndex: index
        });
      }
    }
  }, {
    key: '_stopAutoplay',
    value: function _stopAutoplay() {
      var _props2 = this.props,
          autoplay = _props2.autoplay,
          persistentNav = _props2.persistentNav;

      if (autoplay) {
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
      var _props3 = this.props,
          autoplay = _props3.autoplay,
          children = _props3.children,
          infinite = _props3.infinite,
          persistentNav = _props3.persistentNav;

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
      this.setState({
        activeIndex: (activeIndex + numSlides - 1) % numSlides
      });
    }
  }, {
    key: '_slideNext',
    value: function _slideNext() {
      var children = this.props.children;
      var activeIndex = this.state.activeIndex;

      var numSlides = children.length;
      this.setState({
        activeIndex: (activeIndex + 1) % numSlides
      });
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
        prevButton = _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Previous2.default, { size: 'large' }), a11yTitle: prevMessage,
          className: CLASS_ROOT + '__arrow ' + CLASS_ROOT + '__arrow--prev',
          onClick: this._slidePrev });
      }

      return prevButton;
    }
  }, {
    key: '_renderNextButton',
    value: function _renderNextButton() {
      var _props4 = this.props,
          children = _props4.children,
          infinite = _props4.infinite;
      var activeIndex = this.state.activeIndex;
      var intl = this.context.intl;

      var nextButton = void 0;
      if (infinite || activeIndex !== children.length - 1) {
        var nextMessage = _Intl2.default.getMessage(intl, 'Next Slide');
        nextButton = _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Next2.default, { size: 'large' }), a11yTitle: nextMessage,
          className: CLASS_ROOT + '__arrow ' + CLASS_ROOT + '__arrow--next',
          onClick: this._slideNext });
      }

      return nextButton;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _props5 = this.props,
          a11yTitle = _props5.a11yTitle,
          children = _props5.children,
          className = _props5.className,
          props = (0, _objectWithoutProperties3.default)(_props5, ['a11yTitle', 'children', 'className']);

      var restProps = _Props2.default.omit((0, _extends3.default)({}, props), (0, _keys2.default)(Carousel.propTypes));
      var _state = this.state,
          activeIndex = _state.activeIndex,
          hideControls = _state.hideControls,
          width = _state.width;
      var intl = this.context.intl;

      var classes = (0, _classnames4.default)(CLASS_ROOT, (0, _defineProperty3.default)({}, CLASS_ROOT + '--hide-controls', hideControls), className);

      var trackWidth = width * children.length;
      var trackPosition = -(width * activeIndex);

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
        var controlClasses = (0, _classnames4.default)(CLASS_ROOT + '__control', (0, _defineProperty3.default)({}, CLASS_ROOT + '__control--active', active));
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
          { plain: true, onClick: _this6._onSelect.bind(_this6, index),
            a11yTitle: activateMessage + ' ' + slideNumberMessage + ' ' + currentlyActiveMessage },
          _react2.default.createElement(
            'svg',
            { className: controlClasses, viewBox: '0 0 24 24', version: '1.1' },
            _react2.default.createElement('circle', { cx: 12, cy: 12, r: 6 })
          )
        );
      }, this);

      var carouselMessage = a11yTitle || _Intl2.default.getMessage(intl, 'Carousel');
      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ ref: function ref(_ref) {
            return _this6.carouselRef = _ref;
          } }, restProps, {
          className: classes, role: 'group', 'aria-label': carouselMessage,
          onFocus: this._stopAutoplay, onBlur: this._startAutoplay,
          onMouseOver: this._stopAutoplay, onMouseOut: this._startAutoplay }),
        _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__track',
            style: {
              width: trackWidth && trackWidth > 0 ? trackWidth : '',
              marginLeft: trackPosition
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
  intl: _react.PropTypes.object
};

Carousel.defaultProps = {
  autoplay: true,
  autoplaySpeed: 5000,
  infinite: true,
  persistentNav: true
};

Carousel.propTypes = {
  a11yTitle: _react.PropTypes.string,
  autoplay: _react.PropTypes.bool,
  autoplaySpeed: _react.PropTypes.number,
  infinite: _react.PropTypes.bool,
  persistentNav: _react.PropTypes.bool
};
module.exports = exports['default'];