// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodashObjectPick = require('lodash/object/pick');

var _lodashObjectPick2 = _interopRequireDefault(_lodashObjectPick);

var _lodashObjectKeys = require('lodash/object/keys');

var _lodashObjectKeys2 = _interopRequireDefault(_lodashObjectKeys);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _utilsKeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _utilsKeyboardAccelerators2 = _interopRequireDefault(_utilsKeyboardAccelerators);

var _utilsScroll = require('../utils/Scroll');

var _utilsScroll2 = _interopRequireDefault(_utilsScroll);

var _SkipLinkAnchor = require('./SkipLinkAnchor');

var _SkipLinkAnchor2 = _interopRequireDefault(_SkipLinkAnchor);

// import CarouselControls from './CarouselControls';

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _iconsBaseNext = require('./icons/base/Next');

var _iconsBaseNext2 = _interopRequireDefault(_iconsBaseNext);

var _iconsBasePrevious = require('./icons/base/Previous');

var _iconsBasePrevious2 = _interopRequireDefault(_iconsBasePrevious);

var _iconsBaseUp = require('./icons/base/Up');

var _iconsBaseUp2 = _interopRequireDefault(_iconsBaseUp);

var _iconsBaseDown = require('./icons/base/Down');

var _iconsBaseDown2 = _interopRequireDefault(_iconsBaseDown);

var CLASS_ROOT = "article";
var DEFAULT_PLAY_INTERVAL = 10000; // 10s

