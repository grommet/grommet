// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import Props from '../utils/Props';
import VideoControls from './video/Controls';
import VideoOverlay from './video/Overlay';
import throttle from '../utils/Throttle';

const CLASS_ROOT = CSSClassnames.VIDEO;
const BACKGROUND_COLOR_INDEX = CSSClassnames.BACKGROUND_COLOR_INDEX;

export default class Video extends Component {

  constructor(props, context) {
    super(props, context);

    this._hasPlayed = false;
    this._play = this._play.bind(this);
    this._pause = this._pause.bind(this);
    this._togglePlay = this._togglePlay.bind(this);
    this._toggleMute = this._toggleMute.bind(this);
    this._seek = this._seek.bind(this);
    this._mute = this._mute.bind(this);
    this._unmute = this._unmute.bind(this);
    this._fullscreen = this._fullscreen.bind(this);
    this._onInterationStart = this._onInterationStart.bind(this);
    this._onInteractionOver = this._onInteractionOver.bind(this);
    this._renderControls = this._renderControls.bind(this);

    this.state = {
      mouseActive: false
    };
  }

  componentWillMount () {
    this._update = throttle(this._update.bind(this), 100, this);
    this._mediaEventProps = this._injectUpdateVideoEvents();
  }

  componentWillReceiveProps (nextProps) {
    // Dynamically modifying a source element and its attribute when
    // the element is already inserted in a video or audio element will
    // have no effect.
    // From HTML Specs:
    // https://html.spec.whatwg.org/multipage/embedded-content.html
    //   #the-source-element
    // Using forceUpdate to force redraw of video when receiving new <source>
    this.forceUpdate();
  }

  _injectUpdateVideoEvents () {
    const videoEvents = [
      'onAbort',
      'onCanPlay',
      'onCanPlayThrough',
      'onDurationChange',
      'onEmptied',
      'onEncrypted',
      'onEnded',
      'onError',
      'onLoadedData',
      'onLoadedMetadata',
      'onLoadStart',
      'onPause',
      'onPlay',
      'onPlaying',
      'onProgress',
      'onRateChange',
      'onSeeked',
      'onSeeking',
      'onStalled',
      'onSuspend',
      'onTimeUpdate',
      'onVolumeChange',
      'onWaiting'
    ];

    return videoEvents.reduce((previousValue, currentValue) => {
      previousValue[currentValue] = () => {
        if (currentValue in this.props
          && typeof this.props[currentValue] === 'function') {
          this.props[currentValue]();
        }
        this._update();
      };

      return previousValue;
    }, {});
  }

  _update () {
    // Set flag for Video first play
    if (!this._hasPlayed && !this._video.paused && !this._video.loading) {
      this._hasPlayed = true;
    }

    let interacting = this.state.interacting;
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
      percentageBuffered: this._video.buffered.length &&
        this._video.buffered.end(this._video.buffered.length - 1) /
        this._video.duration * 100,
      percentagePlayed: this._video.currentTime / this._video.duration * 100,
      loading: this._video.readyState < this._video.HAVE_ENOUGH_DATA
    });
  }

  _play () {
    this._video.play();
  }

  _pause () {
    this._video.pause();
  }

  _togglePlay () {
    if (this.state.paused) {
      this._play();
    } else {
      this._pause();
    }
  }

  _seek(time) {
    this._video.currentTime = typeof time !== 'undefined'
      ? time
      : this._video.currentTime;
  }

  _unmute() {
    this._video.muted = false;
  }

  _mute() {
    this._video.muted = true;
  }

  _toggleMute () {
    if (!this.state.muted) {
      this._mute();
    } else {
      this._unmute();
    }
  }

  _fullscreen() {
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

  _onInterationStart () {
    this.setState({ interacting: true });
  }

  _onInteractionOver () {
    const { focus } = this.state;
    if (!focus) {
      this.setState({ interacting: false });
    }
  }

  _renderControls () {
    let extendedProps = Object.assign({
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

    return (
      <div>
        <VideoOverlay {...extendedProps} />
        <VideoControls ref={(ref) => this._controlRef = ref}
          {...extendedProps} />
      </div>
    );
  }

  render () {
    let {
      align, autoPlay, className, colorIndex, fit, full, loop, muted, poster,
      showControls, size
    } = this.props;
    let { ended, hasPlayed, interacting, mouseActive, playing} = this.state;
    let classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--${fit}`]: fit,
        [`${CLASS_ROOT}--full`]: fit || full,
        [`${CLASS_ROOT}--interacting`]: interacting,
        [`${CLASS_ROOT}--playing`]: playing,
        [`${CLASS_ROOT}--hasPlayed`]: hasPlayed,
        [`${CLASS_ROOT}--ended`]: ended,
        [`${BACKGROUND_COLOR_INDEX}--${colorIndex}`]: colorIndex,
        [`${CLASS_ROOT}--align-top`]: align && align.top,
        [`${CLASS_ROOT}--align-bottom`]: align && align.bottom,
        [`${CLASS_ROOT}--align-left`]: align && align.left,
        [`${CLASS_ROOT}--align-right`]: align && align.right
      },
      className
    );
    const restProps = Props.omit(this.props, Object.keys(Video.propTypes));

    return (
      <div className={classes} ref={(ref) => this._containerRef = ref}
        onMouseEnter={() => {
          if (!ended) {
            this._onInterationStart();
          }
        }}
        onMouseMove={(event) => {
          // needed to avoid react synthatic event pooling
          event.persist();
          if (!ended || findDOMNode(this._controlRef).contains(event.target)) {
            this._onInterationStart();
          } else if (ended) {
            this._onInteractionOver();
          }
          clearTimeout(this._moveTimer);
          this._moveTimer = setTimeout(() => {
            const element = findDOMNode(this._controlRef);
            if (element && !element.contains(event.target)) {
              this._onInteractionOver();
            }
          }, 1000);
        }}
        onMouseLeave={this._onInteractionOver}
        onMouseDown={() => {
          this.setState({ mouseActive: true });
        }}
        onMouseUp={() => {
          this.setState({ mouseActive: false });
        }}
        onFocus={() => {
          if (mouseActive === false) {
            this._onInterationStart();
            this.setState({ focus: true });
          }
        }}
        onBlur={() => {
          this.setState({ focus: false }, () => {
            if (!this._containerRef.contains(document.activeElement)) {
              this._onInteractionOver();
            }
          });
        }}>
        <video ref={el => this._video = el} {...restProps}
          poster={poster} autoPlay={autoPlay ? 'autoplay' : false}
          loop={loop ? 'loop' : false} muted={muted} {...this._mediaEventProps}>
          {this.props.children}
        </video>
        {showControls ? this._renderControls() : undefined}
      </div>
    );
  }
}

Video.propTypes = {
  align: PropTypes.shape({
    bottom: PropTypes.boolean,
    left: PropTypes.boolean,
    right: PropTypes.boolean,
    top: PropTypes.boolean
  }),
  allowFullScreen: PropTypes.bool,
  autoPlay: PropTypes.bool,
  colorIndex: PropTypes.string,
  fit: PropTypes.oneOf(['contain', 'cover']),
  full: PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  poster: PropTypes.string,
  shareLink: PropTypes.string,
  shareHeadline: PropTypes.string,
  shareText: PropTypes.string,
  showControls: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  timeline: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    time: PropTypes.number
  })),
  title: PropTypes.node
};

Video.defaultProps = {
  allowFullScreen: true,
  autoPlay: false,
  loop: false,
  muted: false,
  size: 'medium',
  showControls: true
};
