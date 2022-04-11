import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { ThemeContext } from 'styled-components';
import { MessageContext } from '../../contexts/MessageContext';
import { defaultProps } from '../../default-props';

import { useForwardedRef } from '../../utils/refs';
import { formatTime } from '../../utils/media';
import { Box } from '../Box';
import { Button } from '../Button';
import { Drop } from '../Drop';
import { Keyboard } from '../Keyboard';
import { Meter } from '../Meter';
import { RangeInput } from '../RangeInput';
import { Stack } from '../Stack';
import { Text } from '../Text';

import {
  StyledAudio,
  StyledAudioControls,
  StyledAudioContainer,
  StyledAudioScrubber,
} from './StyledAudio';

const Audio = forwardRef(
  (
    {
      a11yTitle,
      'aria-label': ariaLabel,
      alignSelf,
      autoPlay,
      children,
      controls,
      gridArea,
      loop,
      margin,
      messages,
      onDurationChange,
      onPause,
      onPlay,
      onTimeUpdate,
      onVolumeChange,
      ...rest
    },
    ref,
  ) => {
    // context
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const { format } = useContext(MessageContext);

    // states
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState();
    const [playing, setPlaying] = useState(false);
    const [percentagePlayed, setPercentagePlayed] = useState(0);
    const [scrubTime, setScrubTime] = useState();
    const [showVolume, setShowVolume] = useState(false);
    const [volumeValue, setVolumeValue] = useState(0);

    // refs
    const scrubberRef = useRef();
    const volumeRef = useRef();
    const audioRef = useForwardedRef(ref);

    // variables
    const startTime = '00:00';
    const durationFormattedTime = `/ ${formatTime(duration)}`;
    const scrubFormattedTime = formatTime(currentTime);
    const Icons = {
      Mute: theme.audio.icons.mute,
      Pause: theme.audio.icons.pause,
      Play: theme.audio.icons.play,
      Volume: theme.audio.icons.volume,
      VolumeMiddle: theme.audio.icons.volumeMiddle,
    };

    // when the audio is first rendered, set state of the audio's attributes
    useEffect(() => {
      const audio = audioRef.current;
      if (audio) {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
        setVolumeValue(audioRef.current.volume);
      }
    }, [audioRef]);

    const play = useCallback(() => audioRef.current.play(), [audioRef]);

    const pause = useCallback(() => audioRef.current.pause(), [audioRef]);

    const scrub = useCallback(
      (event) => {
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
      (event) => {
        if (scrubberRef.current) {
          const scrubberRect = scrubberRef.current.getBoundingClientRect();
          const percent =
            (event.clientX - scrubberRect.left) / scrubberRect.width;
          if (duration) audioRef.current.currentTime = duration * percent;
        }
      },
      [duration, audioRef],
    );

    const onVolume = useCallback(
      (event) => {
        audioRef.current.volume = event.target.value;
      },
      [audioRef],
    );

    const retainAudioFocus = useCallback(() => {
      console.log('retain', volumeRef.current.focus());
      if (showVolume) {
        // event.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation();
        setShowVolume(false);
        volumeRef.current.focus(); // NOT WORKING?
      }
    }, [showVolume]);

    const rangeInputTheme = useMemo(() => {
      // Use the audio's rangeInput styling for the rangeInput volume rendering
      theme.rangeInput = theme.audio.rangeInput;
      theme.global.spacing = theme.audio.rangeInput.thumb.spacing;
      return theme;
    }, [theme]);

    const volumeIconColor = useMemo(
      // Match the volume's icon color to rangeInput color
      () =>
        showVolume
          ? theme.audio.rangeInput &&
            theme.audio.rangeInput.track &&
            theme.audio.rangeInput.track.lower &&
            theme.audio.rangeInput.track.lower.color
          : theme.audio.icons.color,
      [showVolume, theme.audio.icons.color, theme.audio.rangeInput],
    );

    const scrubber = (
      <Stack>
        <Box>
          <Meter
            margin="none"
            aria-label={format({
              id: 'audio.progressMeter',
              messages,
            })}
            background={
              (theme.audio.scrubber && theme.audio.scrubber.color) || 'dark-3'
            }
            size="full"
            thickness="small"
            values={[{ value: percentagePlayed }]}
          />
        </Box>
        <StyledAudioScrubber
          aria-label={format({
            id: 'audio.scrubber',
            messages,
          })}
          ref={scrubberRef}
          tabIndex={0}
          role="button"
          value={
            scrubTime ? Math.round((scrubTime / duration) * 100) : undefined
          }
          onMouseMove={scrub}
          onMouseLeave={() => setScrubTime(undefined)}
          onClick={seek}
        />
      </Stack>
    );

    const playControl = (
      <Button
        icon={
          playing ? (
            <Icons.Pause color={theme.audio.icons.color} />
          ) : (
            <Icons.Play color={theme.audio.icons.color} />
          )
        }
        a11yTitle={format({
          id: playing ? 'audio.playButton' : 'audio.pauseButton',
          messages,
        })}
        hoverIndicator="background"
        onClick={playing ? pause : play}
      />
    );

    const timeControl = (
      <Box direction="row" gap="xsmall">
        {!!duration && // Avoid presenting 'NaN' when the audio isn't loaded
          [scrubFormattedTime, durationFormattedTime].map((time) => (
            <Text key={time} color={theme.audio.controls.text.color}>
              {time || startTime}
            </Text>
          ))}
      </Box>
    );

    const volumeButtonControl = (
      // Dispatch volume color according to volumeValue
      <Button
        icon={
          (volumeValue === 0 && <Icons.Mute color={volumeIconColor} />) ||
          (volumeValue < 0.5 && (
            <Icons.VolumeMiddle color={volumeIconColor} />
          )) || <Icons.Volume color={volumeIconColor} />
        }
        a11yTitle={format({
          id: 'audio.volume',
          messages,
        })}
        hoverIndicator="background"
        onClick={() => setShowVolume(!showVolume)}
        onFocus={() => console.log('shimi')}
        ref={volumeRef}
      />
    );

    const volumeRangeInput = (
      <Keyboard
        key="volume-drop"
        onEsc={() => {
          setShowVolume(false);
          volumeRef.current.focus();
        }}
      >
        <Drop
          target={volumeRef.current}
          key="audio-volume-drop"
          onBlur={retainAudioFocus}
          {...theme.audio.drop}
        >
          <Box pad="xsmall" animation={theme.audio.rangeInput.animation}>
            <RangeInput
              min={0}
              max={1}
              step={0.1}
              value={volumeValue}
              onChange={(event) => {
                setVolumeValue(event.target.value);
                onVolume(event);
              }}
              theme={rangeInputTheme}
            />
          </Box>
        </Drop>
      </Keyboard>
    );

    const controlElements = (
      <StyledAudioControls>
        {scrubber}
        {/* Buttons & Time Panel */}
        <Box
          direction="row"
          justify="between"
          align="center"
          background={
            (theme.audio.controls && theme.audio.controls.background) || {
              color: 'background-back',
              opacity: 'strong',
              dark: true,
            }
          }
        >
          {showVolume ? (
            <Box direction="row" align="center" gap="small">
              {playControl}
              <Box animation={theme.audio.animation.open}>{timeControl}</Box>
            </Box>
          ) : (
            <>
              {playControl}
              <Box animation={theme.audio.animation.close}>{timeControl}</Box>
            </>
          )}
          {volumeButtonControl}
          {showVolume && volumeRangeInput}
        </Box>
      </StyledAudioControls>
    );

    return (
      <StyledAudioContainer
        alignSelf={alignSelf}
        gridArea={gridArea}
        margin={margin}
      >
        <StyledAudio
          ref={audioRef}
          aria-label={ariaLabel || a11yTitle}
          autoPlay={autoPlay || false}
          loop={loop || false}
          onPause={(event) => {
            setPlaying(false);
            if (onPause) onPause(event);
          }}
          onPlay={(event) => {
            setPlaying(true);
            if (onPlay) onPlay(event);
          }}
          onDurationChange={(event) => {
            const audio = audioRef.current;
            setDuration(audio.duration);
            setPercentagePlayed((audio.currentTime / audio.duration) * 100);
            if (onDurationChange) onDurationChange(event);
          }}
          onTimeUpdate={(event) => {
            const audio = audioRef.current;
            setCurrentTime(audio.currentTime);
            setPercentagePlayed((audio.currentTime / audio.duration) * 100);
            if (onTimeUpdate) onTimeUpdate(event);
          }}
          onVolumeChange={(event) => {
            setVolumeValue(audioRef.current.volume);
            if (onVolumeChange) onVolumeChange(event);
          }}
          {...rest}
        >
          {children}
        </StyledAudio>
        {controls && controlElements}
      </StyledAudioContainer>
    );
  },
);

Audio.defaultProps = {};
Audio.displayName = 'Audio';

export { Audio };
