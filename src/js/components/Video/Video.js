import React, { Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { Menu } from '../Menu';
import { Meter } from '../Meter';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { withForwardRef } from '../hocs';
import { throttle } from '../../utils';

import {
  StyledVideo,
  StyledVideoContainer,
  StyledVideoControls,
  StyledVideoScrubber,
} from './StyledVideo';

// Split the volume control into 6 segments. Empirically determined.
const VOLUME_STEP = 0.166667;

const formatTime = time => {
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

class Video extends Component {
  static defaultProps = {
    controls: 'over',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { forwardRef } = nextProps;
    const { videoRef } = prevState;
    const nextVideoRef = forwardRef || videoRef;
    if (nextVideoRef !== videoRef) {
      return { videoRef: nextVideoRef };
    }
    return null;
  }

  state = {
    captions: [],
    scrubberRef: React.createRef(),
    videoRef: React.createRef(),
  };

  hasPlayed = false;

  constructor(props) {
    super(props);
    this.update = throttle(this.update, 100, this);
    this.mediaEventProps = this.injectUpdateVideoEvents();
  }

  componentDidMount() {
    const { mute } = this.props;
    const { videoRef } = this.state;
    const video = videoRef.current;

    if (mute) {
      this.mute();
    }

    if (video) {
      // hide all captioning to start with
      const { textTracks } = video;
      for (let i = 0; i < textTracks.length; i += 1) {
        textTracks[i].mode = 'hidden';
      }

      this.restate();
    }
  }

  componentDidUpdate(prevProps) {
    const { autoPlay } = this.props;
    if (autoPlay && !prevProps.autoPlay) {
      // Caller wants the video to play now.
      this.play();
    }
    this.restate();
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  injectUpdateVideoEvents = () =>
    videoEvents.reduce((previousValue, currentValue) => {
      const nextValue = { ...previousValue };
      nextValue[currentValue] = e => {
        if (
          currentValue in this.props &&
          /* eslint-disable react/destructuring-assignment */
          typeof this.props[currentValue] === 'function'
        ) {
          this.props[currentValue](e);
          /* eslint-enable react/destructuring-assignment */
        }
        this.update();
      };

      return nextValue;
    }, {});

  update = () => {
    const { videoRef } = this.state;
    const video = videoRef.current;
    // Set flag for Video first play
    if (
      (!this.hasPlayed && !video.paused && !video.loading) ||
      video.currentTime
    ) {
      this.hasPlayed = true;
    }

    let { interacting } = this.state;
    if (video.ended) {
      interacting = false;
    }

    this.setState({
      duration: video.duration,
      currentTime: video.currentTime,
      // buffered: video.buffered,
      // paused: video.paused,
      // muted: video.muted,
      volume: video.volume,
      // ended: video.ended,
      // readyState: video.readyState,
      interacting,
      // computed values
      // hasPlayed: this.hasPlayed,
      playing: !video.paused && !video.loading,
      // percentageBuffered: video.buffered.length &&
      //   (video.buffered.end(video.buffered.length - 1) /
      //   video.duration) * 100,
      percentagePlayed: (video.currentTime / video.duration) * 100,
      // loading: video.readyState < video.HAVE_ENOUGH_DATA,
    });
  };

  play = () => {
    const { videoRef } = this.state;
    videoRef.current.play();
  };

  pause = () => {
    const { videoRef } = this.state;
    videoRef.current.pause();
  };

  scrub = event => {
    const { duration, scrubberRef } = this.state;
    if (scrubberRef.current) {
      const scrubberRect = scrubberRef.current.getBoundingClientRect();
      const percent = (event.clientX - scrubberRect.left) / scrubberRect.width;
      this.setState({ scrubTime: duration * percent });
    }
  };

  seek = event => {
    const { duration, scrubberRef, videoRef } = this.state;
    if (scrubberRef.current) {
      const scrubberRect = scrubberRef.current.getBoundingClientRect();
      const percent = (event.clientX - scrubberRect.left) / scrubberRect.width;
      videoRef.current.currentTime = duration * percent;
    }
  };

  unmute = () => {
    const { videoRef } = this.state;
    if (videoRef.current) {
      videoRef.current.muted = false;
    }
  };

  mute = () => {
    const { videoRef } = this.state;
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  louder = () => {
    const { videoRef } = this.state;
    videoRef.current.volume += VOLUME_STEP;
  };

  quieter = () => {
    const { videoRef } = this.state;
    videoRef.current.volume -= VOLUME_STEP;
  };

  showCaptions = index => {
    const { videoRef } = this.state;
    const { textTracks } = videoRef.current;
    for (let i = 0; i < textTracks.length; i += 1) {
      textTracks[i].mode = i === index ? 'showing' : 'hidden';
    }
    // Using forceUpdate to force redraw of controls when changing captions
    this.forceUpdate();
  };

  fullscreen = () => {
    const { videoRef } = this.state;
    const video = videoRef.current;
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
  };

  interactionStart = () => {
    this.setState({ interacting: true });
    clearTimeout(this.interactionTimer);
    this.interactionTimer = setTimeout(this.interactionStop, 3000);
  };

  interactionStop = () => {
    const { focus } = this.state;
    if (!focus && !this.unmounted) {
      this.setState({ interacting: false });
    }
  };

  restate = () => {
    const { captions, height, videoRef, width } = this.state;
    const video = videoRef.current;

    if (video) {
      if (video.videoHeight) {
        // set the size based on the video aspect ratio
        const rect = video.getBoundingClientRect();
        const ratio = rect.width / rect.height;
        const videoRatio = video.videoWidth / video.videoHeight;
        if (videoRatio > ratio) {
          const nextHeight = rect.width / videoRatio;
          if (nextHeight !== height) {
            this.setState({ height: nextHeight, width: undefined });
          }
        } else {
          const nextWidth = rect.height * videoRatio;
          if (nextWidth !== width) {
            this.setState({ height: undefined, width: nextWidth });
          }
        }
      }

      // remember the state of the text tracks for subsequent rendering
      const { textTracks } = video;
      if (textTracks.length > 0) {
        if (textTracks.length === 1) {
          const active = textTracks[0].mode === 'showing';
          if (!captions || !captions[0] || captions[0].active !== active) {
            this.setState({ captions: [{ active }] });
          }
        } else {
          const nextCaptions = [];
          let set = false;
          for (let i = 0; i < textTracks.length; i += 1) {
            const track = textTracks[i];
            const active = track.mode === 'showing';
            nextCaptions.push({ label: track.label, active });
            if (!captions || !captions[i] || captions[i].active !== active) {
              set = true;
            }
          }
          if (set) {
            this.setState({ captions: nextCaptions });
          }
        }
      }
    }
  };

  renderControls() {
    const { controls, theme } = this.props;
    const {
      captions,
      currentTime,
      duration,
      interacting,
      percentagePlayed,
      playing,
      scrubberRef,
      scrubTime,
      volume,
    } = this.state;
    const over = controls === 'over';
    const background =
      over &&
      ((theme.video.controls && theme.video.controls.background) || {
        color: 'dark-2',
        opacity: 'strong',
      });
    const iconColor = over && (theme.video.icons.color || 'light-1');

    const formattedTime = formatTime(scrubTime || currentTime || duration);

    const Icons = {
      ClosedCaption: theme.video.icons.closedCaption,
      Configure: theme.video.icons.configure,
      FullScreen: theme.video.icons.fullScreen,
      Pause: theme.video.icons.pause,
      Play: theme.video.icons.play,
      ReduceVolume: theme.video.icons.reduceVolume,
      Volume: theme.video.icons.volume,
    };

    const captionControls = captions.map(caption => ({
      icon: caption.label ? (
        undefined
      ) : (
        <Icons.ClosedCaption color={iconColor} />
      ),
      label: caption.label,
      active: caption.active,
      onClick: () => this.showCaptions(caption.active ? -1 : 0),
    }));

    return (
      <StyledVideoControls
        over={over}
        active={
          !this.hasPlayed || controls === 'below' || (over && interacting)
        }
      >
        <Box
          direction="row"
          align="center"
          justify="between"
          background={background}
        >
          <Button
            icon={
              playing ? (
                <Icons.Pause color={iconColor} />
              ) : (
                <Icons.Play color={iconColor} />
              )
            }
            hoverIndicator="background"
            onClick={playing ? this.pause : this.play}
          />
          <Box direction="row" align="center" flex>
            <Box flex>
              <Stack>
                <Meter
                  aria-label="Video progress"
                  background={
                    over &&
                    ((theme.video.scrubber &&
                      theme.video.scrubber.track.color) ||
                      'dark-3')
                  }
                  size="full"
                  thickness="small"
                  values={[{ value: percentagePlayed || 0 }]}
                />
                <StyledVideoScrubber
                  ref={scrubberRef}
                  tabIndex={0}
                  role="button"
                  value={
                    scrubTime
                      ? Math.round((scrubTime / duration) * 100)
                      : undefined
                  }
                  onMouseMove={this.scrub}
                  onMouseLeave={() => this.setState({ scrubTime: undefined })}
                  onClick={this.seek}
                />
              </Stack>
            </Box>
            <Box pad={{ horizontal: 'small' }}>
              <Text margin="none">{formattedTime}</Text>
            </Box>
          </Box>
          <Menu
            icon={<Icons.Configure color={iconColor} />}
            dropAlign={{ bottom: 'top', right: 'right' }}
            dropBackground={background}
            items={[
              {
                icon: <Icons.Volume color={iconColor} />,
                onClick: volume <= 1 - VOLUME_STEP ? this.louder : undefined,
                close: false,
              },
              {
                icon: <Icons.ReduceVolume color={iconColor} />,
                onClick: volume >= VOLUME_STEP ? this.quieter : undefined,
                close: false,
              },
              ...captionControls,
              {
                icon: <Icons.FullScreen color={iconColor} />,
                onClick: this.fullscreen,
              },
            ]}
          />
        </Box>
      </StyledVideoControls>
    );
  }

  render() {
    const {
      alignSelf,
      autoPlay,
      children,
      controls,
      gridArea,
      loop,
      margin,
      theme,
      ...rest
    } = this.props;
    const { height, videoRef, width } = this.state;

    const controlsElement = controls ? this.renderControls() : undefined;

    let mouseEventListeners;
    if (controls === 'over') {
      mouseEventListeners = {
        onMouseEnter: this.interactionStart,
        onMouseMove: this.interactionStart,
        onTouchStart: this.interactionStart,
      };
    }

    let style;
    if (rest.fit === 'contain' && controls === 'over') {
      // constrain the size to fit the aspect ratio so the controls overlap correctly
      if (width) {
        style = { width };
      } else if (height) {
        style = { height };
      }
    }

    return (
      <StyledVideoContainer
        {...mouseEventListeners}
        alignSelf={alignSelf}
        gridArea={gridArea}
        margin={margin}
        style={style}
      >
        <StyledVideo
          {...rest}
          ref={videoRef}
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

Object.setPrototypeOf(Video.defaultProps, defaultProps);

let VideoDoc;
if (process.env.NODE_ENV !== 'production') {
  VideoDoc = require('./doc').doc(Video); // eslint-disable-line global-require
}
const VideoWrapper = compose(
  withTheme,
  withForwardRef,
)(VideoDoc || Video);

export { VideoWrapper as Video };
