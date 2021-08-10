import styled, { css } from 'styled-components';

import { edgeStyle, focusStyle, normalizeColor, roundStyle } from '../../utils';
import { defaultProps } from '../../default-props';

// Note: since `fillStyle` is only used in one place, `justify-content` was
// added to it to simplify its logic. If this is ever reused somewhere else,
// consider the need of separating those once again.
const fillStyle = () => `
      width: 100%;
      height: 100%;
      max-width: none;
      flex: 1 0 auto;
      justify-content: space-between;
    `;

const disabledStyle = `
  opacity: 0.5;
  cursor: default;
`;

const hoverStyle = css`
  :hover input:not([disabled]) + div,
  :hover input:not([disabled]) + span {
    border-color: ${(props) =>
      normalizeColor(
        props.toggle
          ? props.theme.checkBox.toggle.container.hover?.border?.color ||
              props.theme.checkBox.hover?.border?.color
          : props.theme.checkBox.hover?.border?.color,
        props.theme,
      )};
  }
  :hover {
    background-color: ${(props) =>
      normalizeColor(
        !props.disabled &&
          (props.toggle
            ? props.theme.checkBox.toggle.container.hover?.background?.color ||
              props.theme.checkBox.hover?.background?.color
            : props.theme.checkBox.hover?.background?.color),
        props.theme,
      )};
  }
`;

const StyledCheckBoxIcon = styled.svg`
  box-sizing: border-box;
  stroke-width: ${(props) => props.theme.checkBox.check.thickness};
  stroke: ${(props) =>
    normalizeColor(props.theme.checkBox.color || 'control', props.theme)};
  width: ${(props) =>
    props.theme.checkBox.icon.size || props.theme.checkBox.size};
  height: ${(props) =>
    props.theme.checkBox.icon.size || props.theme.checkBox.size};
  ${(props) => props.theme.checkBox.icon.extend};
`;

StyledCheckBoxIcon.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxIcon.defaultProps, defaultProps);

const StyledCheckBoxContainer = styled.label`
  display: flex;
  flex-direction: row;
  align-items: ${(props) => props.theme.checkBox.label.align};
  user-select: none;
  ${(props) => (props.fillProp ? fillStyle() : 'width: fit-content;')}
  ${(props) =>
    (props.pad || props.theme.checkBox.pad) &&
    edgeStyle(
      'padding',
      props.pad || props.theme.checkBox.pad,
      props.responsive,
      props.theme.box.responsiveBreakpoint,
      props.theme,
    )}
  ${(props) => props.disabled && disabledStyle}
  ${(props) => !props.disabled && 'cursor: pointer;'}
  ${hoverStyle}
  // when the CheckBox has focus but there is no focusIndicator,
  // apply the hover styling instead so that keyboard users know
  // which CheckBox is active
  ${(props) =>
    props.focus &&
    !props.focusIndicator &&
    `
    input:not([disabled]) + div,
    input:not([disabled]) + span {
      border-color: ${normalizeColor(
        props.toggle
          ? props.theme.checkBox.toggle.container.hover?.border?.color ||
              props.theme.checkBox.hover?.border?.color
          : props.theme.checkBox.hover?.border?.color,
        props.theme,
      )};
    }

    background-color: ${normalizeColor(
      !props.disabled &&
        (props.toggle
          ? props.theme.checkBox.toggle.container.hover?.background?.color ||
            props.theme.checkBox.hover?.background?.color
          : props.theme.checkBox.hover?.background?.color),
      props.theme,
    )};`}
  ${(props) => props.theme.checkBox.extend}
`;

StyledCheckBoxContainer.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxContainer.defaultProps, defaultProps);

const StyledCheckBoxInput = styled.input`
  opacity: 0;
  -moz-appearance: none;
  width: 0;
  height: 0;
  margin: 0;

  ${(props) => !props.disabled && 'cursor: pointer;'} :checked + span > span {
    // Position checked toggle so that it aligns with the right side of the
    // container, with any necessary padding
    left: calc(
      ${(props) =>
          props.theme.checkBox.toggle.container.size ||
          props.theme.checkBox.toggle.size} -
        ${(props) =>
          props.theme.checkBox.toggle.knob.size || props.theme.checkBox.size} -
        ${(props) => {
          const { pad } = props.theme.checkBox.toggle.container;
          if (!pad) return '0px';
          if (typeof pad === 'string') return pad;
          return pad.left || pad.horizontal || '0px';
        }} -
        ${(props) => {
          const { pad } = props.theme.checkBox.toggle.container;
          if (!pad) return '0px';
          if (typeof pad === 'string') return pad;
          return pad.right || pad.horizontal || '0px';
        }}
    );
    background: ${(props) =>
      normalizeColor(
        (props.toggle
          ? props.theme.checkBox.toggle.knob.checked?.color ||
            props.theme.checkBox.color
          : props.theme.checkBox.color) || 'control',
        props.theme,
      )};
  }
`;

StyledCheckBoxInput.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxInput.defaultProps, defaultProps);

const StyledCheckBoxBox = styled.div`
  ${(props) => props.focus && props.focusIndicator && focusStyle()};
  ${(props) => props.theme.checkBox.check.extend};
`;

StyledCheckBoxBox.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxBox.defaultProps, defaultProps);

