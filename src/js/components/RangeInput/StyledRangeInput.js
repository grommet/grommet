import styled, { css } from 'styled-components';

import { focusStyle, normalizeColor, parseMetricToNum } from '../../utils';

const rangeTrackStyle = css`
  box-sizing: border-box;
  width: 100%;
  height: ${props => props.theme.rangeInput.track.height};
  background: ${props => normalizeColor(props.theme.rangeInput.track.color, props.theme)};
`;

const rangeThumbStyle = css`
  box-sizing: border-box;
  position: relative;
  border-radius: ${props => props.theme.global.spacing};
  height: ${props => props.theme.global.spacing};
  width: ${props => props.theme.global.spacing};
  overflow: visible;
  background: ${props =>
    normalizeColor(props.theme.rangeInput.thumb.color ||
    props.theme.global.control.color, props.theme)};
  -webkit-appearance: none;
  cursor: pointer;
`;

const firefoxMicrosoftThumbStyle = css`
  ${rangeThumbStyle}
  margin-top: 0px;
  height: ${props => props.theme.global.spacing};
  width: ${props => props.theme.global.spacing};
`;

export const StyledRangeInput = styled.input`
  box-sizing: border-box;
  position: relative;
  -webkit-appearance: none;
  border-color: transparent;
  height: ${props => props.theme.global.spacing};
  width: 100%;
  padding: 0px;
  cursor: pointer;
  background: transparent;

  &:focus {
    outline: none;
  }

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
    ${rangeThumbStyle}

    margin-top: -${props =>
      (parseMetricToNum(props.theme.global.spacing) * 0.425)}px;

    ${props => !props.disabled && css`
      &:hover {
        box-shadow: 0px 0px 0px 2px ${normalizeColor(props.theme.rangeInput.thumb.color ||
          props.theme.global.control.color, props.theme)};
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

  ${props => !props.disabled && css`
    &:hover::-moz-range-thumb {
      box-shadow: 0px 0px 0px 2px ${normalizeColor(props.theme.rangeInput.thumb.color ||
        props.theme.global.control.color, props.theme)};
    }

    &:hover::-ms-thumb {
      box-shadow: 0px 0px 0px 2px ${normalizeColor(props.theme.rangeInput.thumb.color ||
        props.theme.global.control.color, props.theme)};
    }
  `}

  &::-ms-track {
    ${rangeTrackStyle}
    border-color: transparent;
    color: transparent;
  }

  &::-ms-fill-lower {
    background: ${props => normalizeColor(props.theme.rangeInput.track.color, props.theme)};
    border-color: transparent;
  }

  &::-ms-fill-upper {
    background: ${props => normalizeColor(props.theme.rangeInput.track.color, props.theme)};
    border-color: transparent;
  }

  ${props => props.focus && focusStyle}
  ${props => props.theme.rangeInput && props.theme.rangeInput.extend}
`;
