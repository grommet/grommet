import { css } from 'styled-components';
import { backgroundStyle } from './background';
import { normalizeColor } from './colors';
import { breakpointStyle, parseMetricToNum } from './mixins';

export const baseStyle = css`
  font-family: ${props => props.theme.global.font.family};
  font-size: ${props => props.theme.global.font.size};
  line-height: ${props => props.theme.global.font.height};
  font-weight: ${props => props.theme.global.font.weight};
  ${props =>
    !props.plain && backgroundStyle(props.theme.baseBackground, props.theme)}
  box-sizing: border-box;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
`;

export const controlBorderStyle = css`
  border: ${props => props.theme.global.control.border.width} solid
    ${props =>
      normalizeColor(
        props.theme.global.control.border.color || 'border',
        props.theme,
      )};
  border-radius: ${props => props.theme.global.control.border.radius};
`;

export const edgeStyle = (
  kind,
  data,
  responsive,
  responsiveBreakpoint,
  theme,
) => {
  const breakpoint =
    responsiveBreakpoint && theme.global.breakpoints[responsiveBreakpoint];

  if (typeof data === 'string') {
    return css`
      ${kind}: ${theme.global.edgeSize[data] || data};
      ${responsive && breakpoint
        ? breakpointStyle(
            breakpoint,
            `
        ${kind}: ${breakpoint.edgeSize[data] || data};
      `,
          )
        : ''};
    `;
  }
  const result = [];

  const { horizontal, vertical, top, bottom, left, right } = data;

  // if horizontal and vertical are equal OR all sides are equal,
  // we can just return a single css value such as padding: 12px
  // instead of breaking out by sides.
  const horizontalVerticalEqual =
    horizontal && vertical && horizontal === vertical;
  const allSidesEqual =
    top && bottom && left && right && ((top === bottom) === left) === right;

  if (horizontalVerticalEqual || allSidesEqual) {
    // since the values will be the same between vertical & horizontal OR
    // left, right, top, & bottom, we can just choose one
    const value = horizontalVerticalEqual ? horizontal : top;
    return css`
      ${kind}: ${theme.global.edgeSize[value] || value};
      ${responsive && breakpoint
        ? breakpointStyle(
            breakpoint,
            `
        ${kind}: ${breakpoint.edgeSize[value] || value};
      `,
          )
        : ''};
    `;
  }

  if (horizontal) {
    result.push(css`
      ${kind}-left: ${theme.global.edgeSize[horizontal] || horizontal};
      ${kind}-right: ${theme.global.edgeSize[horizontal] || horizontal};
      ${responsive && breakpoint
        ? breakpointStyle(
            breakpoint,
            `
          ${kind}-left: ${breakpoint.edgeSize[horizontal] || horizontal};
          ${kind}-right: ${breakpoint.edgeSize[horizontal] || horizontal};
        `,
          )
        : ''};
    `);
  }
  if (vertical) {
    result.push(css`
      ${kind}-top: ${theme.global.edgeSize[vertical] || vertical};
      ${kind}-bottom: ${theme.global.edgeSize[vertical] || vertical};
      ${responsive && breakpoint
        ? breakpointStyle(
            breakpoint,
            `
          ${kind}-top: ${breakpoint.edgeSize[vertical] || vertical};
          ${kind}-bottom: ${breakpoint.edgeSize[vertical] || vertical};
        `,
          )
        : ''};
    `);
  }
  if (top) {
    result.push(css`
      ${kind}-top: ${theme.global.edgeSize[top] || top};
      ${responsive && breakpoint
        ? breakpointStyle(
            breakpoint,
            `
          ${kind}-top: ${breakpoint.edgeSize[top] || top};
        `,
          )
        : ''};
    `);
  }
  if (bottom) {
    result.push(css`
      ${kind}-bottom: ${theme.global.edgeSize[bottom] || bottom};
      ${responsive && breakpoint
        ? breakpointStyle(
            breakpoint,
            `
          ${kind}-bottom: ${breakpoint.edgeSize[bottom] || bottom};
        `,
          )
        : ''};
    `);
  }
  if (left) {
    result.push(css`
      ${kind}-left: ${theme.global.edgeSize[left] || left};
      ${responsive && breakpoint
        ? breakpointStyle(
            breakpoint,
            `
          ${kind}-left: ${breakpoint.edgeSize[left] || left};
        `,
          )
        : ''};
    `);
  }
  if (right) {
    result.push(css`
      ${kind}-right: ${theme.global.edgeSize[right] || right};
      ${responsive && breakpoint
        ? breakpointStyle(
            breakpoint,
            `
          ${kind}-right: ${breakpoint.edgeSize[right] || right};
        `,
          )
        : ''};
    `);
  }
  if (data.start) {
    result.push(css`
      ${kind}-inline-start: ${theme.global.edgeSize[data.start] || data.start};
      ${responsive && breakpoint
        ? breakpointStyle(
            breakpoint,
            `
          ${kind}-inline-start: ${breakpoint.edgeSize[data.start] ||
              data.start};
        `,
          )
        : ''};
    `);
  }
  if (data.end) {
    result.push(css`
      ${kind}-inline-end: ${theme.global.edgeSize[data.end] || data.end};
      ${responsive && breakpoint
        ? breakpointStyle(
            breakpoint,
            `
          ${kind}-inline-end: ${breakpoint.edgeSize[data.end] || data.end};
        `,
          )
        : ''};
    `);
  }

  return result;
};

