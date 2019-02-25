import React, { Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { Box } from '../Box';
import { Button } from '../Button';
import { RangeInput } from '../RangeInput';
import { Text } from '../Text';
import { withForwardRef } from '../hocs';

import { throttle, formatTime, mediaEvents } from '../../utils';

import {
  StyledAudio,
  StyledAudioContainer,
  StyledAudioControls,
} from './StyledAudio';

class Audio extends Component {
  static defaultProps = {
    controls: true,
    mute: false,
    loop: false,
  };

  // default value for step before it is calculated according to the audio duration
  scrubberStep = 0.1;

  state = {
    audioRef: React.createRef(),
    volumeValue: 1,
    scrubberValue: 0,
  };

  constructor(props) {
    super(props);
    this.update = throttle(this.update, 100, this);
    this.mediaEventProps = this.injectUpdateAudioEvents();
  }

  injectUpdateAudioEvents = () =>
    mediaEvents.reduce((previousValue, currentValue) => {
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
    const { audioRef } = this.state;
    const audio = audioRef.current;

    let { interacting } = this.state;
    if (audio && audio.ended) {
      interacting = false;
    }

    let scrubberUpdate = 0;
    if (audio.duration) {
      // smooth scrubbing - total number of segments to use for the scrubber are equal to the duration in milliseconds
      // the step is reciprocal to the number of segments for smooth transition
      this.scrubberStep = 1 / (audio.duration * 1000);
      scrubberUpdate = audio.currentTime / audio.duration;
    }

    this.setState({
      currentTime: audio.currentTime,
      duration: audio.duration,
      interacting,
      playing: !audio.paused,
      scrubberValue: scrubberUpdate,
    });
  };

  play = () => {
    const { audioRef } = this.state;
    audioRef.current.play();
  };

  pause = () => {
    const { audioRef } = this.state;
    audioRef.current.pause();
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

  setVolume = value => {
    const { audioRef } = this.state;
    audioRef.current.volume = value;
    this.setState({ volumeValue: value });
  };

  seek = value => {
    const { audioRef, duration } = this.state;

    if (audioRef.current) {
      const precentageProgress = value * duration;
      audioRef.current.currentTime = precentageProgress;
      this.setState({ scrubberValue: value });
    }
  };

  renderControls() {
    const { theme } = this.props;
    const {
      currentTime,
      duration,
      interacting,
      playing,
      scrubberValue,
      volumeValue,
    } = this.state;

    const background = (theme.audio.controls &&
      theme.audio.controls.background) || {
      color: 'dark-1',
      opacity: 'strong',
    };

    const durationFormattedTime = formatTime(duration);
    const scrubFormattedTime = formatTime(currentTime);

    const Icons = {
      Pause: theme.audio.icons.pause,
      Play: theme.audio.icons.play,
      Volume: theme.audio.icons.volume,
    };

    return (
      <StyledAudioControls active={interacting}>
        <Box direction="column" background={background}>
          <RangeInput
            min={0}
            max={1}
            step={this.scrubberStep}
            value={scrubberValue}
            onChange={event => this.seek(event.target.value)}
          />
          <Box direction="row" align="center" justify="between">
            <Box align="center" direction="row">
              <Button
                icon={
                  playing ? (
                    <Icons.Pause color={theme.audio.icons.color} />
                  ) : (
                    <Icons.Play color={theme.audio.icons.color} />
                  )
                }
                hoverIndicator="background"
                onClick={playing ? this.pause : this.play}
              />
              <Box pad={{ horizontal: 'xsmall' }} direction="row" gap="xsmall">
                <Text textAlign="center" margin="none">
                  {scrubFormattedTime || '00:00'}
                </Text>
                <Text
                  textAlign="center"
                  margin="none"
                  color={theme.audio.controls.text.color}
                >
                  {durationFormattedTime}
                </Text>
              </Box>
            </Box>
            <Box
              pad={{ horizontal: 'xsmall' }}
              direction="row"
              align="center"
              gap="xsmall"
            >
              {/* TODO make hover to show hide on responsive  */}
              <Icons.Volume color={theme.audio.icons.color} />
              <RangeInput
                min={0}
                max={1}
                step={0.1}
                value={volumeValue}
                onChange={event => this.setVolume(event.target.value)}
              />
            </Box>
          </Box>
        </Box>
      </StyledAudioControls>
    );
  }

  render() {
    const {
      alignSelf,
      autoplay,
      children,
      controls,
      gridArea,
      loop,
      margin,
      muted,
      ...rest
    } = this.props;

    const { audioRef } = this.state;

    const controlsElement = controls ? this.renderControls() : undefined;

    const mouseEventListeners = {
      onMouseEnter: this.interactionStart,
      onMouseMove: this.interactionStart,
      onTouchStart: this.interactionStart,
    };

    return (
      <StyledAudioContainer
        {...mouseEventListeners}
        alignSelf={alignSelf}
        gridArea={gridArea}
        margin={margin}
      >
        <StyledAudio
          {...rest}
          {...this.mediaEventProps}
          autoPlay={autoplay || false}
          loop={loop}
          muted={muted}
          ref={audioRef}
        >
          {children}
        </StyledAudio>
        {controlsElement}
      </StyledAudioContainer>
    );
  }
}

let AudioDoc;
if (process.env.NODE_ENV !== 'production') {
  AudioDoc = require('./doc').doc(Audio); // eslint-disable-line global-require
}
const AudioWrapper = compose(
  withTheme,
  withForwardRef,
)(AudioDoc || Audio);

export { AudioWrapper as Audio };
