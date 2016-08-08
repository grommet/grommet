// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

import CSSClassnames from '../utils/CSSClassnames';
import VideoControls from './video/Controls';
import VideoOverlay from './video/Overlay';
import throttle from 'lodash.throttle';

const CLASS_ROOT = CSSClassnames.VIDEO;
const BACKGROUND_COLOR_INDEX = CSSClassnames.BACKGROUND_COLOR_INDEX;

const EVENTS = [
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

export default class Video extends Component {

  constructor () {
    super();

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
    this._update = throttle(this._update.bind(this), 100).bind(this);
    this._mediaEventProps = EVENTS.reduce((p, c) => {
      p[c] = () => {
        if (c in this.props && typeof this.props[c] === 'function') {
          this.props[c]();
        }
        this._update();
      };

      return p;
    }, {});
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

  _update () {
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
    this._video.currentTime = time || this._video.currentTime;
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
    this.setState({interacting: true});
    clearTimeout(this._moveTimer);
    this._moveTimer = setTimeout(function () {
      this.setState({interacting: false});
    }.bind(this), 1000);
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
      fullscreen: this._fullscreen,
      shareLink: this.props.shareLink,
      shareHeadline: this.props.shareHeadline,
      shareText: this.props.shareText
    }, this.state);

    return (
      <div>
        <VideoOverlay {...extendedProps} />
        <VideoControls {...extendedProps} />
      </div>
      );
  }

  render () {
    let classes = [CLASS_ROOT];
    if (this.props.size) {
      classes.push(`${CLASS_ROOT}--${this.props.size}`);
    }
    if (this.props.full) {
      classes.push(`${CLASS_ROOT}--full`);
    }
    if (this.state.playing) {
      classes.push(`${CLASS_ROOT}--playing`);
    }
    if (this.state.interacting) {
      classes.push(`${CLASS_ROOT}--interacting`);
    }
    if (this.props.colorIndex) {
      classes.push(`${BACKGROUND_COLOR_INDEX}-${this.props.colorIndex}`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    if (this.props.title) {
      classes.push(`${CLASS_ROOT}--titled`);
    }
    if (this.state.hasPlayed) {
      classes.push(`${CLASS_ROOT}--has-played`);
    }
    if (this.state.ended) {
      classes.push(`${CLASS_ROOT}--ended`);
    }

    return (
      <div className={classes.join(' ')} onMouseMove={this._onMouseMove}>
        <video ref={el => this._video = el}
          poster={this.props.poster}
          autoPlay={this.props.autoPlay ? 'autoplay' : false}
          loop={this.props.loop ? 'loop' : false}
          muted={this.props.muted}
          {...this._mediaEventProps}>
          {this.props.children}
        </video>

        {this.props.showControls ? this._renderControls() : undefined}
      </div>
    );
  }
}

Video.propTypes = {
  colorIndex: PropTypes.string,
  duration: PropTypes.number,
  full: PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
  poster: PropTypes.string,
  size: React.PropTypes.oneOf(['small', 'medium', 'large']),
  timeline: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    time: PropTypes.number
  })),
  title: PropTypes.node,
  onClick: PropTypes.func,
  allowFullScreen: PropTypes.bool,
  autoPlay: PropTypes.bool,
  shareLink: PropTypes.string,
  shareHeadline: PropTypes.string,
  shareText: PropTypes.string,
  showControls: PropTypes.bool,
  muted: PropTypes.bool,
  loop: PropTypes.bool
};

Video.defaultProps = {
  autoPlay: false,
  showControls: true,
  muted: false,
  loop: false
};
