import React, { Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { Box } from '../Box';
import { Button } from '../Button';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { withForwardRef } from '../hocs';

// import { defaultProps } from '../../default-props';

import { formatTime } from '../../utils';

import { StyledAudio, StyledAudioControls, StyledAudioContainer } from './StyledAudio';

class Audio extends Component {

    state = {
        audioRef: React.createRef(),
    };

    componentDidMount() {
        // const { audioRef } = this.state;
        // const audio = audioRef.current;
    }

    componentDidUpdate(prevProps) {
        const { autoPlay } = this.props;
        if (autoPlay && !prevProps.autoPlay) {
            // Caller wants the video to play now.
            this.play();
        }
        this.restate();
    }

    update = () => {
        const { audioRef } = this.state;
        const audio = audioRef.current;

        this.setState({
            duration: audio.duration,
            playing: !audio.paused,
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

    unmute = () => {
        const { audioRef } = this.state;
        if (audioRef.current) {
            audioRef.current.muted = false;
        }
    };

    mute = () => {
        const { audioRef } = this.state;
        if (audioRef.current) {
            audioRef.current.muted = true;
        }
    };

    renderControls() {
        const { theme } = this.props;
        const { duration, playing } = this.state;

        const background = (theme.audio.controls && theme.audio.controls.background) || {
            color: 'dark-1',
            opacity: 'strong',
        }
    
        const formattedTime = formatTime(duration);

        const Icons = {
            Pause: theme.audio.icons.pause, 
            Play: theme.audio.icons.play,
            Volume: theme.audio.icons.volume,
        };

        return (
          <StyledAudioControls>
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
                    <Icons.Pause color="white" />
                  ) : (
                    <Icons.Play color="white" />
                  )
                }
                hoverIndicator="background"
                onClick={playing ? this.pause : this.play}
              />
              <Text textAlign="center" margin="none">{formattedTime}</Text>
            </Box>
            <Box pad={{ horizontal: 'small' }}>
              <Button
                icon={<Icons.Volume color="white" />}
                hoverIndicator="background"
                onClick={playing ? this.pause : this.play}
              />
            </Box>
            </Box>
          </StyledAudioControls>
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
            muted,
            // theme,
            ...rest
        } = this.props;

        const { audioRef, height, width} = this.state;

        const controlsElement = this.renderControls();

        const mouseEventListeners = {
            onMouseEnter: this.interactionStart,
            onMouseMove: this.interactionStart,
            onTouchStart: this.interactionStart,
        };

        let style;
        if (width) {
            style = { width };
          } else if (height) {
            style = { height };
          }

        return (
          <StyledAudioContainer
            {...mouseEventListeners}
            alignSelf={alignSelf}
            gridArea={gridArea}
            margin={margin}
            style={style}
          >
            <Stack fill>
              <StyledAudio 
                autoPlay={autoPlay || false} 
                loop={loop || false}
                muted={muted || false}
                ref={audioRef} 
                {...rest}
              >
              {children}
              </StyledAudio>
            {controlsElement}
            </Stack>
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