/* eslint-disable max-len */
const checkedToggleContainerStyle = css`
  ${(props) =>
    props.theme.checkBox.toggle.container.checked?.border?.width &&
    `border-width: ${props.theme.checkBox.toggle.container.checked?.border?.width}`};
  ${(props) =>
    props.theme.checkBox.toggle.container.checked?.border?.style &&
    `border-style: ${props.theme.checkBox.toggle.container.checked?.border?.style}`};
  ${(props) =>
    props.theme.checkBox.toggle.container.checked?.border?.color &&
    `border-color: ${normalizeColor(
      props.theme.checkBox.toggle.container.checked?.border?.color,
      props.theme,
    )}`};
  ${(props) =>
    props.theme.checkBox.toggle.container.checked?.background &&
    `background-color: ${normalizeColor(
      props.theme.checkBox.toggle.container.checked?.background,
      props.theme,
    )}`};
`;
/* eslint-enable max-len */

const StyledCheckBoxToggle = styled.span`
  box-sizing: border-box;
  vertical-align: middle;
  display: inline-block;
  width: ${(props) =>
    props.theme.checkBox.toggle.container.size ||
    props.theme.checkBox.toggle.size};
  height: ${(props) =>
    props.theme.checkBox.toggle.container.height || props.theme.checkBox.size};
  border-width: ${(props) =>
    props.theme.checkBox.toggle.container.border.width ||
    props.theme.checkBox.border.width};
  border-style: ${(props) =>
    props.theme.checkBox.toggle.container.border.style || 'solid'};
  border-color: ${(props) =>
    normalizeColor(
      props.theme.checkBox.toggle.container.border.color ||
        props.theme.checkBox.border.color,
      props.theme,
    )};
  background-color: ${(props) => {
    const color =
      props.theme.checkBox.toggle.container.background ||
      props.theme.checkBox.toggle.background;
    return color ? normalizeColor(color, props.theme) : 'transparent';
  }};
  ${(props) =>
    props.theme.checkBox.toggle.container.pad &&
    edgeStyle(
      'padding',
      props.theme.checkBox.toggle.container.pad,
      props.responsive,
      props.theme.box.responsiveBreakpoint,
      props.theme,
    )}
  ${(props) => {
    const { round } = props.theme.checkBox.toggle.container;
    return round
      ? roundStyle(round, true, props.theme)
      : `border-radius: ${props.theme.checkBox.toggle.radius};`;
  }};

  ${(props) => props.checked && checkedToggleContainerStyle}

  ${(props) => props.focus && props.focusIndicator && focusStyle()};
  ${(props) => props.theme.checkBox.toggle.extend};
  ${(props) => props.theme.checkBox.toggle.container.extend};
`;

StyledCheckBoxToggle.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxToggle.defaultProps, defaultProps);

const knobElevationStyle = css`
  box-shadow: ${(props) =>
    props.theme.global.elevation[props.theme.dark ? 'dark' : 'light'][
      props.theme.checkBox.toggle.knob.elevation
    ]};
`;

const checkedToggleKnobStyle = css`
  ${(props) =>
    props.theme.checkBox.toggle.knob.checked?.border?.width &&
    `border-width: ${props.theme.checkBox.toggle.knob.checked?.border?.width}`};
  ${(props) =>
    props.theme.checkBox.toggle.knob.checked?.border?.style &&
    `border-style: ${props.theme.checkBox.toggle.knob.checked?.border?.style}`};
  ${(props) =>
    props.theme.checkBox.toggle.knob.checked?.border?.color &&
    `border-color: ${normalizeColor(
      props.theme.checkBox.toggle.knob.checked?.border?.color,
      props.theme,
    )}`};
  ${(props) =>
    props.theme.checkBox.toggle.knob.checked?.color &&
    `background: ${normalizeColor(
      props.theme.checkBox.toggle.knob.checked?.color,
      props.theme,
    )}`};
`;

/* eslint-disable max-len */
const StyledCheckBoxKnob = styled.span`
  box-sizing: border-box;
  position: relative;
  display: inherit;
  top: -${(props) => props.theme.checkBox.toggle.container.border.width || props.theme.checkBox.border.width};
  left: -${(props) => props.theme.checkBox.toggle.container.border.width || props.theme.checkBox.border.width};
  transition: all 0.3s;
  width: ${(props) =>
    props.theme.checkBox.toggle.knob.size || props.theme.checkBox.size};
  height: ${(props) =>
    props.theme.checkBox.toggle.knob.height ||
    props.theme.checkBox.toggle.knob.size ||
    props.theme.checkBox.size};
  background: ${(props) => {
    const color =
      props.theme.checkBox.toggle.knob.color ||
      props.theme.checkBox.toggle.color;
    return normalizeColor(color, props.theme);
  }};
  ${(props) => props.theme.checkBox.toggle.knob.elevation && knobElevationStyle}
  ${(props) => {
    const { round } = props.theme.checkBox.toggle.knob;
    return round
      ? roundStyle(round, true, props.theme)
      : `border-radius: ${props.theme.checkBox.toggle.radius};`;
  }};

  ${(props) => props.checked && checkedToggleKnobStyle}

  ${(props) => props.theme.checkBox.toggle.knob.extend};
`;
/* eslint-enable max-len */

StyledCheckBoxKnob.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxKnob.defaultProps, defaultProps);

const StyledCheckBox = styled.div`
  flex-shrink: 0;
`;

StyledCheckBox.defaultProps = {};
Object.setPrototypeOf(StyledCheckBox.defaultProps, defaultProps);

export {
  StyledCheckBoxIcon,
  StyledCheckBoxContainer,
  StyledCheckBoxInput,
  StyledCheckBoxBox,
  StyledCheckBoxToggle,
  StyledCheckBoxKnob,
  StyledCheckBox,
};
