'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Controls = require('./video/Controls');

var _Controls2 = _interopRequireDefault(_Controls);

var _Overlay = require('./video/Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _Throttle = require('../utils/Throttle');

var _Throttle2 = _interopRequireDefault(_Throttle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.VIDEO; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var BACKGROUND_COLOR_INDEX = _CSSClassnames2.default.BACKGROUND_COLOR_INDEX;

var Video = function (_Component) {
  (0, _inherits3.default)(Video, _Component);

  function Video(props, context) {
    (0, _classCallCheck3.default)(this, Video);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Video.__proto__ || (0, _getPrototypeOf2.default)(Video)).call(this, props, context));

    _this._hasPlayed = false;
    _this._play = _this._play.bind(_this);
    _this._pause = _this._pause.bind(_this);
    _this._togglePlay = _this._togglePlay.bind(_this);
    _this._toggleMute = _this._toggleMute.bind(_this);
    _this._seek = _this._seek.bind(_this);
    _this._mute = _this._mute.bind(_this);
    _this._unmute = _this._unmute.bind(_this);
    _this._fullscreen = _this._fullscreen.bind(_this);
    _this._onMouseMove = _this._onMouseMove.bind(_this);

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Video, [{
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
        previousValue[currentValue] = function () {
          if (currentValue in _this2.props && typeof _this2.props[currentValue] === 'function') {
            _this2.props[currentValue]();
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

      this.setState({
        duration: this._video.duration,
        currentTime: this._video.currentTime,
        buffered: this._video.buffered,
        paused: this._video.paused,
        muted: this._video.muted,
        volume: this._video.volume,
        ended: this._video.ended,
        readyState: this._video.readyState,

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
      this._video.currentTime = time || this._video.currentTime;
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
    key: '_onMouseMove',
    value: function _onMouseMove() {
      var _this3 = this;

      this.setState({ interacting: true });
      clearTimeout(this._moveTimer);
      this._moveTimer = setTimeout(function () {
        _this3.setState({ interacting: false });
      }, 1000);
    }
  }, {
    key: '_renderControls',
    value: function _renderControls() {
      var extendedProps = (0, _assign2.default)({
        title: this.props.title,
        togglePlay: this._togglePlay,
        toggleMute: this._toggleMute,
        play: this._play,
        pause: this._pause,
        mute: this._mute,
        unmute: this._unmute,
        seek: this._seek,
        fullscreen: this._fullscreen,
        shareLink: this.props.shareLink,
        shareHeadline: this.props.shareHeadline,
        shareText: this.props.shareText,
        allowFullScreen: this.props.allowFullScreen
      }, this.state);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Overlay2.default, extendedProps),
        _react2.default.createElement(_Controls2.default, extendedProps)
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var classes = [CLASS_ROOT];
      if (this.props.size) {
        classes.push(CLASS_ROOT + '--' + this.props.size);
      }
      if (this.props.full) {
        classes.push(CLASS_ROOT + '--full');
      }
      if (this.state.playing) {
        classes.push(CLASS_ROOT + '--playing');
      }
      if (this.state.interacting) {
        classes.push(CLASS_ROOT + '--interacting');
      }
      if (this.props.colorIndex) {
        classes.push(BACKGROUND_COLOR_INDEX + '-' + this.props.colorIndex);
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }
      if (this.state.hasPlayed) {
        classes.push(CLASS_ROOT + '--has-played');
      }
      if (this.state.ended) {
        classes.push(CLASS_ROOT + '--ended');
      }

      return _react2.default.createElement(
        'div',
        { className: classes.join(' '), onMouseMove: this._onMouseMove },
        _react2.default.createElement(
          'video',
          (0, _extends3.default)({ ref: function ref(el) {
              return _this4._video = el;
            },
            poster: this.props.poster,
            autoPlay: this.props.autoPlay ? 'autoplay' : false,
            loop: this.props.loop ? 'loop' : false,
            muted: this.props.muted
          }, this._mediaEventProps),
          this.props.children
        ),
        this.props.showControls ? this._renderControls() : undefined
      );
    }
  }]);
  return Video;
}(_react.Component);

Video.displayName = 'Video';
exports.default = Video;


Video.propTypes = {
  colorIndex: _react.PropTypes.string,
  full: _react.PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
  poster: _react.PropTypes.string,
  size: _react2.default.PropTypes.oneOf(['small', 'medium', 'large']),
  timeline: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
    time: _react.PropTypes.number
  })),
  title: _react.PropTypes.node,
  allowFullScreen: _react.PropTypes.bool,
  autoPlay: _react.PropTypes.bool,
  shareLink: _react.PropTypes.string,
  shareHeadline: _react.PropTypes.string,
  shareText: _react.PropTypes.string,
  showControls: _react.PropTypes.bool,
  muted: _react.PropTypes.bool,
  loop: _react.PropTypes.bool
};

Video.defaultProps = {
  allowFullScreen: true,
  autoPlay: false,
  loop: false,
  muted: false,
  showControls: true
};
module.exports = exports['default'];