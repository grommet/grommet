import throttle from '../utils/throttle';

export default class Controller {
  constructor(videoRef, onChange) {
    this.videoRef = videoRef;
    this.onChange = onChange;

    this.play = this.play.bind(this);
    this.hasPlayed = false;
    this.pause = this.pause.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.seek = this.seek.bind(this);
    this.mute = this.mute.bind(this);
    this.unmute = this.unmute.bind(this);
    this.fullscreen = this.fullscreen.bind(this);
    this.onInterationStart = this.onInterationStart.bind(this);
    this.onInteractionOver = this.onInteractionOver.bind(this);
    this.update = throttle(this.update.bind(this), 100, this);

    this.state = { mouseActive: false };
  }

  eventListeners() {
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
      'onWaiting',
    ];

    return videoEvents.reduce((previousValue, currentValue) => {
      const nextValue = { ...previousValue };
      nextValue[currentValue] = () => {
        if (currentValue in this.props
          && typeof this.props[currentValue] === 'function') {
          this.props[currentValue]();
        }
        this.update();
      };

      return nextValue;
    }, {});
  }

  update() {
    // Set flag for Video first play
    if (!this.hasPlayed && !this.videoRef.paused && !this.videoRef.loading) {
      this.hasPlayed = true;
    }

    let interacting = this.state.interacting;
    if (this.videoRef.ended) {
      interacting = false;
    }

    const nextState = {
      ...this.state,
      duration: this.videoRef.duration,
      currentTime: this.videoRef.currentTime,
      buffered: this.videoRef.buffered,
      paused: this.videoRef.paused,
      muted: this.videoRef.muted,
      volume: this.videoRef.volume,
      ended: this.videoRef.ended,
      readyState: this.videoRef.readyState,
      interacting,
      // computed values
      hasPlayed: this.hasPlayed,
      playing: !this.videoRef.paused && !this.videoRef.loading,
      percentageBuffered: this.videoRef.buffered.length &&
        (this.videoRef.buffered.end(this.videoRef.buffered.length - 1) /
        this.videoRef.duration) * 100,
      percentagePlayed: (this.videoRef.currentTime / this.videoRef.duration) * 100,
      loading: this.videoRef.readyState < this.videoRef.HAVE_ENOUGH_DATA,
    };
    this.onChange(nextState);
  }

  play() {
    this.videoRef.play();
  }

  pause() {
    this.videoRef.pause();
  }

  togglePlay() {
    if (this.state.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  seek(time) {
    this.videoRef.currentTime = typeof time !== 'undefined'
      ? time
      : this.videoRef.currentTime;
  }

  unmute() {
    this.videoRef.muted = false;
  }

  mute() {
    this.videoRef.muted = true;
  }

  toggleMute() {
    if (!this.state.muted) {
      this.mute();
    } else {
      this.unmute();
    }
  }

  fullscreen() {
    if (this.videoRef.requestFullscreen) {
      this.videoRef.requestFullscreen();
    } else if (this.videoRef.msRequestFullscreen) {
      this.videoRef.msRequestFullscreen();
    } else if (this.videoRef.mozRequestFullScreen) {
      this.videoRef.mozRequestFullScreen();
    } else if (this.videoRef.webkitRequestFullscreen) {
      this.videoRef.webkitRequestFullscreen();
    } else {
      console.warn('Your browser doesn\'t support fullscreen.');
    }
  }

  onInterationStart() {
    this.state = {
      ...this.state,
      interacting: true,
    };
    this.notify();
  }

  onInteractionOver() {
    const { focus } = this.state;
    if (!focus) {
      this.state = {
        ...this.state,
        interacting: false,
      };
      this.notify();
    }
  }
}