var Article = (function (_Component) {
  _inherits(Article, _Component);

  function Article() {
    _classCallCheck(this, Article);

    _get(Object.getPrototypeOf(Article.prototype), 'constructor', this).call(this);

    this._onWheel = this._onWheel.bind(this);
    this._onNext = this._onNext.bind(this);
    this._onPrevious = this._onPrevious.bind(this);
    this._onTogglePlay = this._onTogglePlay.bind(this);
    this._onSelect = this._onSelect.bind(this);

    this.state = {
      activeIndex: 1,
      playing: false
    };
  }

  _createClass(Article, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.scrollStep) {
        var keys;
        if ('row' === this.props.direction) {
          keys = { left: this._onPrevious, right: this._onNext };
        } else {
          keys = { up: this._onPrevious, down: this._onNext };
        }
        keys.space = this._onTogglePlay;
        _utilsKeyboardAccelerators2['default'].startListeningToKeyboard(this, keys);

        document.addEventListener('wheel', this._onWheel);

        this._scrollParent = _reactDom2['default'].findDOMNode(this.refs.component);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.scrollStep) {
        var keys;
        if ('row' === this.props.direction) {
          keys = { left: this._onPrevious, right: this._onNext };
        } else {
          keys = { up: this._onPrevious, down: this._onNext };
        }
        keys.space = this._onTogglePlay;
        _utilsKeyboardAccelerators2['default'].stopListeningToKeyboard(this, keys);

        document.removeEventListener('wheel', this._onWheel);
      }
    }
  }, {
    key: '_onWheel',
    value: function _onWheel(event) {
      var delta = 'row' === this.props.direction ? event.deltaX : event.deltaY;
      if (Math.abs(delta) > 100) {
        // The user is expressing a resolute interest in controlling the
        // scrolling behavior. Stop doing any of our scroll step aligning
        // until he stops expressing such interest.
        clearInterval(this._wheelTimer);
        clearInterval(this._wheelLongTimer);
        this._wheelLongTimer = setTimeout((function () {
          this._wheelLongTimer = null;
        }).bind(this), 2000);
      } else if (!this._wheelLongTimer) {
        if (delta > 10) {
          clearInterval(this._wheelTimer);
          this._wheelTimer = setTimeout(this._onNext, 200);
        } else if (delta < -10) {
          clearInterval(this._wheelTimer);
          this._wheelTimer = setTimeout(this._onPrevious, 200);
        }
      }
    }
  }, {
    key: '_onNext',
    value: function _onNext(event, wrap) {
      if (event) {
        this._stop();
        event.preventDefault();
      }
      var articleElement = _reactDom2['default'].findDOMNode(this.refs.component);
      var children = articleElement.children;
      var advanced = false;
      for (var i = 0; i < children.length - 1; i += 1) {
        var child = children[i];
        var rect = child.getBoundingClientRect();
        // 10 is for fuzziness
        if ('row' === this.props.direction) {
          if (rect.right > 10 && i + 2 !== this.state.activeIndex && (event || wrap || rect.right < window.innerWidth)) {
            this._onSelect(i + 2);
            advanced = true;
            break;
          }
        } else {
          if (rect.bottom > 10 && i + 2 !== this.state.activeIndex && (event || wrap || rect.bottom < window.innerHeight)) {
            this._onSelect(i + 2);
            advanced = true;
            break;
          }
        }
      }
      if (wrap && !advanced) {
        this._onSelect(1);
      }
    }
  }, {
    key: '_onPrevious',
    value: function _onPrevious(event) {
      if (event) {
        this._stop();
        event.preventDefault();
      }
      var articleElement = _reactDom2['default'].findDOMNode(this.refs.component);
      var children = articleElement.children;
      for (var i = 0; i < children.length; i += 1) {
        var child = children[i];
        var rect = child.getBoundingClientRect();
        // -10 is for fuzziness
        if ('row' === this.props.direction) {
          if ((rect.left >= -10 || i === children.length - 1) && (event || rect.left < window.innerWidth)) {
            if (i > 0) {
              child = children[i - 1];
              rect = child.getBoundingClientRect();
              _utilsScroll2['default'].scrollBy(this._scrollParent, 'scrollLeft', rect.left);
              this.setState({ activeIndex: i });
            }
            break;
          }
        } else {
          if ((rect.top >= -10 || i === children.length - 1) && (event || rect.top < window.innerHeight)) {
            if (i > 0) {
              child = children[i - 1];
              rect = child.getBoundingClientRect();
              _utilsScroll2['default'].scrollBy(this._scrollParent, 'scrollTop', rect.top);
              this.setState({ activeIndex: i });
            }
            break;
          }
        }
      }
    }
  }, {
    key: '_start',
    value: function _start() {
      this._playTimer = setInterval((function () {
        this._onNext(null, true);
      }).bind(this), DEFAULT_PLAY_INTERVAL);
      this.setState({ playing: true });
    }
  }, {
    key: '_stop',
    value: function _stop() {
      clearInterval(this._playTimer);
      this.setState({ playing: false });
    }
  }, {
    key: '_onTogglePlay',
    value: function _onTogglePlay(event) {
      event.preventDefault();
      if (this.state.playing) {
        this._stop();
      } else {
        this._start();
      }
    }
  }, {
    key: '_onSelect',
    value: function _onSelect(activeIndex) {
      var articleElement = _reactDom2['default'].findDOMNode(this.refs.component);
      var children = articleElement.children;
      var child = children[activeIndex - 1];
      var rect = child.getBoundingClientRect();
      if ('row' === this.props.direction) {
        _utilsScroll2['default'].scrollBy(this._scrollParent, 'scrollLeft', rect.left);
      } else {
        _utilsScroll2['default'].scrollBy(this._scrollParent, 'scrollTop', rect.top);
      }
      this.setState({ activeIndex: activeIndex });
    }
  }, {
    key: '_renderControls',
    value: function _renderControls() {
      var CONTROL_CLASS_PREFIX = CLASS_ROOT + "__control " + CLASS_ROOT + "__control-";
      var CHILD_COUNT = _react2['default'].Children.count(this.props.children);
      var controls = [
        // Don't use CarouselControls for now
        // <CarouselControls key="carousel"
        //   className={CONTROL_CLASS_PREFIX + "carousel"}
        //   count={CHILD_COUNT}
        //   direction={this.props.direction}
        //   selected={this.state.activeIndex} onChange={this._onSelect} />
      ];
      if ('row' === this.props.direction) {
        if (this.state.activeIndex > 1) {
          controls.push(_react2['default'].createElement(
            _Button2['default'],
            { key: 'previous', type: 'icon',
              className: CONTROL_CLASS_PREFIX + "left",
              onClick: this._onPrevious },
            _react2['default'].createElement(_iconsBasePrevious2['default'], null)
          ));
        }
        if (this.state.activeIndex < CHILD_COUNT) {
          controls.push(_react2['default'].createElement(
            _Button2['default'],
            { key: 'next', type: 'icon',
              className: CONTROL_CLASS_PREFIX + "right",
              onClick: this._onNext },
            _react2['default'].createElement(_iconsBaseNext2['default'], null)
          ));
        }
      } else {
        if (this.state.activeIndex > 1) {
          controls.push(_react2['default'].createElement(
            _Button2['default'],
            { key: 'previous', type: 'icon',
              className: CONTROL_CLASS_PREFIX + "up",
              onClick: this._onPrevious },
            _react2['default'].createElement(_iconsBaseUp2['default'], null)
          ));
        }
        if (this.state.activeIndex < CHILD_COUNT) {
          controls.push(_react2['default'].createElement(
            _Button2['default'],
            { key: 'next', type: 'icon',
              className: CONTROL_CLASS_PREFIX + "down",
              onClick: this._onNext },
            _react2['default'].createElement(_iconsBaseDown2['default'], null)
          ));
        }
      }

      return controls;
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      var other = (0, _lodashObjectPick2['default'])(this.props, (0, _lodashObjectKeys2['default'])(_Box2['default'].propTypes));
      if (this.props.scrollStep) {
        classes.push(CLASS_ROOT + "--scroll-step");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var skipLinkAnchor = null;
      if (this.props.primary) {
        skipLinkAnchor = _react2['default'].createElement(_SkipLinkAnchor2['default'], { label: 'Main Content' });
      }

      var controls;
      if (this.props.controls) {
        controls = this._renderControls();
      }

      return _react2['default'].createElement(
        _Box2['default'],
        _extends({ ref: 'component', tag: 'article' }, other, { className: classes.join(' ') }),
        skipLinkAnchor,
        this.props.children,
        controls
      );
    }
  }]);

  return Article;
})(_react.Component);

Article.propTypes = _extends({
  controls: _react.PropTypes.bool,
  primary: _react.PropTypes.bool,
  scrollStep: _react.PropTypes.bool
}, _Box2['default'].propTypes);

Article.defaultProps = {
  pad: 'none',
  direction: 'column'
};

module.exports = Article;