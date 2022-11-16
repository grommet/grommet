import styled, { css } from 'styled-components';

import {
  disabledStyle,
  edgeStyle,
  focusStyle,
  normalizeColor,
  parseMetricToNum,
  getRGBA,
} from '../../utils';
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
    return getRGBA(
      normalizeColor(props.theme.rangeInput.track[bound].color, props.theme),
      getBoundOpacity(props, bound),
    );
  }
  // If bound color is undefined pick the default track color with bound opacity
  return getRGBA(
    normalizeColor(props.theme.rangeInput.track.color, props.theme),
    getBoundOpacity(props, bound),
  );
};

const trackColorStyle = (props) => {
  const { max, min } = props;
  const thumbPosition = `${(((props.value || 0) - min) / (max - min)) * 100}%`;
  let defaultTrackColor;

  // backward compatibility in case no bounds are defined
  if (
    props.theme.rangeInput &&
    props.theme.rangeInput.track &&
    !props.theme.rangeInput.track.lower &&
    !props.theme.rangeInput.track.upper
  ) {
    const color = getRGBA(
      normalizeColor(props.theme.rangeInput.track.color, props.theme),
      0.2,
    );
    // Since the track color was changed from border-with-opacity to just border
    // this condition is used to make sure we are applying the opacity correctly
    // for 'border' color (for backward compatibility purposes).
    if (color === 'rgba(0, 0, 0, 0.2)') {
      defaultTrackColor = color;
    }
    // no bounds are defined but color may have changed
    else {
      defaultTrackColor = getRGBA(
        normalizeColor(props.theme.rangeInput.track.color, props.theme),
        props.theme.rangeInput.track.opacity || 1,
      );
    }

    if (!props.color) return `background: ${defaultTrackColor}`;
  }

  const upperTrackColor = props.theme.rangeInput.track?.upper
    ? getBoundColor(props, 'upper')
    : defaultTrackColor;

  let lowerTrackColor = props.theme.rangeInput.track?.lower
    ? getBoundColor(props, 'lower')
    : getRGBA(
        normalizeColor(props.theme.global.colors.control, props.theme),
        props.theme.rangeInput.track.opacity || 1,
      );

  if (
    typeof props.color === 'string' ||
    (typeof props.color === 'object' && !Array.isArray(props.color))
  ) {
    lowerTrackColor = normalizeColor(props.color, props.theme);

    return `background: linear-gradient(
        to right,
        ${lowerTrackColor},
        ${lowerTrackColor} ${thumbPosition},
        ${upperTrackColor} ${thumbPosition},
        ${upperTrackColor}
      );
    `;
  }
  if (Array.isArray(props.color)) {
    const arrayOfTrackColors = props.color;
    let valuePercentage = 0;
    let result = `background: linear-gradient(to right,`;
    for (let index = 0; index < arrayOfTrackColors.length; index += 1) {
      const { value, color, opacity } = arrayOfTrackColors[index];
      result += `${getRGBA(
        normalizeColor(color, props.theme),
        opacity || 1,
      )} ${valuePercentage}%,`;

      if (props.value >= value) {
        valuePercentage = ((value - min) / (max - min)) * 100;
        result += `${getRGBA(
          normalizeColor(color, props.theme),
          opacity || 1,
        )} ${valuePercentage}%,`;
      } else {
        result += `${getRGBA(
          normalizeColor(color, props.theme),
          opacity || 1,
        )} ${thumbPosition},`;
        result += `${upperTrackColor} ${thumbPosition}, ${upperTrackColor})`;
        break;
      }
      if (index === arrayOfTrackColors.length - 1) {
        result += `${upperTrackColor} ${valuePercentage}%, ${upperTrackColor})`;
      }
    }
    return result;
  }

  return `background: linear-gradient(
      to right,
      ${lowerTrackColor},
      ${lowerTrackColor} ${thumbPosition},
      ${upperTrackColor} ${thumbPosition},
      ${upperTrackColor}
    );
  `;
};

