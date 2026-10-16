import React, {
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled, { css } from 'styled-components';

import { Box } from '../Box';
import { Text } from '../Text';
import { FormContext } from '../Form/FormContext';
import {
  focusStyle,
  normalizeColor,
  parseMetricToNum,
  useForwardedRef,
} from '../../utils';
import { DualRangeInputPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';

const thumbStyle = (props) => css`
  box-sizing: border-box;
  position: relative;
  border-radius: ${props.theme.global.spacing};
  height: ${props.theme.global.spacing};
  width: ${props.theme.global.spacing};
  overflow: visible;
  background: ${normalizeColor(
    props.theme.rangeInput?.thumb?.color || 'control',
    props.theme,
  )};
  -webkit-appearance: none;
  cursor: pointer;
  pointer-events: all;
  ${props.theme.rangeInput?.thumb?.extend || ''}
`;

const hoverThumbStyle = (props) => css`
  box-shadow: 0px 0px 0px 2px
    ${normalizeColor(
      props.theme.rangeInput?.thumb?.color || 'control',
      props.theme,
    )};
`;

const trackHeight = (props) => props.theme.rangeInput?.track?.height || '4px';

const StyledDualRangeInputContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: ${(props) => props.theme.global.spacing};
`;

const StyledTrack = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: ${(props) => trackHeight(props)};
  transform: translateY(-50%);
  border-radius: ${(props) => trackHeight(props)};
  background: ${(props) => {
    const trackColor = props.theme.rangeInput?.track?.color || 'border';
    const opacity = props.theme.rangeInput?.track?.opacity;
    const color = normalizeColor(trackColor, props.theme);
    if (opacity !== undefined) {
      return `rgba(${color}, ${opacity})`;
    }
    return color;
  }};
  ${(props) => props.theme.rangeInput?.track?.extend || ''}
`;

const StyledActiveTrack = styled.div`
  position: absolute;
  top: 50%;
  height: ${(props) => trackHeight(props)};
  transform: translateY(-50%);
  border-radius: ${(props) => trackHeight(props)};
  background: ${(props) =>
    normalizeColor(props.color || 'control', props.theme)};
`;

const StyledRangeInput = styled.input`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-appearance: none;
  background: transparent;
  margin: 0;
  padding: 0;
  pointer-events: none;
  cursor: pointer;
  z-index: ${(props) => props.$zIndex || 1};

  &::-moz-focus-inner {
    border: none;
  }
  &::-moz-focus-outer {
    border: none;
  }

  /* Webkit thumb */
  &::-webkit-slider-thumb {
    ${(props) => thumbStyle(props)}
    margin-top: -${(props) =>
      (parseMetricToNum(props.theme.global.spacing) -
        parseMetricToNum(trackHeight(props))) *
      0.5}px;
    ${(props) =>
      !props.disabled &&
      css`
        &:hover {
          ${hoverThumbStyle(props)}
        }
      `}
  }

  /* Webkit track — invisible since we draw our own */
  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    background: transparent;
    height: ${(props) => trackHeight(props)};
  }

  /* Firefox thumb */
  &::-moz-range-thumb {
    ${(props) => thumbStyle(props)}
    border: none;
    ${(props) =>
      !props.disabled &&
      css`
        &:hover {
          ${hoverThumbStyle(props)}
        }
      `}
  }

  /* Firefox track — invisible */
  &::-moz-range-track {
    background: transparent;
    height: ${(props) => trackHeight(props)};
  }

  &:focus::-webkit-slider-thumb {
    ${(props) => props.$showFocus && focusStyle()}
  }

  &:focus::-moz-range-thumb {
    ${(props) => props.$showFocus && focusStyle()}
  }

  &:focus-visible {
    outline: 0;
  }
  &:focus {
    outline: none;
  }

  ${(props) => props.theme.rangeInput?.extend || ''}
`;

const DualRangeInput = forwardRef(
  (
    {
      a11yTitle,
      color,
      defaultValues,
      label,
      min = 0,
      max = 100,
      messages = { lower: 'Lower Bound', upper: 'Upper Bound' },
      name,
      onChange,
      step = 1,
      values: valuesProp,
      ...rest
    },
    ref,
  ) => {
    const { theme } = useThemeValue();
    const formContext = useContext(FormContext);
    const containerRef = useForwardedRef(ref);
    const lowerRef = useRef();
    const upperRef = useRef();
    const [focusedThumb, setFocusedThumb] = useState(null);

    const [values, setValues] = formContext.useFormInput({
      name,
      value: valuesProp,
      initialValue: defaultValues || [min, max],
    });

    const [lower, upper] = values;

    const change = useCallback(
      (nextValues) => {
        setValues(nextValues);
        if (onChange) onChange(nextValues);
      },
      [onChange, setValues],
    );

    const lowerPercent = useMemo(
      () => ((lower - min) / (max - min)) * 100,
      [lower, min, max],
    );
    const upperPercent = useMemo(
      () => ((upper - min) / (max - min)) * 100,
      [upper, min, max],
    );

    // Determine which slider should be on top based on proximity to max
    // When both thumbs are at the same position, we need the lower thumb
    // to be grabbable when at min, and upper when at max
    const lowerOnTop = lower === upper && lower === max;

    const handleLowerChange = useCallback(
      (event) => {
        const newValue = Number(event.target.value);
        if (newValue <= upper) {
          change([newValue, upper]);
        }
      },
      [change, upper],
    );

    const handleUpperChange = useCallback(
      (event) => {
        const newValue = Number(event.target.value);
        if (newValue >= lower) {
          change([lower, newValue]);
        }
      },
      [change, lower],
    );

    const content = (
      <StyledDualRangeInputContainer
        ref={containerRef}
        theme={theme}
        {...(label ? {} : rest)}
      >
        {/* Background track */}
        <StyledTrack theme={theme} />

        {/* Active range track */}
        <StyledActiveTrack
          theme={theme}
          color={color}
          style={{
            left: `${lowerPercent}%`,
            width: `${upperPercent - lowerPercent}%`,
          }}
        />

        {/* Lower range input */}
        <StyledRangeInput
          ref={lowerRef}
          type="range"
          aria-label={messages.lower || 'Lower Bound'}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={lower}
          min={min}
          max={max}
          step={step}
          value={lower}
          onChange={handleLowerChange}
          onFocus={() => setFocusedThumb('lower')}
          onBlur={() => setFocusedThumb(null)}
          $showFocus={focusedThumb === 'lower'}
          $zIndex={lowerOnTop ? 3 : 2}
          theme={theme}
        />

        {/* Upper range input */}
        <StyledRangeInput
          ref={upperRef}
          type="range"
          aria-label={messages.upper || 'Upper Bound'}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={upper}
          min={min}
          max={max}
          step={step}
          value={upper}
          onChange={handleUpperChange}
          onFocus={() => setFocusedThumb('upper')}
          onBlur={() => setFocusedThumb(null)}
          $showFocus={focusedThumb === 'upper'}
          $zIndex={lowerOnTop ? 2 : 3}
          theme={theme}
        />
      </StyledDualRangeInputContainer>
    );

    if (label) {
      return (
        <Box direction="row" align="center" fill {...rest}>
          <Text size="small" margin={{ horizontal: 'small' }}>
            {typeof label === 'function' ? label(lower) : lower}
          </Text>
          {content}
          <Text size="small" margin={{ horizontal: 'small' }}>
            {typeof label === 'function' ? label(upper) : upper}
          </Text>
        </Box>
      );
    }

    return content;
  },
);

DualRangeInput.displayName = 'DualRangeInput';
DualRangeInput.propTypes = DualRangeInputPropTypes;

export { DualRangeInput };
