import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { Menu } from '../Menu';
import { Meter } from '../Meter';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { containsFocus, useForwardedRef } from '../../utils';

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

const Video = forwardRef(
  (
    {
      alignSelf,
      autoPlay,
      children,
      controls = 'over',
      gridArea,
      loop,
      margin,
      messages,
      mute,
      onDurationChange,
      onEnded,
      onPause,
      onPlay,
      onTimeUpdate,
      onVolumeChange,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const [captions, setCaptions] = useState([]);
    const [currentTime, setCurrentTime] = useState();
    const [duration, setDuration] = useState();
    const [percentagePlayed, setPercentagePlayed] = useState();
    const [playing, setPlaying] = useState(false);
    const [scrubTime, setScrubTime] = useState();
    const [volume, setVolume] = useState();
    const [hasPlayed, setHasPlayed] = useState(false);
    const [interacting, setInteracting] = useState();
    const [height, setHeight] = useState();
    const [width, setWidth] = useState();
    const containerRef = useRef();
    const scrubberRef = useRef();
    const videoRef = useForwardedRef(ref);

    // mute if needed
    useEffect(() => {
      const video = videoRef.current;
      if (video && mute) video.muted = true;
    }, [mute, videoRef]);

    // when the video is first rendered, set state from it where needed
    useEffect(() => {
      const video = videoRef.current;
      if (video) {
        // hide all captioning to start with
        const { textTracks } = video;
        for (let i = 0; i < textTracks.length; i += 1) {
          textTracks[i].mode = 'hidden';
        }

        setCurrentTime(video.currentTime);
        setPercentagePlayed((video.currentTime / video.duration) * 100);
        setVolume(videoRef.current.volume);
      }
    }, [videoRef]);

    // turn off interacting after a while
    useEffect(() => {
      const timer = setTimeout(() => {
        if (interacting && !containsFocus(containerRef.current)) {
          setInteracting(false);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }, [interacting]);

    useLayoutEffect(() => {
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
              setHeight(nextHeight);
              setWidth(undefined);
            }
          } else {
            const nextWidth = rect.height * videoRatio;
            if (nextWidth !== width) {
              setHeight(undefined);
              setWidth(nextWidth);
            }
          }
        }

        // remember the state of the text tracks for subsequent rendering
        const { textTracks } = video;
        if (textTracks.length > 0) {
          if (textTracks.length === 1) {
            const active = textTracks[0].mode === 'showing';
            if (!captions || !captions[0] || captions[0].active !== active) {
              setCaptions([{ active }]);
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
              setCaptions(nextCaptions);
            }
          }
        }
      }
    }, [captions, height, videoRef, width]);

    const play = useCallback(() => videoRef.current.play(), [videoRef]);

    const pause = useCallback(() => videoRef.current.pause(), [videoRef]);

    const scrub = useCallback(
      event => {
        if (scrubberRef.current) {
          const scrubberRect = scrubberRef.current.getBoundingClientRect();
          const percent =
            (event.clientX - scrubberRect.left) / scrubberRect.width;
          setScrubTime(duration * percent);
        }
      },
      [duration],
    );

    const seek = useCallback(
      event => {
        if (scrubberRef.current) {
          const scrubberRect = scrubberRef.current.getBoundingClientRect();
          const percent =
            (event.clientX - scrubberRect.left) / scrubberRect.width;
          videoRef.current.currentTime = duration * percent;
        }
      },
      [duration, videoRef],
    );

    const louder = useCallback(() => {
      videoRef.current.volume += VOLUME_STEP;
    }, [videoRef]);

    const quieter = useCallback(() => {
      videoRef.current.volume -= VOLUME_STEP;
    }, [videoRef]);

    const showCaptions = index => {
      const { textTracks } = videoRef.current;
      for (let i = 0; i < textTracks.length; i += 1) {
        textTracks[i].mode = i === index ? 'showing' : 'hidden';
      }
    };

    const fullscreen = useCallback(() => {
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
        console.warn("This browser doesn't support fullscreen.");
      }
    }, [videoRef]);

    let controlsElement;
    if (controls) {
      const over = controls === 'over';
      const background = over
        ? (theme.video.controls && theme.video.controls.background) || {
            color: 'background-back',
            opacity: 'strong',
            dark: true,
          }
        : undefined;
      const iconColor = over && (theme.video.icons.color || 'text');

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
        onClick: () => showCaptions(caption.active ? -1 : 0),
      }));

      controlsElement = (
        <StyledVideoControls
          over={over}
          active={!hasPlayed || controls === 'below' || (over && interacting)}
          onBlur={() => {
            if (!containsFocus(containerRef.current)) setInteracting(false);
          }}
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
                  <Icons.Pause
                    color={iconColor}
                    a11yTitle={messages.pauseButton}
                  />
                ) : (
                  <Icons.Play
                    color={iconColor}
                    a11yTitle={messages.playButton}
                  />
                )
              }
              hoverIndicator="background"
              onClick={playing ? pause : play}
            />
            <Box direction="row" align="center" flex>
              <Box flex>
                <Stack>
                  <Meter
                    aria-label={messages.progressMeter}
                    background={
                      over
                        ? (theme.video.scrubber &&
                            theme.video.scrubber.track &&
                            theme.video.scrubber.track.color) ||
                          'dark-3'
                        : undefined
                    }
                    size="full"
                    thickness="small"
                    values={[{ value: percentagePlayed || 0 }]}
                  />
                  <StyledVideoScrubber
                    aria-label={messages.scrubber}
                    ref={scrubberRef}
                    tabIndex={0}
                    role="button"
                    value={
                      scrubTime
                        ? Math.round((scrubTime / duration) * 100)
                        : undefined
                    }
                    onMouseMove={scrub}
                    onMouseLeave={() => setScrubTime(undefined)}
                    onClick={seek}
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
              messages={{
                openMenu: messages.openMenu,
                closeMenu: messages.closeMenu,
              }}
              items={[
                {
                  icon: (
                    <Icons.Volume
                      color={iconColor}
                      a11yTitle={messages.volumeUp}
                    />
                  ),
                  onClick: volume <= 1 - VOLUME_STEP ? louder : undefined,
                  close: false,
                },
                {
                  icon: (
                    <Icons.ReduceVolume
                      color={iconColor}
                      a11yTitle={messages.volumeDown}
                    />
                  ),
                  onClick: volume >= VOLUME_STEP ? quieter : undefined,
                  close: false,
                },
                ...captionControls,
                {
                  icon: (
                    <Icons.FullScreen
                      color={iconColor}
                      a11yTitle={messages.fullScreen}
                    />
                  ),
                  onClick: fullscreen,
                },
              ]}
            />
          </Box>
        </StyledVideoControls>
      );
    }

    let mouseEventListeners;
    if (controls === 'over') {
      mouseEventListeners = {
        onMouseEnter: () => setInteracting(true),
        onMouseMove: () => setInteracting(true),
        onTouchStart: () => setInteracting(true),
      };
    }

    let style;
    if (rest.fit === 'contain' && controls === 'over') {
      // constrain the size to fit the aspect ratio so the controls
      // overlap correctly
      if (width) {
        style = { width };
      } else if (height) {
        style = { height };
      }
    }

    return (
      <StyledVideoContainer
        ref={containerRef}
        {...mouseEventListeners}
        alignSelf={alignSelf}
        gridArea={gridArea}
        margin={margin}
        style={style}
      >
        <StyledVideo
          {...rest}
          ref={videoRef}
          onDurationChange={event => {
            const video = videoRef.current;
            setDuration(video.duration);
            setPercentagePlayed((video.currentTime / video.duration) * 100);
            if (onDurationChange) onDurationChange(event);
          }}
          onEnded={event => {
            setPlaying(false);
            if (onEnded) onEnded(event);
          }}
          onPause={event => {
            setPlaying(false);
            if (onPause) onPause(event);
          }}
          onPlay={event => {
            setPlaying(true);
            setHasPlayed(true);
            if (onPlay) onPlay(event);
          }}
          onTimeUpdate={event => {
            const video = videoRef.current;
            setCurrentTime(video.currentTime);
            setPercentagePlayed((video.currentTime / video.duration) * 100);
            if (onTimeUpdate) onTimeUpdate(event);
          }}
          onVolumeChange={event => {
            setVolume(videoRef.current.volume);
            if (onVolumeChange) onVolumeChange(event);
          }}
          autoPlay={autoPlay || false}
          loop={loop || false}
        >
          {children}
        </StyledVideo>
        {controlsElement}
      </StyledVideoContainer>
    );
  },
);

Video.defaultProps = {
  messages: {
    closeMenu: 'close menu',
    fullScreen: 'full screen',
    progressMeter: 'video progress',
    scrubber: 'scrubber',
    openMenu: 'open menu',
    pauseButton: 'pause',
    playButton: 'play',
    volumeDown: 'volume down',
    volumeUp: 'volume up',
  },
};

Video.displayName = 'Video';

let VideoDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  VideoDoc = require('./doc').doc(Video);
}
const VideoWrapper = VideoDoc || Video;

export { VideoWrapper as Video };
