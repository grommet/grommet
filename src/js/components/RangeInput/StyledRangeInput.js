import { rgba } from 'polished';
import styled, { css } from 'styled-components';

import { focusStyle, normalizeColor, parseMetricToNum } from '../../utils';
import { defaultProps } from '../../default-props';

// opacity of the bound trumps the track opacity
const getBoundOpacity = (props, bound) =>
  props.theme.rangeInput &&
  props.theme.rangeInput.track &&
  props.theme.rangeInput.track[bound] &&
  props.theme.rangeInput.track[bound].opacity
    ? props.theme.rangeInput.track[bound].opacity
    : 1;

const getBoundColor = (props, bound) => {
  if (
    props.theme.rangeInput &&
    props.theme.rangeInput.track &&
    props.theme.rangeInput.track[bound] &&
    props.theme.rangeInput.track[bound].color
  ) {
    return rgba(
      normalizeColor(props.theme.rangeInput.track[bound].color, props.theme),
      getBoundOpacity(props, bound),
    );
  }
  // If bound color is undefined pick the default track color with bound opacity
  return rgba(
    normalizeColor(props.theme.rangeInput.track.color, props.theme),
    getBoundOpacity(props, bound),
  );
};

const trackColorStyle = props => {
  // backward compatibility in case no bounds are defined
  if (
    props.theme.rangeInput &&
    props.theme.rangeInput.track &&
    !props.theme.rangeInput.track.lower &&
    !props.theme.rangeInput.track.upper
  ) {
    const color = rgba(
      normalizeColor(props.theme.rangeInput.track.color, props.theme),
      0.2,
    );
    // Since the track color was changed from border-with-opacity to just border
    // this condition is used to make sure we are applying the opacity correctly
    // for 'border' color (for backward compatibility purposes).
    if (color === 'rgba(0,0,0,0.2)') return `background: ${color}`;

    // no bounds are defined but color may have changed
    return `background: ${rgba(
      normalizeColor(props.theme.rangeInput.track.color, props.theme),
      props.theme.rangeInput.track.opacity || 1,
    )}`;
  }

  const max = props.max || 100; // 'max' defaults to 100 in case not specified
  const min = props.min || 0; // 'min' defaults to 0 in case not specified
  const thumbPosition = `${((props.value - min) / (max - min)) * 100}%`;

  const lowerTrackColor = getBoundColor(props, 'lower');
  const upperTrackColor = getBoundColor(props, 'upper');

  return `background: linear-gradient(
      to right,
      ${lowerTrackColor},
      ${lowerTrackColor} ${thumbPosition},
      ${upperTrackColor} ${thumbPosition},
      ${upperTrackColor}
    );
  `;
};

const rangeTrackStyle = css`
  box-sizing: border-box;
  width: 100%;
  height: ${props => props.theme.rangeInput.track.height};
  ${props => trackColorStyle(props)};
  ${props =>
    props.theme.rangeInput &&
    props.theme.rangeInput.track &&
    props.theme.rangeInput.track.extend}
`;

const rangeThumbStyle = css`
  box-sizing: border-box;
  position: relative;
  border-radius: ${props => props.theme.global.spacing};
  height: ${props => props.theme.global.spacing};
  width: ${props => props.theme.global.spacing};
  overflow: visible;
  background: ${props =>
    normalizeColor(
      props.theme.rangeInput.thumb.color || 'control',
      props.theme,
    )};
  -webkit-appearance: none;
  cursor: pointer;
  ${props =>
    props.theme.rangeInput &&
    props.theme.rangeInput.thumb &&
    props.theme.rangeInput.thumb.extend}
`;

const firefoxMicrosoftThumbStyle = css`
  ${rangeThumbStyle} margin-top: 0px;
  height: ${props => props.theme.global.spacing};
  width: ${props => props.theme.global.spacing};
  ${props =>
    props.theme.rangeInput &&
    props.theme.rangeInput.thumb &&
    props.theme.rangeInput.thumb.extend}
`;

/* eslint-disable max-len */
const StyledRangeInput = styled.input`
  box-sizing: border-box;
  position: relative;
  -webkit-appearance: none;
  border-color: transparent;
  height: ${props => props.theme.global.spacing};
  width: 100%;
  padding: 0px;
  cursor: pointer;
  background: transparent;

  &::-moz-focus-inner {
    border: none;
  }

  &::-moz-focus-outer {
    border: none;
  }

  &::-webkit-slider-runnable-track {
    ${rangeTrackStyle}
  }

  &::-webkit-slider-thumb {
    margin-top: -${props => (parseMetricToNum(props.theme.global.spacing) - parseMetricToNum(props.theme.rangeInput.track.height || 0)) * 0.5}px;
    ${rangeThumbStyle}

    ${props =>
      !props.disabled &&
      css`
        &:hover {
          box-shadow: 0px 0px 0px 2px
            ${normalizeColor(
              props.theme.rangeInput.thumb.color || 'control',
              props.theme,
            )};
        }
      `}
  }

  &::-moz-range-track {
    ${rangeTrackStyle}
  }

  &::-moz-range-thumb {
    ${firefoxMicrosoftThumbStyle}
  }

  &::-ms-thumb {
    ${firefoxMicrosoftThumbStyle}
  }

  ${props =>
    !props.disabled &&
    css`
      &:hover::-moz-range-thumb {
        box-shadow: 0px 0px 0px 2px
          ${normalizeColor(
            props.theme.rangeInput.thumb.color || 'control',
            props.theme,
          )};
      }

      &:hover::-ms-thumb {
        box-shadow: 0px 0px 0px 2px
          ${normalizeColor(
            props.theme.rangeInput.thumb.color || 'control',
            props.theme,
          )};
      }
    `}

  &::-ms-track {
    ${rangeTrackStyle}
    border-color: transparent;
    color: transparent;
  }

  &::-ms-fill-lower {
    ${props => trackColorStyle(props, 'lower')};
    border-color: transparent;
  }

  &::-ms-fill-upper {
    ${props => trackColorStyle(props, 'upper')};
    border-color: transparent;
  }

  ${props => props.focus && focusStyle()}
  ${props => props.theme.rangeInput && props.theme.rangeInput.extend}
`;
/* eslint-enable max-len */

StyledRangeInput.defaultProps = {};
Object.setPrototypeOf(StyledRangeInput.defaultProps, defaultProps);

export { StyledRangeInput };
