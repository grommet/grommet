// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
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
    this._onMouseMove = this._onMouseMove.bind(this);

    this.state = {};
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

  _onMouseMove () {
    this.setState({ interacting: true});
    clearTimeout(this._moveTimer);
    this._moveTimer = setTimeout(() => {
      this.setState({ interacting: false });
    }, 1000);
  }

  _renderControls () {
    let extendedProps = Object.assign({
      title: this.props.title,
      videoHeader: this.props.videoHeader,
      togglePlay: this.props.onClick || this._togglePlay,
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
      allowFullScreen: this.props.allowFullScreen
    }, this.state);

    return (
      <div>
        <VideoOverlay {...extendedProps} />
        <VideoControls {...extendedProps} />
      </div>
      );
  }

  render () {
    let { autoPlay, className, colorIndex, full, loop, muted, poster,
      showControls, size } = this.props;
    let { ended, hasPlayed, interacting, playing} = this.state;
    let classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--full`]: full,
        [`${CLASS_ROOT}--interacting`]: interacting,
        [`${CLASS_ROOT}--playing`]: playing,
        [`${CLASS_ROOT}--hasPlayed`]: hasPlayed,
        [`${CLASS_ROOT}--ended`]: ended,
        [`${BACKGROUND_COLOR_INDEX}--${colorIndex}`]: colorIndex
      },
      className
    );

    const deprecatedProps = [];
    if (this.props.videoHeader)
      deprecatedProps.push('videoHeader');
    if (this.props.onClick)
      deprecatedProps.push('onClick');
    if (this.props.duration)
      deprecatedProps.push('duration');
    if (deprecatedProps.length > 0)
      console.warn(`Video: ${deprecatedProps.join(', ')} ` +
        'prop has been deprecated.');

    return (
      <div className={classes} onMouseMove={this._onMouseMove}>
        <video ref={el => this._video = el}
          poster={poster}
          autoPlay={autoPlay ? 'autoplay' : false}
          loop={loop ? 'loop' : false}
          muted={muted}
          {...this._mediaEventProps}>
          {this.props.children}
        </video>
        {showControls ? this._renderControls() : undefined}
      </div>
    );
  }
}

Video.propTypes = {
  allowFullScreen: PropTypes.bool,
  autoPlay: PropTypes.bool,
  colorIndex: PropTypes.string,
  duration: PropTypes.number, // remove in 1.0
  full: PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  onClick: PropTypes.func, // remove in 1.0
  poster: PropTypes.string,
  shareLink: PropTypes.string,
  shareHeadline: PropTypes.string,
  shareText: PropTypes.string,
  showControls: PropTypes.bool,
  size: React.PropTypes.oneOf(['small', 'medium', 'large']),
  timeline: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    time: PropTypes.number
  })),
  title: PropTypes.node,
  videoHeader: PropTypes.node // remove in 1.0
};

Video.defaultProps = {
  allowFullScreen: true,
  autoPlay: false,
  loop: false,
  muted: false,
  showControls: true
};