export const fillStyle = fillProp => {
  if (fillProp === 'horizontal') {
    return 'width: 100%;';
  }
  if (fillProp === 'vertical') {
    return 'height: 100%;';
  }
  if (fillProp) {
    return `
      width: 100%;
      height: 100%;
    `;
  }
  return undefined;
};

// focus also supports clickable elements inside svg
export const focusStyle = css`
  > circle,
  > ellipse,
  > line,
  > path,
  > polygon,
  > polyline,
  > rect {
    outline: ${props =>
        normalizeColor(props.theme.global.focus.border.color, props.theme)}
      solid 2px;
  }
  outline-color: ${props =>
    normalizeColor(props.theme.global.focus.border.color, props.theme)};
  border-color: ${props =>
    normalizeColor(props.theme.global.focus.border.color, props.theme)};
  box-shadow: 0 0 2px 2px
    ${props =>
      normalizeColor(props.theme.global.focus.border.color, props.theme)};

  ::-moz-focus-inner {
    border: 0;
  }
`;

// For backwards compatibility we need to add back the control border width.
// Based on how grommet was functioning prior to https://github.com/grommet/grommet/pull/3939,
// the padding was subtracting the border width from the theme value, but the
// placeholder was not. Because we're now placing the subtraction into the
// theme itself, we have to add back in the border width here.
// This is used for placeholder/icon in TextInput and MaskedInput.
const adjustPad = (props, value) =>
  `${parseMetricToNum(`${props.theme.global.edgeSize[value] || value}px`) +
    parseMetricToNum(`${props.theme.global.control.border.width}px`)}px`;

export const getInputPadBySide = (props, side) => {
  if (typeof props.theme.global.input.padding !== 'object') {
    const adjustedPad = adjustPad(props, props.theme.global.input.padding);
    return adjustedPad;
  }

  let orientation;
  if (side === 'left' || side === 'right') orientation = 'horizontal';
  else if (side === 'top' || side === 'bottom') orientation = 'vertical';
  else orientation = undefined;

  // if individual side isn't available, fallback to the
  // orientation if possible
  const pad =
    props.theme.global.input.padding[side] ||
    props.theme.global.input.padding[orientation];

  const adjustedPad = adjustPad(props, pad);

  return adjustedPad;
};

export const inputStyle = css`
  box-sizing: border-box;
  font-size: inherit;
  font-family: inherit;
  border: none;
  -webkit-appearance: none;
  outline: none;
  background: transparent;
  color: inherit;
  ${props =>
    props.theme.global.input.padding &&
    typeof props.theme.global.input.padding !== 'object'
      ? `padding: ${parseMetricToNum(
          props.theme.global.edgeSize[props.theme.global.input.padding] ||
            props.theme.global.input.padding,
        ) - parseMetricToNum(props.theme.global.control.border.width)}px;`
      : edgeStyle(
          'padding',
          props.theme.global.input.padding,
          props.responsive,
          props.theme.box.responsiveBreakpoint,
          props.theme,
        )}
  ${props =>
    props.theme.global.input.weight &&
    css`
      font-weight: ${props.theme.global.input.weight};
    `} margin: 0;

  ${props =>
    props.focus &&
    (!props.plain || props.focusIndicator) &&
    focusStyle} ${controlBorderStyle}

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
`;

export const overflowStyle = overflowProp => {
  if (typeof overflowProp === 'string') {
    return css`
      overflow: ${overflowProp};
    `;
  }

  return css`
    ${overflowProp.horizontal &&
      `overflow-x: ${overflowProp.horizontal};`} ${overflowProp.vertical &&
      `overflow-y: ${overflowProp.vertical};`};
  `;
};

const placeholderColor = css`
  color: ${props => props.theme.global.colors.placeholder};
`;

export const placeholderStyle = css`
  &::-webkit-input-placeholder {
    ${placeholderColor};
  }

  &::-moz-placeholder {
    ${placeholderColor};
  }

  &:-ms-input-placeholder {
    ${placeholderColor};
  }
`;

const ALIGN_SELF_MAP = {
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch',
};

export const genericStyles = css`
  ${props =>
    props.alignSelf && `align-self: ${ALIGN_SELF_MAP[props.alignSelf]};`}
  ${props => props.gridArea && `grid-area: ${props.gridArea};`}
  ${props =>
    props.margin &&
    props.theme.global &&
    edgeStyle(
      'margin',
      props.margin,
      props.responsive,
      props.theme.global.edgeSize.responsiveBreakpoint,
      props.theme,
    )}
`;

export const disabledStyle = componentStyle => css`
  opacity: ${props =>
    componentStyle || props.theme.global.control.disabled.opacity};
  cursor: default;
`;

export const sizeStyle = (name, value, theme) => css`
  ${name}: ${theme.global.size[value] || value};
`;
