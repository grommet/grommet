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

  state = {
    audioRef: React.createRef(),
    rangeInputValue: 1,
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

    this.setState({
      duration: audio.duration,
      playing: !audio.paused,
      interacting,
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
    this.setState({ rangeInputValue: value });
  };

  renderControls() {
    const { theme } = this.props;
    const { duration, interacting, playing, rangeInputValue } = this.state;

    const background = (theme.audio.controls &&
      theme.audio.controls.background) || {
      color: 'dark-1',
      opacity: 'strong',
    };

    const formattedTime = formatTime(duration);
    const Icons = {
      Pause: theme.audio.icons.pause,
      Play: theme.audio.icons.play,
      Volume: theme.audio.icons.volume,
    };

    return (
      <StyledAudioControls active={interacting}>
        <Box
          direction="row"
          align="center"
          justify="between"
          background={background}
        >
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
            <Box pad={{ horizontal: 'small' }}>
              <Text textAlign="center" margin="none">
                {duration ? formattedTime : ''}
              </Text>
            </Box>
          </Box>
          <Box
            pad={{ horizontal: 'small' }}
            direction="row"
            align="center"
            gap="xsmall"
          >
            {/* make hover to show hide on responsive  */}
            <Icons.Volume color="white" />
            <RangeInput
              min={0}
              max={1}
              step={0.1}
              size="full"
              round="large"
              values={rangeInputValue}
              onChange={event => this.setVolume(event.target.value)}
            />
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
