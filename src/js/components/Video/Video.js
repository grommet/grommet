import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { Actions, ClosedCaption, Expand, Play, Pause, Volume, VolumeLow } from 'grommet-icons';
import { Box } from '../Box';
import { Button } from '../Button';
import { Drop } from '../Drop';
import { Meter } from '../Meter';
import { Stack } from '../Stack';
import { Text } from '../Text';

import { withTheme } from '../hocs';
import throttle from '../utils/throttle';

import StyledVideo,
  { StyledVideoContainer, StyledVideoControls, StyledVideoScrubber } from './StyledVideo';

import doc from './doc';

const VOLUME_STEP = 0.166667;

const formatTime = (time) => {
  let minutes = Math.round(time / 60);
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let seconds = Math.round(time) % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
};

class Video extends Component {
  static contextTypes = {
    grommet: PropTypes.object,
    theme: PropTypes.object,
    router: PropTypes.any,
  }

  static defaultProps = {
    controls: 'over',
  }

  constructor() {
    super();
    this.play = this.play.bind(this);
    this.hasPlayed = false;
    this.pause = this.pause.bind(this);
    this.scrub = this.scrub.bind(this);
    this.seek = this.seek.bind(this);
    this.mute = this.mute.bind(this);
    this.unmute = this.unmute.bind(this);
    this.louder = this.louder.bind(this);
    this.quieter = this.quieter.bind(this);
    this.showCaptions = this.showCaptions.bind(this);
    this.fullscreen = this.fullscreen.bind(this);
    this.interactionStart = this.interactionStart.bind(this);
    this.interactionStop = this.interactionStop.bind(this);
    // this.renderControls = this.renderControls.bind(this);

    this.state = { mouseActive: false };
  }

  componentWillMount() {
    this.update = throttle(this.update.bind(this), 100, this);
    this.mediaEventProps = this.injectUpdateVideoEvents();
  }

