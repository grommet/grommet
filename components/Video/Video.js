"use strict";

exports.__esModule = true;
exports.Video = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _useIsomorphicLayoutEffect = require("../../utils/use-isomorphic-layout-effect");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Button = require("../Button");

var _Menu = require("../Menu");

var _Meter = require("../Meter");

var _Stack = require("../Stack");

var _Text = require("../Text");

var _utils = require("../../utils");

var _StyledVideo = require("./StyledVideo");

var _MessageContext = require("../../contexts/MessageContext");

var _propTypes = require("./propTypes");

var _excluded = ["alignSelf", "autoPlay", "children", "controls", "gridArea", "loop", "margin", "messages", "mute", "onDurationChange", "onEnded", "onPause", "onPlay", "onTimeUpdate", "onVolumeChange"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var Video = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var alignSelf = _ref.alignSelf,
      autoPlay = _ref.autoPlay,
      children = _ref.children,
      _ref$controls = _ref.controls,
      controls = _ref$controls === void 0 ? 'over' : _ref$controls,
      gridArea = _ref.gridArea,
      loop = _ref.loop,
      margin = _ref.margin,
      messages = _ref.messages,
      mute = _ref.mute,
      _onDurationChange = _ref.onDurationChange,
      _onEnded = _ref.onEnded,
      _onPause = _ref.onPause,
      _onPlay = _ref.onPlay,
      _onTimeUpdate = _ref.onTimeUpdate,
      _onVolumeChange = _ref.onVolumeChange,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
      format = _useContext.format;

  var _useState = (0, _react.useState)([]),
      captions = _useState[0],
      setCaptions = _useState[1];

  var _useState2 = (0, _react.useState)(),
      currentTime = _useState2[0],
      setCurrentTime = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      duration = _useState3[0],
      setDuration = _useState3[1];

  var _useState4 = (0, _react.useState)(),
      percentagePlayed = _useState4[0],
      setPercentagePlayed = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      playing = _useState5[0],
      setPlaying = _useState5[1];

  var _useState6 = (0, _react.useState)(),
      scrubTime = _useState6[0],
      setScrubTime = _useState6[1];

  var _useState7 = (0, _react.useState)(),
      volume = _useState7[0],
      setVolume = _useState7[1];

  var _useState8 = (0, _react.useState)(false),
      hasPlayed = _useState8[0],
      setHasPlayed = _useState8[1];

  var _useState9 = (0, _react.useState)(),
      interacting = _useState9[0],
      setInteracting = _useState9[1];

  var _useState10 = (0, _react.useState)(),
      height = _useState10[0],
      setHeight = _useState10[1];

  var _useState11 = (0, _react.useState)(),
      width = _useState11[0],
      setWidth = _useState11[1];

  var containerRef = (0, _react.useRef)();
  var scrubberRef = (0, _react.useRef)();
  var videoRef = (0, _utils.useForwardedRef)(ref); // mute if needed

  (0, _react.useEffect)(function () {
    var video = videoRef.current;
    if (video && mute) video.muted = true;
  }, [mute, videoRef]); // when the video is first rendered, set state from it where needed

  (0, _react.useEffect)(function () {
    var video = videoRef.current;

    if (video) {
      // hide all captioning to start with
      var textTracks = video.textTracks;

      for (var i = 0; i < textTracks.length; i += 1) {
        textTracks[i].mode = 'hidden';
      }

      setCurrentTime(video.currentTime);
      setPercentagePlayed(video.currentTime / video.duration * 100);
      setVolume(videoRef.current.volume);
    }
  }, [videoRef]); // turn off interacting after a while

  (0, _react.useEffect)(function () {
    var timer = setTimeout(function () {
      if (interacting && !(0, _utils.containsFocus)(containerRef.current)) {
        setInteracting(false);
      }
    }, 3000);
    return function () {
      return clearTimeout(timer);
    };
  }, [interacting]);
  (0, _useIsomorphicLayoutEffect.useLayoutEffect)(function () {
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
            setHeight(nextHeight);
            setWidth(undefined);
          }
        } else {
          var nextWidth = rect.height * videoRatio;

          if (nextWidth !== width) {
            setHeight(undefined);
            setWidth(nextWidth);
          }
        }
      } // remember the state of the text tracks for subsequent rendering


      var textTracks = video.textTracks;

      if (textTracks.length > 0) {
        if (textTracks.length === 1) {
          var active = textTracks[0].mode === 'showing';

          if (!captions || !captions[0] || captions[0].active !== active) {
            setCaptions([{
              active: active
            }]);
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
            setCaptions(nextCaptions);
          }
        }
      }
    }
  }, [captions, height, videoRef, width]);
  var play = (0, _react.useCallback)(function () {
    return videoRef.current.play();
  }, [videoRef]);
  var pause = (0, _react.useCallback)(function () {
    return videoRef.current.pause();
  }, [videoRef]);
  var scrub = (0, _react.useCallback)(function (event) {
    if (scrubberRef.current) {
      var scrubberRect = scrubberRef.current.getBoundingClientRect();
      var percent = (event.clientX - scrubberRect.left) / scrubberRect.width;
      setScrubTime(duration * percent);
    }
  }, [duration]);
  var seek = (0, _react.useCallback)(function (event) {
    if (scrubberRef.current) {
      var scrubberRect = scrubberRef.current.getBoundingClientRect();
      var percent = (event.clientX - scrubberRect.left) / scrubberRect.width;
      if (duration) videoRef.current.currentTime = duration * percent;
    }
  }, [duration, videoRef]);
  var louder = (0, _react.useCallback)(function () {
    videoRef.current.volume += VOLUME_STEP;
  }, [videoRef]);
  var quieter = (0, _react.useCallback)(function () {
    videoRef.current.volume -= VOLUME_STEP;
  }, [videoRef]);

  var showCaptions = function showCaptions(index) {
    var textTracks = videoRef.current.textTracks;

    for (var i = 0; i < textTracks.length; i += 1) {
      textTracks[i].mode = i === index ? 'showing' : 'hidden';
    }
  };

  var fullscreen = (0, _react.useCallback)(function () {
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
      console.warn("This browser doesn't support fullscreen.");
    }
  }, [videoRef]);
  var controlsElement;

  if (controls) {
    var over = controls === 'over';
    var background = over ? theme.video.controls && theme.video.controls.background || {
      color: 'background-back',
      opacity: 'strong',
      dark: true
    } : undefined;
    var iconColor = over && (theme.video.icons.color || 'text');
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
        icon: caption.label ? undefined : /*#__PURE__*/_react["default"].createElement(Icons.ClosedCaption, {
          color: iconColor
        }),
        label: caption.label,
        active: caption.active,
        onClick: function onClick() {
          return showCaptions(caption.active ? -1 : 0);
        }
      };
    });
    controlsElement = /*#__PURE__*/_react["default"].createElement(_StyledVideo.StyledVideoControls, {
      over: over,
      active: !hasPlayed || controls === 'below' || over && interacting,
      onBlur: function onBlur() {
        if (!(0, _utils.containsFocus)(containerRef.current)) setInteracting(false);
      }
    }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      direction: "row",
      align: "center",
      justify: "between",
      background: background
    }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      icon: playing ? /*#__PURE__*/_react["default"].createElement(Icons.Pause, {
        color: iconColor,
        a11yTitle: format({
          id: 'video.pauseButton',
          messages: messages
        })
      }) : /*#__PURE__*/_react["default"].createElement(Icons.Play, {
        color: iconColor,
        a11yTitle: format({
          id: 'video.playButton',
          messages: messages
        })
      }),
      hoverIndicator: "background",
      onClick: playing ? pause : play
    }), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      direction: "row",
      align: "center",
      flex: true
    }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      flex: true
    }, /*#__PURE__*/_react["default"].createElement(_Stack.Stack, null, /*#__PURE__*/_react["default"].createElement(_Meter.Meter, {
      "aria-label": format({
        id: 'video.progressMeter',
        messages: messages
      }),
      background: over ? theme.video.scrubber && theme.video.scrubber.track && theme.video.scrubber.track.color || 'dark-3' : undefined,
      size: "full",
      thickness: "small",
      values: [{
        value: percentagePlayed || 0
      }]
    }), /*#__PURE__*/_react["default"].createElement(_StyledVideo.StyledVideoScrubber, {
      "aria-label": format({
        id: 'video.scrubber',
        messages: messages
      }),
      ref: scrubberRef,
      tabIndex: 0,
      role: "button",
      value: scrubTime ? Math.round(scrubTime / duration * 100) : undefined,
      onMouseMove: scrub,
      onMouseLeave: function onMouseLeave() {
        return setScrubTime(undefined);
      },
      onClick: seek
    }))), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      pad: {
        horizontal: 'small'
      }
    }, /*#__PURE__*/_react["default"].createElement(_Text.Text, {
      margin: "none"
    }, formattedTime))), /*#__PURE__*/_react["default"].createElement(_Menu.Menu, {
      icon: /*#__PURE__*/_react["default"].createElement(Icons.Configure, {
        color: iconColor
      }),
      dropAlign: {
        bottom: 'top',
        right: 'right'
      },
      dropBackground: background,
      messages: {
        openMenu: format({
          id: 'video.openMenu',
          messages: messages
        }),
        closeMenu: format({
          id: 'video.closeMenu',
          messages: messages
        })
      },
      items: [{
        icon: /*#__PURE__*/_react["default"].createElement(Icons.Volume, {
          color: iconColor,
          a11yTitle: format({
            id: 'video.volumeUp',
            messages: messages
          })
        }),
        onClick: volume <= 1 - VOLUME_STEP ? louder : undefined,
        close: false
      }, {
        icon: /*#__PURE__*/_react["default"].createElement(Icons.ReduceVolume, {
          color: iconColor,
          a11yTitle: format({
            id: 'video.volumeDown',
            messages: messages
          })
        }),
        onClick: volume >= VOLUME_STEP ? quieter : undefined,
        close: false
      }].concat(captionControls, [{
        icon: /*#__PURE__*/_react["default"].createElement(Icons.FullScreen, {
          color: iconColor,
          a11yTitle: format({
            id: 'video.fullScreen',
            messages: messages
          })
        }),
        onClick: fullscreen
      }])
    })));
  }

  var mouseEventListeners;

  if (controls === 'over') {
    mouseEventListeners = {
      onMouseEnter: function onMouseEnter() {
        return setInteracting(true);
      },
      onMouseMove: function onMouseMove() {
        return setInteracting(true);
      },
      onTouchStart: function onTouchStart() {
        return setInteracting(true);
      }
    };
  }

  var style;

  if (rest.fit === 'contain' && controls === 'over') {
    // constrain the size to fit the aspect ratio so the controls
    // overlap correctly
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

  return /*#__PURE__*/_react["default"].createElement(_StyledVideo.StyledVideoContainer, _extends({
    ref: containerRef
  }, mouseEventListeners, {
    alignSelf: alignSelf,
    gridArea: gridArea,
    margin: margin,
    style: style
  }), /*#__PURE__*/_react["default"].createElement(_StyledVideo.StyledVideo, _extends({}, rest, {
    ref: videoRef,
    onDurationChange: function onDurationChange(event) {
      var video = videoRef.current;
      setDuration(video.duration);
      setPercentagePlayed(video.currentTime / video.duration * 100);
      if (_onDurationChange) _onDurationChange(event);
    },
    onEnded: function onEnded(event) {
      setPlaying(false);
      if (_onEnded) _onEnded(event);
    },
    onPause: function onPause(event) {
      setPlaying(false);
      if (_onPause) _onPause(event);
    },
    onPlay: function onPlay(event) {
      setPlaying(true);
      setHasPlayed(true);
      if (_onPlay) _onPlay(event);
    },
    onTimeUpdate: function onTimeUpdate(event) {
      var video = videoRef.current;
      setCurrentTime(video.currentTime);
      setPercentagePlayed(video.currentTime / video.duration * 100);
      if (_onTimeUpdate) _onTimeUpdate(event);
    },
    onVolumeChange: function onVolumeChange(event) {
      setVolume(videoRef.current.volume);
      if (_onVolumeChange) _onVolumeChange(event);
    },
    autoPlay: autoPlay || false,
    loop: loop || false
  }), children), controlsElement);
});
exports.Video = Video;
Video.defaultProps = {};
Video.displayName = 'Video';
Video.propTypes = _propTypes.VideoPropTypes;