'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// define window obj for react tests to run properly
var Hammer = function Hammer() {}; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

if (typeof window !== 'undefined') {
  Hammer = require('hammerjs');
}

var CLASS_ROOT = _CSSClassnames2.default.CAROUSEL;

var Carousel = function (_Component) {
  (0, _inherits3.default)(Carousel, _Component);

  function Carousel(props, context) {
    (0, _classCallCheck3.default)(this, Carousel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Carousel).call(this, props));

    _this._onSelect = _this._onSelect.bind(_this);
    _this._onMouseOver = _this._onMouseOver.bind(_this);
    _this._onMouseOut = _this._onMouseOut.bind(_this);
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
      this.setState({
        width: this.refs.carousel.offsetWidth
      });

      window.addEventListener('resize', this._onResize);

      this.hammer = new Hammer(this.refs.carousel);
      this._updateHammer();

      this._handleScroll();
      var scrollParents = _DOM2.default.findScrollParents(this.refs.carousel);
      scrollParents.forEach(function (scrollParent) {
        scrollParent.addEventListener('scroll', this._handleScroll);
      }.bind(this));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._updateHammer();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this._slideAnimation);

      window.removeEventListener('resize', this._onResize);

      var scrollParents = _DOM2.default.findScrollParents(this.refs.carousel);
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', this._handleScroll);
      }.bind(this));

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
      var _this2 = this;

      if (this.hammer) {
        this.hammer.get('swipe').set({
          direction: Hammer.DIRECTION_HORIZONTAL
        });

        this.hammer.off('panend');
        this.hammer.on('panend', function (event) {
          if (event.direction === 4) {
            _this2._slidePrev();
          } else if (event.direction === 2) {
            _this2._slideNext();
          }
        });
      }
    }
  }, {
    key: '_handleScroll',
    value: function _handleScroll() {
      var viewportHeight = document.documentElement.clientHeight;
      var carouselTopPosition = this.refs.carousel.getBoundingClientRect().top;
      var carouselHeight = this.refs.carousel.offsetHeight;
      var startScroll = viewportHeight - carouselHeight / 2;

      if (this.props.autoplay && carouselTopPosition <= startScroll && carouselTopPosition >= -carouselHeight / 2) {
        if (this.state.slide === false) {
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
      this._slideAnimation = setInterval(function () {
        var activeIndex = this.state.activeIndex;
        var numSlides = this.props.children.length;

        this.setState({
          activeIndex: (activeIndex + 1) % numSlides
        });

        if (!this.props.infinite && activeIndex === numSlides - 1) {
          clearInterval(this._slideAnimation);
        }
      }.bind(this), this.props.autoplaySpeed);
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
    key: '_onMouseOver',
    value: function _onMouseOver() {
      if (this.props.autoplay) {
        clearInterval(this._slideAnimation);
      }

      if (!this.props.persistentNav) {
        this.setState({
          hideControls: false
        });
      }
    }
  }, {
    key: '_onMouseOut',
    value: function _onMouseOut() {
      if (this.props.autoplay && (this.props.infinite || this.state.activeIndex !== this.props.children.length - 1)) {
        this._setSlideInterval();
      }

      if (!this.props.persistentNav) {
        this.setState({
          hideControls: true
        });
      }
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      this.setState({
        width: this.refs.carousel.offsetWidth
      });
    }
  }, {
    key: '_slidePrev',
    value: function _slidePrev() {
      var numSlides = this.props.children.length;
      this.setState({
        activeIndex: (this.state.activeIndex + numSlides - 1) % numSlides
      });
    }
  }, {
    key: '_slideNext',
    value: function _slideNext() {
      var numSlides = this.props.children.length;
      this.setState({
        activeIndex: (this.state.activeIndex + 1) % numSlides
      });
    }
  }, {
    key: '_renderPrevButton',
    value: function _renderPrevButton() {
      var prevButton = undefined;
      if (this.props.infinite || this.state.activeIndex !== 0) {
        prevButton = _react2.default.createElement(
          _Button2.default,
          {
            className: CLASS_ROOT + '__arrow ' + CLASS_ROOT + '__arrow--prev',
            plain: true, onClick: this._slidePrev },
          _react2.default.createElement(_Previous2.default, { size: 'large' })
        );
      }

      return prevButton;
    }
  }, {
    key: '_renderNextButton',
    value: function _renderNextButton() {
      var nextButton = undefined;
      if (this.props.infinite || this.state.activeIndex !== this.props.children.length - 1) {
        nextButton = _react2.default.createElement(
          _Button2.default,
          {
            className: CLASS_ROOT + '__arrow ' + CLASS_ROOT + '__arrow--next',
            plain: true, onClick: this._slideNext },
          _react2.default.createElement(_Next2.default, { size: 'large' })
        );
      }

      return nextButton;
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.state.hideControls) {
        classes.push(CLASS_ROOT + '--hide-controls');
      }

      if (this.props.className) {
        classes.push(this.props.className);
      }

      var index = -1;
      var children = this.props.children;

      var width = this.state.width;
      var trackWidth = width * children.length;

      var trackPosition = -(width * this.state.activeIndex);

      var tiles = _react2.default.Children.map(children, function (child) {
        return _react2.default.createElement(
          _Tile2.default,
          { className: CLASS_ROOT + "__item" },
          child
        );
      }, this);

      var controls = _react2.default.Children.map(children, function (child) {
        index += 1;
        var controlClasses = [CLASS_ROOT + "__control"];
        if (index === this.state.activeIndex) {
          controlClasses.push(CLASS_ROOT + "__control--active");
        }

        return _react2.default.createElement(
          'svg',
          { className: controlClasses.join(' '),
            viewBox: '0 0 24 24', version: '1.1',
            onClick: this._onSelect.bind(this, index) },
          _react2.default.createElement('circle', { cx: 12, cy: 12, r: 6 })
        );
      }, this);

      return _react2.default.createElement(
        'div',
        { ref: 'carousel', className: classes.join(' '),
          onMouseEnter: this._onMouseOver, onMouseLeave: this._onMouseOut },
        _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + "__track",
            style: { width: trackWidth, marginLeft: trackPosition } },
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


Carousel.propTypes = {
  autoplay: _react.PropTypes.bool,
  autoplaySpeed: _react.PropTypes.number,
  infinite: _react.PropTypes.bool,
  persistentNav: _react.PropTypes.bool
};

Carousel.defaultProps = {
  autoplay: true,
  autoplaySpeed: 5000,
  infinite: true,
  persistentNav: true
};
module.exports = exports['default'];