  componentDidMount() {
    const { mute } = this.props;
    const video = findDOMNode(this.videoRef);

    if (mute) {
      this.mute();
    }

    // hide all captioning to start with
    const textTracks = video.textTracks;
    for (let i = 0; i < textTracks.length; i += 1) {
      textTracks[i].mode = 'hidden';
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.autoPlay && !this.props.autoPlay) {
      // Caller wants the video to play now.
      this.play();
    }
    // Dynamically modifying a source element and its attribute when
    // the element is already inserted in a video or audio element will
    // have no effect.
    // From HTML Specs:
    // https://html.spec.whatwg.org/multipage/embedded-content.html
    //   #the-source-element
    // Using forceUpdate to force redraw of video when receiving new <source>
    this.forceUpdate();
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  injectUpdateVideoEvents() {
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
    const video = findDOMNode(this.videoRef);
    // Set flag for Video first play
    if (!this.hasPlayed && !video.paused && !video.loading) {
      this.hasPlayed = true;
    }

    let interacting = this.state.interacting;
    if (video.ended) {
      interacting = false;
    }

    this.setState({
      duration: video.duration,
      currentTime: video.currentTime,
      buffered: video.buffered,
      paused: video.paused,
      muted: video.muted,
      volume: video.volume,
      ended: video.ended,
      readyState: video.readyState,
      interacting,
      // computed values
      hasPlayed: this.hasPlayed,
      playing: !video.paused && !video.loading,
      percentageBuffered: video.buffered.length &&
        (video.buffered.end(video.buffered.length - 1) /
        video.duration) * 100,
      percentagePlayed: (video.currentTime / video.duration) * 100,
      loading: video.readyState < video.HAVE_ENOUGH_DATA,
    });
  }

  play() {
    findDOMNode(this.videoRef).play();
  }

  pause() {
    findDOMNode(this.videoRef).pause();
  }

  scrub(event) {
    const { duration } = this.state;
    if (this.scrubberRef) {
      const scrubberRect = findDOMNode(this.scrubberRef).getBoundingClientRect();
      const percent = (event.clientX - scrubberRect.left) / scrubberRect.width;
      this.setState({ scrubTime: (duration * percent) });
    }
  }

  seek(event) {
    const { duration } = this.state;
    if (this.scrubberRef) {
      const scrubberRect = findDOMNode(this.scrubberRef).getBoundingClientRect();
      const percent = (event.clientX - scrubberRect.left) / scrubberRect.width;
      findDOMNode(this.videoRef).currentTime = duration * percent;
    }
  }

  unmute() {
    findDOMNode(this.videoRef).muted = false;
  }

  mute() {
    findDOMNode(this.videoRef).muted = true;
  }

  louder() {
    findDOMNode(this.videoRef).volume += VOLUME_STEP;
  }

  quieter() {
    findDOMNode(this.videoRef).volume -= VOLUME_STEP;
  }

  showCaptions(index) {
    const textTracks = findDOMNode(this.videoRef).textTracks;
    for (let i = 0; i < textTracks.length; i += 1) {
      textTracks[i].mode = ((i === index) ? 'showing' : 'hidden');
    }
    // Using forceUpdate to force redraw of controls when changing captions
    this.forceUpdate();
  }

  fullscreen() {
    const video = findDOMNode(this.videoRef);
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else {
      console.warn('Your browser doesn\'t support fullscreen.');
    }
  }

  interactionStart() {
    this.setState({ interacting: true });
    clearTimeout(this.interactionTimer);
    this.interactionTimer = setTimeout(this.interactionStop, 3000);
  }

  interactionStop() {
    const { focus } = this.state;
    if (!focus && !this.unmounted) {
      this.setState({ interacting: false, actionsActive: false });
    }
  }

  renderDrop(background, iconColor) {
    const { volume } = this.state;

    let captionControls;
    const textTracks = findDOMNode(this.videoRef).textTracks;
    if (textTracks.length > 0) {
      if (textTracks.length === 1) {
        const active = textTracks[0].mode === 'showing';
        captionControls = (
          <Button
            icon={<ClosedCaption color={iconColor} />}
            active={active}
            onClick={() => this.showCaptions(active ? -1 : 0)}
          />
        );
      } else {
        captionControls = [];
        for (let i = 0; i < textTracks.length; i += 1) {
          const track = textTracks[i];
          const active = track.mode === 'showing';
          captionControls.push(
            <Button
              key={track.label}
              plain={true}
              hoverIndicator='background'
              active={active}
              onClick={() => this.showCaptions(active ? -1 : i)}
            >
              <Box pad='small'>{track.label}</Box>
            </Button>
          );
        }
      }
    }

    return (
      <Drop
        align={{ bottom: 'top', right: 'right' }}
        background='transparent'
        context={this.context}
        control={findDOMNode(this.actionsControlRef)}
        responsive={false}
        onClose={() => this.setState({ actionsActive: false })}
      >
        <Box background={background || { color: 'light-2', opacity: 'weak' }}>
          <Button
            icon={<Volume color={iconColor} />}
            hoverIndicator='background'
            onClick={(volume <= (1 - VOLUME_STEP) ? this.louder : undefined)}
          />
          <Button
            icon={<VolumeLow color={iconColor} />}
            hoverIndicator='background'
            onClick={(volume >= VOLUME_STEP ? this.quieter : undefined)}
          />
          {captionControls}
          <Button
            icon={<Expand color={iconColor} />}
            hoverIndicator='background'
            onClick={this.fullscreen}
          />
        </Box>
      </Drop>
    );
  }

  renderControls() {
    const { controls } = this.props;
    const {
      actionsActive, currentTime, duration, interacting,
      percentagePlayed, playing, scrubTime,
    } = this.state;
    const over = controls === 'over';
    const background = over ? { color: 'dark-2', opacity: 'weak' } : undefined;
    const iconColor = over ? 'light-1' : undefined;

    let drop;
    if (actionsActive) {
      drop = this.renderDrop(background, iconColor);
    }

    const formattedTime = formatTime(scrubTime || currentTime || duration);

    return (
      <StyledVideoControls
        over={over}
        active={!this.hasPlayed || controls === 'below' || (over && interacting)}
      >
        <Box
          direction='row'
          align='center'
          justify='between'
          background={background}
        >
          <Button
            icon={playing ? <Pause color={iconColor} /> : <Play color={iconColor} />}
            hoverIndicator='background'
            onClick={playing ? this.pause : this.play}
          />
          <Box direction='row' align='center' flex='grow'>
            <Box flex={true}>
              <Stack>
                <Meter
                  background={over ? 'dark-3' : undefined}
                  round={true}
                  size='full'
                  thickness='small'
                  values={[{ value: percentagePlayed || 0 }]}
                />
                <StyledVideoScrubber
                  ref={(ref) => { this.scrubberRef = ref; }}
                  tabIndex={0}
                  role='button'
                  value={scrubTime ? Math.round((scrubTime / duration) * 100) : undefined}
                  onMouseMove={this.scrub}
                  onMouseLeave={() => this.setState({ scrubTime: undefined })}
                  onClick={this.seek}
                  theme={this.props.theme}
                />
              </Stack>
            </Box>
            <Box pad={{ horizontal: 'small' }}>
              <Text margin='none'>{formattedTime}</Text>
            </Box>
          </Box>
          <Button
            ref={(ref) => { this.actionsControlRef = ref; }}
            icon={<Actions color={iconColor} />}
            hoverIndicator='background'
            onClick={() => this.setState({ actionsActive: !actionsActive })}
          />
        </Box>
        {drop}
      </StyledVideoControls>
    );
  }

  render() {
    const { autoPlay, children, controls, loop, ...rest } = this.props;

    const controlsElement = (controls ? this.renderControls() : undefined);

    let mouseEventListeners;
    if (controls === 'over') {
      mouseEventListeners = {
        onMouseEnter: this.interactionStart,
        onMouseMove: this.interactionStart,
      };
    }

    return (
      <StyledVideoContainer {...mouseEventListeners} >
        <StyledVideo
          ref={(ref) => { this.videoRef = ref; }}
          {...rest}
          {...this.mediaEventProps}
          autoPlay={autoPlay || false}
          loop={loop || false}
        >
          {children}
        </StyledVideo>
        {controlsElement}
      </StyledVideoContainer>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Video);
}

export default compose(
  withTheme,
)(Video);
