var _excluded = ["alignSelf", "autoPlay", "children", "controls", "gridArea", "loop", "margin", "messages", "mute", "onDurationChange", "onEnded", "onPause", "onPlay", "onTimeUpdate", "onVolumeChange", "skipInterval"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { forwardRef, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { defaultProps } from '../../default-props';
import { AnnounceContext } from '../../contexts/AnnounceContext';
import { Box } from '../Box';
import { Button } from '../Button';
import { Menu } from '../Menu';
import { Meter } from '../Meter';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Keyboard } from '../Keyboard';
import { containsFocus, useForwardedRef } from '../../utils';
import { StyledVideo, StyledVideoContainer, StyledVideoControls, StyledVideoScrubber } from './StyledVideo';
import { MessageContext } from '../../contexts/MessageContext';
import { VideoPropTypes } from './propTypes';

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
var Video = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var alignSelf = _ref.alignSelf,
    autoPlay = _ref.autoPlay,
    children = _ref.children,
    controlsProp = _ref.controls,
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
    skipInterval = _ref.skipInterval,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var theme = useContext(ThemeContext) || defaultProps.theme;
  var _useContext = useContext(MessageContext),
    format = _useContext.format;
  var announce = useContext(AnnounceContext);
  var _useState = useState([]),
    captions = _useState[0],
    setCaptions = _useState[1];
  var _useState2 = useState(),
    currentTime = _useState2[0],
    setCurrentTime = _useState2[1];
  var _useState3 = useState(),
    duration = _useState3[0],
    setDuration = _useState3[1];
  var _useState4 = useState(),
    percentagePlayed = _useState4[0],
    setPercentagePlayed = _useState4[1];
  var _useState5 = useState(false),
    playing = _useState5[0],
    setPlaying = _useState5[1];
  var _useState6 = useState(false),
    announceAudioDescription = _useState6[0],
    setAnnounceAudioDescription = _useState6[1];
  var _useState7 = useState(),
    scrubTime = _useState7[0],
    setScrubTime = _useState7[1];
  var _useState8 = useState(),
    volume = _useState8[0],
    setVolume = _useState8[1];
  var _useState9 = useState(false),
    hasPlayed = _useState9[0],
    setHasPlayed = _useState9[1];
  var _useState10 = useState(),
    interacting = _useState10[0],
    setInteracting = _useState10[1];
  var _useState11 = useState(),
    height = _useState11[0],
    setHeight = _useState11[1];
  var _useState12 = useState(),
    width = _useState12[0],
    setWidth = _useState12[1];
  var containerRef = useRef();
  var scrubberRef = useRef();
  var videoRef = useForwardedRef(ref);
  var controls = useMemo(function () {
    var result;
    if (typeof controlsProp === 'string' || typeof controlsProp === 'boolean') {
      result = {
        items: ['volume', 'fullScreen'],
        position: controlsProp
      };
    } else {
      result = {
        items: (controlsProp == null ? void 0 : controlsProp.items) || ['volume', 'fullScreen'],
        position: (controlsProp == null ? void 0 : controlsProp.position) || 'over'
      };
    }
    return result;
  }, [controlsProp]);

  // mute if needed
  useEffect(function () {
    var video = videoRef.current;
    if (video && mute) video.muted = true;
  }, [mute, videoRef]);

  // when the video is first rendered, set state from it where needed
  useEffect(function () {
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
  }, [videoRef]);

  // turn off interacting after a while
  useEffect(function () {
    var timer = setTimeout(function () {
      if (interacting && !containsFocus(containerRef.current)) {
        setInteracting(false);
      }
    }, 3000);
    return function () {
      return clearTimeout(timer);
    };
  }, [interacting]);

  // track which audio description track is active
  var _useState13 = useState(),
    activeTrack = _useState13[0],
    setActiveTrack = _useState13[1];
  useLayoutEffect(function () {
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
      }

      // remember the state of the text tracks for subsequent rendering
      var textTracks = video.textTracks;
      var nextCaptions = [];
      var set = false;
      // iterate through all of the tracks provided
      var _loop = function _loop() {
        var track = textTracks[i];
        var active = track.mode === 'showing';
        var getActiveTrack = function getActiveTrack(currentVideoTime) {
          var nextActiveTrack;
          for (var j = 0; j < track.cues.length; j += 1) {
            var _track$cues$j, _track$cues$j2;
            if (currentVideoTime > (track == null || (_track$cues$j = track.cues[j]) == null ? void 0 : _track$cues$j.startTime) && currentVideoTime < (track == null || (_track$cues$j2 = track.cues[j]) == null ? void 0 : _track$cues$j2.endTime)) {
              var _track$cues$j3;
              nextActiveTrack = track == null || (_track$cues$j3 = track.cues[j]) == null ? void 0 : _track$cues$j3.text;
            }
          }
          return nextActiveTrack;
        };

        // track is an audio description
        if (track.kind === 'descriptions') {
          if (announceAudioDescription) {
            video.ontimeupdate = function () {
              var nextActiveTrack = getActiveTrack(video.currentTime);
              if (activeTrack !== nextActiveTrack) {
                if (nextActiveTrack) {
                  announce(nextActiveTrack, 'assertive');
                }
                setActiveTrack(nextActiveTrack);
              }
            };
          }
        }

        // otherwise treat as captions
        else {
          nextCaptions.push({
            label: track.label,
            active: active
          });
          if (!captions || !captions[i] || captions[i].active !== active) {
            set = true;
          }
          if (set) {
            setCaptions(nextCaptions);
          }
        }
      };
      for (var i = 0; i < textTracks.length; i += 1) {
        _loop();
      }
    }
  }, [activeTrack, announce, announceAudioDescription, captions, height, videoRef, width]);
  var play = useCallback(function () {
    return videoRef.current.play();
  }, [videoRef]);
  var pause = useCallback(function () {
    return videoRef.current.pause();
  }, [videoRef]);
  var scrub = useCallback(function (event) {
    if (scrubberRef.current) {
      var scrubberRect = scrubberRef.current.getBoundingClientRect();
      var percent = (event.clientX - scrubberRect.left) / scrubberRect.width;
      setScrubTime(duration * percent);
    }
  }, [duration]);
  var seek = useCallback(function (event) {
    if (scrubberRef.current) {
      var scrubberRect = scrubberRef.current.getBoundingClientRect();
      var percent = (event.clientX - scrubberRect.left) / scrubberRect.width;
      if (duration) videoRef.current.currentTime = duration * percent;
    }
  }, [duration, videoRef]);
  var seekForward = useCallback(function () {
    setInteracting(true);
    videoRef.current.currentTime += skipInterval || theme.video.scrubber.interval;
  }, [skipInterval, theme.video.scrubber.interval, videoRef]);
  var seekBackward = useCallback(function () {
    setInteracting(true);
    videoRef.current.currentTime -= skipInterval || theme.video.scrubber.interval;
  }, [skipInterval, theme.video.scrubber.interval, videoRef]);
  var louder = useCallback(function () {
    videoRef.current.volume += VOLUME_STEP;
  }, [videoRef]);
  var quieter = useCallback(function () {
    videoRef.current.volume -= VOLUME_STEP;
  }, [videoRef]);
  var showCaptions = useCallback(function (index) {
    var textTracks = videoRef.current.textTracks;
    for (var i = 0; i < textTracks.length; i += 1) textTracks[i].mode = i === index ? 'showing' : 'hidden';
  }, [videoRef]);
  var fullscreen = useCallback(function () {
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
  if (controls != null && controls.position) {
    var _controls$items;
    var over = controls.position === 'over';
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
      Volume: theme.video.icons.volume,
      Description: theme.video.icons.description
    };
    var captionControls = captions.map(function (caption, index) {
      return {
        icon: caption.label ? undefined : /*#__PURE__*/React.createElement(Icons.ClosedCaption, {
          color: iconColor
        }),
        label: caption.label,
        active: caption.active,
        a11yTitle: caption.label || format({
          id: 'video.captions',
          messages: messages
        }),
        onClick: function onClick() {
          showCaptions(caption.active ? -1 : index);
          var updatedCaptions = [];
          for (var i = 0; i < captions.length; i += 1) {
            updatedCaptions.push(captions[i]);
            // set other captions to active=false
            if (i !== index && updatedCaptions[i].active) updatedCaptions[i].active = false;
            // set the currently selected captions to active
            else if (i === index) updatedCaptions[i].active = !captions[index].active;
          }
          setCaptions(updatedCaptions);
        }
      };
    });
    var descriptionControls = {
      icon: /*#__PURE__*/React.createElement(Icons.Description, {
        color: iconColor
      }),
      a11yTitle: format({
        id: 'video.audioDescriptions',
        messages: messages
      }),
      active: announceAudioDescription,
      onClick: function onClick() {
        return setAnnounceAudioDescription(!announceAudioDescription);
      }
    };
    var volumeControls = ['volume', 'reduceVolume'].map(function (control) {
      return {
        icon: control === 'volume' ? /*#__PURE__*/React.createElement(Icons.Volume, {
          color: iconColor
        }) : /*#__PURE__*/React.createElement(Icons.ReduceVolume, {
          color: iconColor
        }),
        a11yTitle: format({
          id: control === 'volume' ? 'video.volumeUp' : 'video.volumeDown',
          messages: messages
        }),
        onClick: function onClick() {
          if (volume <= 1 - VOLUME_STEP && control === 'volume') {
            return louder();
          }
          if (volume >= VOLUME_STEP && control === 'reduceVolume') {
            return quieter();
          }
          return undefined;
        },
        close: false
      };
    });
    var buttonProps = {
      captions: captionControls,
      descriptions: descriptionControls,
      volume: volumeControls,
      fullScreen: {
        icon: /*#__PURE__*/React.createElement(Icons.FullScreen, {
          color: iconColor
        }),
        a11yTitle: format({
          id: 'video.fullScreen',
          messages: messages
        }),
        onClick: fullscreen
      },
      pause: {
        icon: /*#__PURE__*/React.createElement(Icons.Pause, {
          color: iconColor
        }),
        a11yTitle: format({
          id: 'video.pauseButton',
          messages: messages
        }),
        disabled: !playing,
        onClick: pause
      },
      play: {
        icon: /*#__PURE__*/React.createElement(Icons.Play, {
          color: iconColor
        }),
        a11yTitle: format({
          id: 'video.playButton',
          messages: messages
        }),
        disabled: playing,
        onClick: play
      }
    };
    var controlsMenuItems = [];
    (_controls$items = controls.items) == null || _controls$items.map(function (item) {
      if (item === 'volume') {
        volumeControls.map(function (control) {
          return controlsMenuItems.push(control);
        });
        return undefined;
      }
      if (item === 'captions' && typeof buttonProps[item] === 'object') {
        for (var i = 0; i < buttonProps[item].length; i += 1) controlsMenuItems.push(buttonProps[item][i]);
        return undefined;
      }
      if (item === 'descriptions') {
        controlsMenuItems.push(buttonProps[item]);
        return undefined;
      }
      if (typeof item === 'string') {
        return controlsMenuItems.push(buttonProps[item]);
      }
      return controlsMenuItems.push(item);
    });
    controlsElement = /*#__PURE__*/React.createElement(StyledVideoControls, {
      over: over,
      active: !hasPlayed || controls.position === 'below' || over && interacting,
      onBlur: function onBlur() {
        if (!containsFocus(containerRef.current)) setInteracting(false);
      }
    }, /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      align: "center",
      justify: "between",
      background: background
    }, /*#__PURE__*/React.createElement(Button, {
      icon: playing ? /*#__PURE__*/React.createElement(Icons.Pause, {
        color: iconColor,
        a11yTitle: format({
          id: 'video.pauseButton',
          messages: messages
        })
      }) : /*#__PURE__*/React.createElement(Icons.Play, {
        color: iconColor,
        a11yTitle: format({
          id: 'video.playButton',
          messages: messages
        })
      }),
      hoverIndicator: "background",
      onClick: playing ? pause : play,
      onFocus: function onFocus() {
        return setInteracting(true);
      }
    }), /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      align: "center",
      flex: true
    }, /*#__PURE__*/React.createElement(Box, {
      flex: true
    }, /*#__PURE__*/React.createElement(Stack, null, /*#__PURE__*/React.createElement(Meter, {
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
    }), /*#__PURE__*/React.createElement(StyledVideoScrubber, {
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
      onClick: seek,
      onFocus: function onFocus() {
        return setInteracting(true);
      }
    }))), /*#__PURE__*/React.createElement(Box, {
      pad: {
        horizontal: 'small'
      }
    }, /*#__PURE__*/React.createElement(Text, {
      margin: "none"
    }, formattedTime))), /*#__PURE__*/React.createElement(Menu, {
      icon: /*#__PURE__*/React.createElement(Icons.Configure, {
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
      items: [].concat(controlsMenuItems),
      onFocus: function onFocus() {
        return setInteracting(true);
      }
    })));
  }
  var mouseEventListeners;
  if ((controls == null ? void 0 : controls.position) === 'over') {
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
  if (rest.fit === 'contain' && (controls == null ? void 0 : controls.position) === 'over') {
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
  return /*#__PURE__*/React.createElement(Keyboard, {
    onLeft: seekBackward,
    onRight: seekForward
  }, /*#__PURE__*/React.createElement(StyledVideoContainer, _extends({
    ref: containerRef
  }, mouseEventListeners, {
    alignSelf: alignSelf,
    gridArea: gridArea,
    margin: margin,
    style: style,
    tabIndex: "-1"
  }), /*#__PURE__*/React.createElement(StyledVideo, _extends({}, rest, {
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
  }), children), controlsElement));
});
Video.defaultProps = {};
Video.displayName = 'Video';
Video.propTypes = VideoPropTypes;
export { Video };