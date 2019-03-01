"use strict";

exports.__esModule = true;
exports.Video = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _styledComponents = require("styled-components");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Button = require("../Button");

var _Menu = require("../Menu");

var _Meter = require("../Meter");

var _Stack = require("../Stack");

var _Text = require("../Text");

var _hocs = require("../hocs");

var _utils = require("../../utils");

var _StyledVideo = require("./StyledVideo");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Split the volume control into 6 segments. Empirically determined.
var VOLUME_STEP = 0.166667;

var formatTime = function formatTime(time) {
  var minutes = Math.round(time / 60);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  var seconds = Math.round(time) % 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return minutes + ":" + seconds;
};

var videoEvents = ['onAbort', 'onCanPlay', 'onCanPlayThrough', 'onDurationChange', 'onEmptied', 'onEncrypted', 'onEnded', 'onError', 'onLoadedData', 'onLoadedMetadata', 'onLoadStart', 'onPause', 'onPlay', 'onPlaying', 'onProgress', 'onRateChange', 'onSeeked', 'onSeeking', 'onStalled', 'onSuspend', 'onTimeUpdate', 'onVolumeChange', 'onWaiting'];

var Video =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Video, _Component);

  Video.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var forwardRef = nextProps.forwardRef;
    var videoRef = prevState.videoRef;
    var nextVideoRef = forwardRef || videoRef;

    if (nextVideoRef !== videoRef) {
      return {
        videoRef: nextVideoRef
      };
    }

    return null;
  };

  function Video(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      captions: [],
      scrubberRef: _react.default.createRef(),
      videoRef: _react.default.createRef()
    });

    _defineProperty(_assertThisInitialized(_this), "hasPlayed", false);

    _defineProperty(_assertThisInitialized(_this), "injectUpdateVideoEvents", function () {
      return videoEvents.reduce(function (previousValue, currentValue) {
        var nextValue = _extends({}, previousValue);

        nextValue[currentValue] = function (e) {
          if (currentValue in _this.props &&
          /* eslint-disable react/destructuring-assignment */
          typeof _this.props[currentValue] === 'function') {
            _this.props[currentValue](e);
            /* eslint-enable react/destructuring-assignment */

          }

          _this.update();
        };

        return nextValue;
      }, {});
    });

    _defineProperty(_assertThisInitialized(_this), "update", function () {
      var videoRef = _this.state.videoRef;
      var video = videoRef.current; // Set flag for Video first play

      if (!_this.hasPlayed && !video.paused && !video.loading || video.currentTime) {
        _this.hasPlayed = true;
      }

      var interacting = _this.state.interacting;

      if (video.ended) {
        interacting = false;
      }

      _this.setState({
        duration: video.duration,
        currentTime: video.currentTime,
        // buffered: video.buffered,
        // paused: video.paused,
        // muted: video.muted,
        volume: video.volume,
        // ended: video.ended,
        // readyState: video.readyState,
        interacting: interacting,
        // computed values
        // hasPlayed: this.hasPlayed,
        playing: !video.paused && !video.loading,
        // percentageBuffered: video.buffered.length &&
        //   (video.buffered.end(video.buffered.length - 1) /
        //   video.duration) * 100,
        percentagePlayed: video.currentTime / video.duration * 100 // loading: video.readyState < video.HAVE_ENOUGH_DATA,

      });
    });

    _defineProperty(_assertThisInitialized(_this), "play", function () {
      var videoRef = _this.state.videoRef;
      videoRef.current.play();
    });

    _defineProperty(_assertThisInitialized(_this), "pause", function () {
      var videoRef = _this.state.videoRef;
      videoRef.current.pause();
    });

    _defineProperty(_assertThisInitialized(_this), "scrub", function (event) {
      var _this$state = _this.state,
          duration = _this$state.duration,
          scrubberRef = _this$state.scrubberRef;

      if (scrubberRef.current) {
        var scrubberRect = scrubberRef.current.getBoundingClientRect();
        var percent = (event.clientX - scrubberRect.left) / scrubberRect.width;

        _this.setState({
          scrubTime: duration * percent
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "seek", function (event) {
      var _this$state2 = _this.state,
          duration = _this$state2.duration,
          scrubberRef = _this$state2.scrubberRef,
          videoRef = _this$state2.videoRef;

      if (scrubberRef.current) {
        var scrubberRect = scrubberRef.current.getBoundingClientRect();
        var percent = (event.clientX - scrubberRect.left) / scrubberRect.width;
        videoRef.current.currentTime = duration * percent;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "unmute", function () {
      var videoRef = _this.state.videoRef;

      if (videoRef.current) {
        videoRef.current.muted = false;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "mute", function () {
      var videoRef = _this.state.videoRef;

      if (videoRef.current) {
        videoRef.current.muted = true;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "louder", function () {
      var videoRef = _this.state.videoRef;
      videoRef.current.volume += VOLUME_STEP;
    });

    _defineProperty(_assertThisInitialized(_this), "quieter", function () {
      var videoRef = _this.state.videoRef;
      videoRef.current.volume -= VOLUME_STEP;
    });

    _defineProperty(_assertThisInitialized(_this), "showCaptions", function (index) {
      var videoRef = _this.state.videoRef;
      var textTracks = videoRef.current.textTracks;

      for (var i = 0; i < textTracks.length; i += 1) {
        textTracks[i].mode = i === index ? 'showing' : 'hidden';
      } // Using forceUpdate to force redraw of controls when changing captions


      _this.forceUpdate();
    });

    _defineProperty(_assertThisInitialized(_this), "fullscreen", function () {
      var videoRef = _this.state.videoRef;
      var video = videoRef.current;

      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else {
        console.warn("Your browser doesn't support fullscreen.");
      }
    });

    _defineProperty(_assertThisInitialized(_this), "interactionStart", function () {
      _this.setState({
        interacting: true
      });

      clearTimeout(_this.interactionTimer);
      _this.interactionTimer = setTimeout(_this.interactionStop, 3000);
    });

    _defineProperty(_assertThisInitialized(_this), "interactionStop", function () {
      var focus = _this.state.focus;

      if (!focus && !_this.unmounted) {
        _this.setState({
          interacting: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "restate", function () {
      var _this$state3 = _this.state,
          captions = _this$state3.captions,
          height = _this$state3.height,
          videoRef = _this$state3.videoRef,
          width = _this$state3.width;
      var video = videoRef.current;

      if (video) {
        if (video.videoHeight) {
          // set the size based on the video aspect ratio
          var rect = video.getBoundingClientRect();
          var ratio = rect.width / rect.height;
          var videoRatio = video.videoWidth / video.videoHeight;

          if (videoRatio > ratio) {
            var nextHeight = rect.width / videoRatio;

            if (nextHeight !== height) {
              _this.setState({
                height: nextHeight,
                width: undefined
              });
            }
          } else {
            var nextWidth = rect.height * videoRatio;

            if (nextWidth !== width) {
              _this.setState({
                height: undefined,
                width: nextWidth
              });
            }
          }
        } // remember the state of the text tracks for subsequent rendering


        var textTracks = video.textTracks;

        if (textTracks.length > 0) {
          if (textTracks.length === 1) {
            var active = textTracks[0].mode === 'showing';

            if (!captions || !captions[0] || captions[0].active !== active) {
              _this.setState({
                captions: [{
                  active: active
                }]
              });
            }
          } else {
            var nextCaptions = [];
            var set = false;

            for (var i = 0; i < textTracks.length; i += 1) {
              var track = textTracks[i];

              var _active = track.mode === 'showing';

              nextCaptions.push({
                label: track.label,
                active: _active
              });

              if (!captions || !captions[i] || captions[i].active !== _active) {
                set = true;
              }
            }

            if (set) {
              _this.setState({
                captions: nextCaptions
              });
            }
          }
        }
      }
    });

    _this.update = (0, _utils.throttle)(_this.update, 100, _assertThisInitialized(_this));
    _this.mediaEventProps = _this.injectUpdateVideoEvents();
    return _this;
  }

  var _proto = Video.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var mute = this.props.mute;
    var videoRef = this.state.videoRef;
    var video = videoRef.current;

    if (mute) {
      this.mute();
    }

    if (video) {
      // hide all captioning to start with
      var textTracks = video.textTracks;

      for (var i = 0; i < textTracks.length; i += 1) {
        textTracks[i].mode = 'hidden';
      }

      this.restate();
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var autoPlay = this.props.autoPlay;

    if (autoPlay && !prevProps.autoPlay) {
      // Caller wants the video to play now.
      this.play();
    }

    this.restate();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unmounted = true;
  };

  _proto.renderControls = function renderControls() {
    var _this2 = this;

    var _this$props = this.props,
        controls = _this$props.controls,
        theme = _this$props.theme;
    var _this$state4 = this.state,
        captions = _this$state4.captions,
        currentTime = _this$state4.currentTime,
        duration = _this$state4.duration,
        interacting = _this$state4.interacting,
        percentagePlayed = _this$state4.percentagePlayed,
        playing = _this$state4.playing,
        scrubberRef = _this$state4.scrubberRef,
        scrubTime = _this$state4.scrubTime,
        volume = _this$state4.volume;
    var over = controls === 'over';
    var background = over ? theme.video.controls && theme.video.controls.background || {
      color: 'dark-1',
      opacity: 'strong'
    } : undefined;
    var iconColor = over && (theme.video.icons.color || 'light-1');
    var formattedTime = formatTime(scrubTime || currentTime || duration);
    var Icons = {
      ClosedCaption: theme.video.icons.closedCaption,
      Configure: theme.video.icons.configure,
      FullScreen: theme.video.icons.fullScreen,
      Pause: theme.video.icons.pause,
      Play: theme.video.icons.play,
      ReduceVolume: theme.video.icons.reduceVolume,
      Volume: theme.video.icons.volume
    };
    var captionControls = captions.map(function (caption) {
      return {
        icon: caption.label ? undefined : _react.default.createElement(Icons.ClosedCaption, {
          color: iconColor
        }),
        label: caption.label,
        active: caption.active,
        onClick: function onClick() {
          return _this2.showCaptions(caption.active ? -1 : 0);
        }
      };
    });
    return _react.default.createElement(_StyledVideo.StyledVideoControls, {
      over: over,
      active: !this.hasPlayed || controls === 'below' || over && interacting
    }, _react.default.createElement(_Box.Box, {
      direction: "row",
      align: "center",
      justify: "between",
      background: background
    }, _react.default.createElement(_Button.Button, {
      icon: playing ? _react.default.createElement(Icons.Pause, {
        color: iconColor
      }) : _react.default.createElement(Icons.Play, {
        color: iconColor
      }),
      hoverIndicator: "background",
      onClick: playing ? this.pause : this.play
    }), _react.default.createElement(_Box.Box, {
      direction: "row",
      align: "center",
      flex: true
    }, _react.default.createElement(_Box.Box, {
      flex: true
    }, _react.default.createElement(_Stack.Stack, null, _react.default.createElement(_Meter.Meter, {
      "aria-label": "Video progress",
      background: over ? theme.video.scrubber && theme.video.scrubber.track && theme.video.scrubber.track.color || 'dark-3' : undefined,
      size: "full",
      thickness: "small",
      values: [{
        value: percentagePlayed || 0
      }]
    }), _react.default.createElement(_StyledVideo.StyledVideoScrubber, {
      ref: scrubberRef,
      tabIndex: 0,
      role: "button",
      value: scrubTime ? Math.round(scrubTime / duration * 100) : undefined,
      onMouseMove: this.scrub,
      onMouseLeave: function onMouseLeave() {
        return _this2.setState({
          scrubTime: undefined
        });
      },
      onClick: this.seek
    }))), _react.default.createElement(_Box.Box, {
      pad: {
        horizontal: 'small'
      }
    }, _react.default.createElement(_Text.Text, {
      margin: "none"
    }, formattedTime))), _react.default.createElement(_Menu.Menu, {
      icon: _react.default.createElement(Icons.Configure, {
        color: iconColor
      }),
      dropAlign: {
        bottom: 'top',
        right: 'right'
      },
      dropBackground: background,
      items: [{
        icon: _react.default.createElement(Icons.Volume, {
          color: iconColor
        }),
        onClick: volume <= 1 - VOLUME_STEP ? this.louder : undefined,
        close: false
      }, {
        icon: _react.default.createElement(Icons.ReduceVolume, {
          color: iconColor
        }),
        onClick: volume >= VOLUME_STEP ? this.quieter : undefined,
        close: false
      }].concat(captionControls, [{
        icon: _react.default.createElement(Icons.FullScreen, {
          color: iconColor
        }),
        onClick: this.fullscreen
      }])
    })));
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        alignSelf = _this$props2.alignSelf,
        autoPlay = _this$props2.autoPlay,
        children = _this$props2.children,
        controls = _this$props2.controls,
        gridArea = _this$props2.gridArea,
        loop = _this$props2.loop,
        margin = _this$props2.margin,
        theme = _this$props2.theme,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["alignSelf", "autoPlay", "children", "controls", "gridArea", "loop", "margin", "theme"]);

    var _this$state5 = this.state,
        height = _this$state5.height,
        videoRef = _this$state5.videoRef,
        width = _this$state5.width;
    var controlsElement = controls ? this.renderControls() : undefined;
    var mouseEventListeners;

    if (controls === 'over') {
      mouseEventListeners = {
        onMouseEnter: this.interactionStart,
        onMouseMove: this.interactionStart,
        onTouchStart: this.interactionStart
      };
    }

    var style;

    if (rest.fit === 'contain' && controls === 'over') {
      // constrain the size to fit the aspect ratio so the controls overlap correctly
      if (width) {
        style = {
          width: width
        };
      } else if (height) {
        style = {
          height: height
        };
      }
    }

    return _react.default.createElement(_StyledVideo.StyledVideoContainer, _extends({}, mouseEventListeners, {
      alignSelf: alignSelf,
      gridArea: gridArea,
      margin: margin,
      style: style
    }), _react.default.createElement(_StyledVideo.StyledVideo, _extends({}, rest, {
      ref: videoRef
    }, this.mediaEventProps, {
      autoPlay: autoPlay || false,
      loop: loop || false
    }), children), controlsElement);
  };

  return Video;
}(_react.Component);

_defineProperty(Video, "defaultProps", {
  controls: 'over'
});

Object.setPrototypeOf(Video.defaultProps, _defaultProps.defaultProps);
var VideoDoc;

if (process.env.NODE_ENV !== 'production') {
  VideoDoc = require('./doc').doc(Video); // eslint-disable-line global-require
}

var VideoWrapper = (0, _recompose.compose)(_styledComponents.withTheme, _hocs.withForwardRef)(VideoDoc || Video);
exports.Video = VideoWrapper;