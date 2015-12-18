// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var _iconsBasePrevious = require('./icons/base/Previous');

var _iconsBasePrevious2 = _interopRequireDefault(_iconsBasePrevious);

var _iconsBaseNext = require('./icons/base/Next');

var _iconsBaseNext2 = _interopRequireDefault(_iconsBaseNext);

var CLASS_ROOT = "carousel";

var Carousel = (function (_Component) {
  _inherits(Carousel, _Component);

  function Carousel(props) {
    _classCallCheck(this, Carousel);

    _get(Object.getPrototypeOf(Carousel.prototype), 'constructor', this).call(this, props);

    this._onSelect = this._onSelect.bind(this);
    this._onMouseOver = this._onMouseOver.bind(this);
    this._onMouseOut = this._onMouseOut.bind(this);
    this._onResize = this._onResize.bind(this);
    this._slidePrev = this._slidePrev.bind(this);
    this._slideNext = this._slideNext.bind(this);

    this.state = {
      activeIndex: 0,
      hideControls: !props.persistentNav,
      priorIndex: 0,
      sequence: 1,
      width: 0
    };
  }

  _createClass(Carousel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        width: this.refs.carousel.offsetWidth
      });

      if (this.props.autoplay) {
        this._setSlideInterval();
      }

      window.addEventListener('resize', this._onResize);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this._slideAnimation);

      window.removeEventListener('resize', this._onResize);
    }
  }, {
    key: '_setSlideInterval',
    value: function _setSlideInterval() {
      this._slideAnimation = setInterval((function () {
        var activeIndex = this.state.activeIndex;
        var numSlides = this.props.children.length;

        this.setState({
          activeIndex: (activeIndex + 1) % numSlides
        });

        if (!this.props.infinite && activeIndex === numSlides - 1) {
          clearInterval(this._slideAnimation);
        }
      }).bind(this), this.props.autoplaySpeed);
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
      if (this.props.infinite || this.state.activeIndex !== 0) {
        return _react2['default'].createElement(
          _Button2['default'],
          {
            className: CLASS_ROOT + '__arrow ' + CLASS_ROOT + '__arrow--prev',
            type: 'icon', onClick: this._slidePrev },
          _react2['default'].createElement(_iconsBasePrevious2['default'], { size: 'large' })
        );
      }
    }
  }, {
    key: '_renderNextButton',
    value: function _renderNextButton() {
      if (this.props.infinite || this.state.activeIndex !== this.props.children.length - 1) {
        return _react2['default'].createElement(
          _Button2['default'],
          {
            className: CLASS_ROOT + '__arrow ' + CLASS_ROOT + '__arrow--next',
            type: 'icon', onClick: this._slideNext },
          _react2['default'].createElement(_iconsBaseNext2['default'], { size: 'large' })
        );
      }
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

      var tiles = _react2['default'].Children.map(children, function (child) {
        return _react2['default'].createElement(
          _Tile2['default'],
          { className: CLASS_ROOT + "__item" },
          child
        );
      }, this);

      var controls = _react2['default'].Children.map(children, function (child) {
        index += 1;
        var controlClasses = [CLASS_ROOT + "__control"];
        if (index === this.state.activeIndex) {
          controlClasses.push(CLASS_ROOT + "__control--active");
        }

        return _react2['default'].createElement(
          'svg',
          { className: controlClasses.join(' '),
            viewBox: '0 0 24 24', version: '1.1',
            onClick: this._onSelect.bind(this, index) },
          _react2['default'].createElement('circle', { cx: 12, cy: 12, r: 6 })
        );
      }, this);

      return _react2['default'].createElement(
        'div',
        { ref: 'carousel', className: classes.join(' '),
          onMouseEnter: this._onMouseOver, onMouseLeave: this._onMouseOut },
        _react2['default'].createElement(
          'div',
          { className: CLASS_ROOT + "__track",
            style: { width: trackWidth, marginLeft: trackPosition } },
          _react2['default'].createElement(
            _Tiles2['default'],
            { fill: true },
            tiles
          )
        ),
        this._renderPrevButton(),
        this._renderNextButton(),
        _react2['default'].createElement(
          _Box2['default'],
          { className: CLASS_ROOT + "__controls", direction: 'row',
            justify: 'center', responsive: false },
          controls
        )
      );
    }
  }]);

  return Carousel;
})(_react.Component);

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

module.exports = Carousel;