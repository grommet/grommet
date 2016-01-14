'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _pick = require('lodash/object/pick');

var _pick2 = _interopRequireDefault(_pick);

var _keys3 = require('lodash/object/keys');

var _keys4 = _interopRequireDefault(_keys3);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _Scroll = require('../utils/Scroll');

var _Scroll2 = _interopRequireDefault(_Scroll);

var _SkipLinkAnchor = require('./SkipLinkAnchor');

var _SkipLinkAnchor2 = _interopRequireDefault(_SkipLinkAnchor);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _LinkNext = require('./icons/base/LinkNext');

var _LinkNext2 = _interopRequireDefault(_LinkNext);

var _LinkPrevious = require('./icons/base/LinkPrevious');

var _LinkPrevious2 = _interopRequireDefault(_LinkPrevious);

var _Up = require('./icons/base/Up');

var _Up2 = _interopRequireDefault(_Up);

var _Down = require('./icons/base/Down');

var _Down2 = _interopRequireDefault(_Down);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

// import CarouselControls from './CarouselControls';

var CLASS_ROOT = "article";
var DEFAULT_PLAY_INTERVAL = 10000; // 10s

var Article = (function (_Component) {
  _inherits(Article, _Component);

  function Article() {
    _classCallCheck(this, Article);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Article).call(this));

    _this._onWheel = _this._onWheel.bind(_this);
    _this._onNext = _this._onNext.bind(_this);
    _this._onPrevious = _this._onPrevious.bind(_this);
    _this._onTogglePlay = _this._onTogglePlay.bind(_this);
    _this._onSelect = _this._onSelect.bind(_this);

    _this.state = {
      activeIndex: 0,
      playing: false
    };
    return _this;
  }

  _createClass(Article, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.scrollStep) {
        var _keys = undefined;
        if ('row' === this.props.direction) {
          _keys = { left: this._onPrevious, right: this._onNext };
        } else {
          _keys = { up: this._onPrevious, down: this._onNext };
        }
        _keys.space = this._onTogglePlay;
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, _keys);

        document.addEventListener('wheel', this._onWheel);

        this._scrollParent = _reactDom2.default.findDOMNode(this.refs.component);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.scrollStep) {
        var _keys2 = undefined;
        if ('row' === this.props.direction) {
          _keys2 = { left: this._onPrevious, right: this._onNext };
        } else {
          _keys2 = { up: this._onPrevious, down: this._onNext };
        }
        _keys2.space = this._onTogglePlay;
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this, _keys2);

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
      var childCount = _react2.default.Children.count(this.props.children);
      var limit = 'row' === this.props.direction ? window.innerWidth : window.innerHeight;
      var advanced = false;
      for (var index = 0; index < childCount; index += 1) {
        var childElement = _reactDom2.default.findDOMNode(this.refs[index]);
        var rect = childElement.getBoundingClientRect();
        var edge = 'row' === this.props.direction ? rect.right : rect.bottom;
        if (edge > 10 && (event || wrap || edge < limit)) {
          // This is the first visible child, select the next one
          if (index + 1 !== this.state.activeIndex) {
            this._onSelect(index + 1);
          }
          advanced = true;
          break;
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
      var childCount = _react2.default.Children.count(this.props.children);
      var limit = 'row' === this.props.direction ? window.innerWidth : window.innerHeight;
      for (var index = childCount - 1; index >= 0; index -= 1) {
        var childElement = _reactDom2.default.findDOMNode(this.refs[index]);
        var rect = childElement.getBoundingClientRect();
        var edge = 'row' === this.props.direction ? rect.left : rect.top;
        if (edge < limit && (event || edge > 10)) {
          // This is the first visible child, select the previous one
          if (index - 1 !== this.state.activeIndex) {
            this._onSelect(index - 1);
          }
          break;
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
      var childElement = _reactDom2.default.findDOMNode(this.refs[activeIndex]);
      var rect = childElement.getBoundingClientRect();
      if ('row' === this.props.direction) {
        _Scroll2.default.scrollBy(this._scrollParent, 'scrollLeft', rect.left);
      } else {
        _Scroll2.default.scrollBy(this._scrollParent, 'scrollTop', rect.top);
      }
      this.setState({ activeIndex: activeIndex });
    }
  }, {
    key: '_renderControls',
    value: function _renderControls() {
      var CONTROL_CLASS_PREFIX = CLASS_ROOT + "__control " + CLASS_ROOT + "__control-";
      var childCount = _react2.default.Children.count(this.props.children);
      var controls = [
        // Don't use CarouselControls for now
        // <CarouselControls key="carousel"
        //   className={CONTROL_CLASS_PREFIX + "carousel"}
        //   count={childCount}
        //   direction={this.props.direction}
        //   selected={this.state.activeIndex} onChange={this._onSelect} />
      ];
      if ('row' === this.props.direction) {
        if (this.state.activeIndex > 0) {
          controls.push(_react2.default.createElement(
            _Button2.default,
            { key: 'previous', type: 'icon',
              className: CONTROL_CLASS_PREFIX + "left",
              onClick: this._onPrevious },
            _react2.default.createElement(_LinkPrevious2.default, { size: 'large' })
          ));
        }
        if (this.state.activeIndex < childCount - 1) {
          controls.push(_react2.default.createElement(
            _Button2.default,
            { key: 'next', type: 'icon',
              className: CONTROL_CLASS_PREFIX + "right",
              onClick: this._onNext },
            _react2.default.createElement(_LinkNext2.default, { size: 'large' })
          ));
        }
      } else {
        if (this.state.activeIndex > 0) {
          controls.push(_react2.default.createElement(
            _Button2.default,
            { key: 'previous', type: 'icon',
              className: CONTROL_CLASS_PREFIX + "up",
              onClick: this._onPrevious },
            _react2.default.createElement(_Up2.default, null)
          ));
        }
        if (this.state.activeIndex < childCount - 1) {
          controls.push(_react2.default.createElement(
            _Button2.default,
            { key: 'next', type: 'icon',
              className: CONTROL_CLASS_PREFIX + "down",
              onClick: this._onNext },
            _react2.default.createElement(_Down2.default, null)
          ));
        }
      }

      return controls;
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      var other = (0, _pick2.default)(this.props, (0, _keys4.default)(_Box2.default.propTypes));
      if (this.props.scrollStep) {
        classes.push(CLASS_ROOT + "--scroll-step");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var skipLinkAnchor = null;
      if (this.props.primary) {
        skipLinkAnchor = _react2.default.createElement(_SkipLinkAnchor2.default, { label: 'Main Content' });
      }

      var controls = undefined;
      if (this.props.controls) {
        controls = this._renderControls();
      }

      var children = this.props.children;
      if (this.props.scrollStep || this.props.controls) {
        children = _react.Children.map(this.props.children, function (element, index) {
          return element ? _react2.default.cloneElement(element, { ref: index }) : element;
        });
      }

      return _react2.default.createElement(
        _Box2.default,
        _extends({ ref: 'component', tag: 'article' }, other, { className: classes.join(' ') }),
        skipLinkAnchor,
        children,
        controls
      );
    }
  }]);

  return Article;
})(_react.Component);

exports.default = Article;

Article.propTypes = _extends({
  controls: _react.PropTypes.bool,
  primary: _react.PropTypes.bool,
  scrollStep: _react.PropTypes.bool
}, _Box2.default.propTypes);

Article.defaultProps = {
  pad: 'none',
  direction: 'column'
};
module.exports = exports['default'];