const disabledRangeInputStyle = (props, context) => css`
  ${disabledStyle(props.theme.rangeInput.disabled.opacity)}
  ${props.theme.rangeInput.disabled[context]?.color &&
  `background: ${normalizeColor(
    props.theme.rangeInput.disabled[context].color,
    props.theme,
  )};`}
`;

const hoverStyle = (props) => css`
  box-shadow: 0px 0px 0px 2px
    ${normalizeColor(
      props.theme.rangeInput.thumb.color || 'control',
      props.theme,
    )};
`;

const rangeTrackStyle = css`
  box-sizing: border-box;
  width: 100%;
  height: ${(props) => props.theme.rangeInput.track.height};
  ${(props) => trackColorStyle(props)};
  ${(props) =>
    props.theme.rangeInput &&
    props.theme.rangeInput.track &&
    props.theme.rangeInput.track.extend}
  ${(props) =>
    props.disabled &&
    props.theme?.rangeInput?.disabled &&
    disabledRangeInputStyle(props, 'track')};
`;

const rangeThumbStyle = css`
  box-sizing: border-box;
  position: relative;
  border-radius: ${(props) => props.theme.global.spacing};
  height: ${(props) => props.theme.global.spacing};
  width: ${(props) => props.theme.global.spacing};
  overflow: visible;
  background: ${(props) =>
    normalizeColor(
      props.theme.rangeInput.thumb.color || 'control',
      props.theme,
    )};
  -webkit-appearance: none;
  cursor: pointer;
  ${(props) =>
    props.theme.rangeInput &&
    props.theme.rangeInput.thumb &&
    props.theme.rangeInput.thumb.extend}
  ${(props) =>
    props.disabled &&
    props.theme?.rangeInput?.disabled &&
    disabledRangeInputStyle(props, 'thumb')};
`;

const firefoxMicrosoftThumbStyle = css`
  ${rangeThumbStyle} margin-top: 0px;
  height: ${(props) => props.theme.global.spacing};
  width: ${(props) => props.theme.global.spacing};
  ${(props) => props.focus && props.focusIndicator && focusStyle()}
  ${(props) =>
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
  height: ${(props) => props.theme.global.spacing};
  width: 100%;
  padding: 0px;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  background: transparent;
  margin: 0px;

  ${(props) =>
    props.theme.rangeInput.pad &&
    edgeStyle(
      'padding',
      props.theme.rangeInput.pad,
      props.responsive,
      props.theme.box.responsiveBreakpoint,
      props.theme,
    )}

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
    margin-top: -${(props) => (parseMetricToNum(props.theme.global.spacing) - parseMetricToNum(props.theme.rangeInput.track.height || 0)) * 0.5}px;
    ${rangeThumbStyle}
    ${(props) =>
      !props.disabled &&
      css`
        &:hover {
          ${hoverStyle(props)}
        }
      `}
    ${(props) =>
      props.focus &&
      !props.focusIndicator &&
      css`
        ${hoverStyle(props)}
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

  ${(props) =>
    !props.disabled &&
    css`
      &:hover::-moz-range-thumb {
        ${hoverStyle(props)}
      }

      &:hover::-ms-thumb {
        ${hoverStyle(props)}
      }
    `}

  &::-ms-track {
    ${rangeTrackStyle}
    border-color: transparent;
    color: transparent;
  }

  &::-ms-fill-lower {
    ${(props) => trackColorStyle(props, 'lower')};
    border-color: transparent;
  }

  &::-ms-fill-upper {
    ${(props) => trackColorStyle(props, 'upper')};
    border-color: transparent;
  }

  &:focus::-webkit-slider-thumb {
    ${(props) => props.focus && props.focusIndicator && focusStyle()}
  }

  &:focus-visible {
    outline: 0;
  }
  // to remove browser default on safari
  &:focus {
    outline: none;
  }

  ${(props) => props.theme.rangeInput && props.theme.rangeInput.extend}
`;
/* eslint-enable max-len */

StyledRangeInput.defaultProps = {};
Object.setPrototypeOf(StyledRangeInput.defaultProps, defaultProps);

export { StyledRangeInput };
