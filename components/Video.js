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

var _reactDom = require('react-dom');

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _Controls = require('./video/Controls');

var _Controls2 = _interopRequireDefault(_Controls);

var _Overlay = require('./video/Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _Throttle = require('../utils/Throttle');

var _Throttle2 = _interopRequireDefault(_Throttle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.VIDEO;
var BACKGROUND_COLOR_INDEX = _CSSClassnames2.default.BACKGROUND_COLOR_INDEX;

var Video = function (_Component) {
  _inherits(Video, _Component);

  function Video(props, context) {
    _classCallCheck(this, Video);

    var _this = _possibleConstructorReturn(this, (Video.__proto__ || Object.getPrototypeOf(Video)).call(this, props, context));

    _this._hasPlayed = false;
    _this._play = _this._play.bind(_this);
    _this._pause = _this._pause.bind(_this);
    _this._togglePlay = _this._togglePlay.bind(_this);
    _this._toggleMute = _this._toggleMute.bind(_this);
    _this._seek = _this._seek.bind(_this);
    _this._mute = _this._mute.bind(_this);
    _this._unmute = _this._unmute.bind(_this);
    _this._fullscreen = _this._fullscreen.bind(_this);
    _this._onInterationStart = _this._onInterationStart.bind(_this);
    _this._onInteractionOver = _this._onInteractionOver.bind(_this);
    _this._renderControls = _this._renderControls.bind(_this);

    _this.state = {
      mouseActive: false
    };
    return _this;
  }

  _createClass(Video, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._update = (0, _Throttle2.default)(this._update.bind(this), 100, this);
      this._mediaEventProps = this._injectUpdateVideoEvents();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // Dynamically modifying a source element and its attribute when
      // the element is already inserted in a video or audio element will
      // have no effect.
      // From HTML Specs:
      // https://html.spec.whatwg.org/multipage/embedded-content.html
      //   #the-source-element
      // Using forceUpdate to force redraw of video when receiving new <source>
      this.forceUpdate();
    }
  }, {
    key: '_injectUpdateVideoEvents',
    value: function _injectUpdateVideoEvents() {
      var _this2 = this;

      var videoEvents = ['onAbort', 'onCanPlay', 'onCanPlayThrough', 'onDurationChange', 'onEmptied', 'onEncrypted', 'onEnded', 'onError', 'onLoadedData', 'onLoadedMetadata', 'onLoadStart', 'onPause', 'onPlay', 'onPlaying', 'onProgress', 'onRateChange', 'onSeeked', 'onSeeking', 'onStalled', 'onSuspend', 'onTimeUpdate', 'onVolumeChange', 'onWaiting'];

      return videoEvents.reduce(function (previousValue, currentValue) {
        previousValue[currentValue] = function (e) {
          if (currentValue in _this2.props && typeof _this2.props[currentValue] === 'function') {
            _this2.props[currentValue](e);
          }
          _this2._update();
        };

        return previousValue;
      }, {});
    }
  }, {
    key: '_update',
    value: function _update() {
      // Set flag for Video first play
      if (!this._hasPlayed && !this._video.paused && !this._video.loading) {
        this._hasPlayed = true;
      }

      var interacting = this.state.interacting;
      if (this._video.ended) {
        interacting = false;
      };

      this.setState({
        duration: this._video.duration,
        currentTime: this._video.currentTime,
        buffered: this._video.buffered,
        paused: this._video.paused,
        muted: this._video.muted,
        volume: this._video.volume,
        ended: this._video.ended,
        readyState: this._video.readyState,
        interacting: interacting,
        // computed values
        hasPlayed: this._hasPlayed,
        playing: !this._video.paused && !this._video.loading,
        percentageBuffered: this._video.buffered.length && this._video.buffered.end(this._video.buffered.length - 1) / this._video.duration * 100,
        percentagePlayed: this._video.currentTime / this._video.duration * 100,
        loading: this._video.readyState < this._video.HAVE_ENOUGH_DATA
      });
    }
  }, {
    key: '_play',
    value: function _play() {
      this._video.play();
    }
  }, {
    key: '_pause',
    value: function _pause() {
      this._video.pause();
    }
  }, {
    key: '_togglePlay',
    value: function _togglePlay() {
      if (this.state.paused) {
        this._play();
      } else {
        this._pause();
      }
    }
  }, {
    key: '_seek',
    value: function _seek(time) {
      this._video.currentTime = typeof time !== 'undefined' ? time : this._video.currentTime;
    }
  }, {
    key: '_unmute',
    value: function _unmute() {
      this._video.muted = false;
    }
  }, {
    key: '_mute',
    value: function _mute() {
      this._video.muted = true;
    }
  }, {
    key: '_toggleMute',
    value: function _toggleMute() {
      if (!this.state.muted) {
        this._mute();
      } else {
        this._unmute();
      }
    }
  }, {
    key: '_fullscreen',
    value: function _fullscreen() {
      if (this._video.requestFullscreen) {
        this._video.requestFullscreen();
      } else if (this._video.msRequestFullscreen) {
        this._video.msRequestFullscreen();
      } else if (this._video.mozRequestFullScreen) {
        this._video.mozRequestFullScreen();
      } else if (this._video.webkitRequestFullscreen) {
        this._video.webkitRequestFullscreen();
      } else {
        console.warn('Your browser doesn\'t support fullscreen.');
      }
    }
  }, {
    key: '_onInterationStart',
    value: function _onInterationStart() {
      this.setState({ interacting: true });
    }
  }, {
    key: '_onInteractionOver',
    value: function _onInteractionOver() {
      var focus = this.state.focus;

      if (!focus) {
        this.setState({ interacting: false });
      }
    }
  }, {
    key: '_renderControls',
    value: function _renderControls() {
      var _this3 = this;

      var extendedProps = _extends({
        title: this.props.title,
        togglePlay: this._togglePlay,
        toggleMute: this._toggleMute,
        play: this._play,
        pause: this._pause,
        mute: this._mute,
        unmute: this._unmute,
        seek: this._seek,
        timeline: this.props.timeline,
        fullscreen: this._fullscreen,
        shareLink: this.props.shareLink,
        shareHeadline: this.props.shareHeadline,
        shareText: this.props.shareText,
        allowFullScreen: this.props.allowFullScreen,
        size: this.props.size
      }, this.state);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Overlay2.default, extendedProps),
        _react2.default.createElement(_Controls2.default, _extends({ ref: function ref(_ref) {
            return _this3._controlRef = _ref;
          }
        }, extendedProps))
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this4 = this;

      var _props = this.props,
          align = _props.align,
          autoPlay = _props.autoPlay,
          className = _props.className,
          colorIndex = _props.colorIndex,
          fit = _props.fit,
          full = _props.full,
          loop = _props.loop,
          muted = _props.muted,
          poster = _props.poster,
          showControls = _props.showControls,
          size = _props.size;
      var _state = this.state,
          ended = _state.ended,
          hasPlayed = _state.hasPlayed,
          interacting = _state.interacting,
          mouseActive = _state.mouseActive,
          playing = _state.playing;

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--' + fit, fit), _defineProperty(_classnames, CLASS_ROOT + '--full', fit || full), _defineProperty(_classnames, CLASS_ROOT + '--interacting', interacting), _defineProperty(_classnames, CLASS_ROOT + '--playing', playing), _defineProperty(_classnames, CLASS_ROOT + '--hasPlayed', hasPlayed), _defineProperty(_classnames, CLASS_ROOT + '--ended', ended), _defineProperty(_classnames, BACKGROUND_COLOR_INDEX + '--' + colorIndex, colorIndex), _defineProperty(_classnames, CLASS_ROOT + '--align-top', align && align.top), _defineProperty(_classnames, CLASS_ROOT + '--align-bottom', align && align.bottom), _defineProperty(_classnames, CLASS_ROOT + '--align-left', align && align.left), _defineProperty(_classnames, CLASS_ROOT + '--align-right', align && align.right), _classnames), className);
      var restProps = _Props2.default.omit(this.props, Object.keys(Video.propTypes));

      return _react2.default.createElement(
        'div',
        { className: classes, ref: function ref(_ref2) {
            return _this4._containerRef = _ref2;
          },
          onMouseEnter: function onMouseEnter() {
            if (!ended) {
              _this4._onInterationStart();
            }
          },
          onMouseMove: function onMouseMove(event) {
            // needed to avoid react synthatic event pooling
            event.persist();
            if (!ended || (0, _reactDom.findDOMNode)(_this4._controlRef).contains(event.target)) {
              _this4._onInterationStart();
            } else if (ended) {
              _this4._onInteractionOver();
            }
            clearTimeout(_this4._moveTimer);
            _this4._moveTimer = setTimeout(function () {
              var element = (0, _reactDom.findDOMNode)(_this4._controlRef);
              if (element && !element.contains(event.target)) {
                _this4._onInteractionOver();
              }
            }, 1000);
          },
          onMouseLeave: this._onInteractionOver,
          onMouseDown: function onMouseDown() {
            _this4.setState({ mouseActive: true });
          },
          onMouseUp: function onMouseUp() {
            _this4.setState({ mouseActive: false });
          },
          onFocus: function onFocus() {
            if (mouseActive === false) {
              _this4._onInterationStart();
              _this4.setState({ focus: true });
            }
          },
          onBlur: function onBlur() {
            _this4.setState({ focus: false }, function () {
              if (!_this4._containerRef.contains(document.activeElement)) {
                _this4._onInteractionOver();
              }
            });
          } },
        _react2.default.createElement(
          'video',
          _extends({ ref: function ref(el) {
              return _this4._video = el;
            } }, restProps, {
            poster: poster, autoPlay: autoPlay ? 'autoplay' : false,
            loop: loop ? 'loop' : false, muted: muted }, this._mediaEventProps),
          this.props.children
        ),
        showControls ? this._renderControls() : undefined
      );
    }
  }]);

  return Video;
}(_react.Component);

Video.displayName = 'Video';
exports.default = Video;


Video.propTypes = {
  align: _propTypes2.default.shape({
    bottom: _propTypes2.default.boolean,
    left: _propTypes2.default.boolean,
    right: _propTypes2.default.boolean,
    top: _propTypes2.default.boolean
  }),
  allowFullScreen: _propTypes2.default.bool,
  autoPlay: _propTypes2.default.bool,
  colorIndex: _propTypes2.default.string,
  fit: _propTypes2.default.oneOf(['contain', 'cover']),
  full: _propTypes2.default.oneOf([true, 'horizontal', 'vertical', false]),
  loop: _propTypes2.default.bool,
  muted: _propTypes2.default.bool,
  poster: _propTypes2.default.string,
  shareLink: _propTypes2.default.string,
  shareHeadline: _propTypes2.default.string,
  shareText: _propTypes2.default.string,
  showControls: _propTypes2.default.bool,
  size: _propTypes2.default.oneOf(['small', 'medium', 'large']),
  timeline: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.string,
    time: _propTypes2.default.number
  })),
  title: _propTypes2.default.node
};

Video.defaultProps = {
  allowFullScreen: true,
  autoPlay: false,
  loop: false,
  muted: false,
  size: 'medium',
  showControls: true
};
module.exports = exports['default'];