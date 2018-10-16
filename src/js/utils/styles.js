import { css } from 'styled-components';

import { normalizeColor } from './colors';
import { breakpointStyle, parseMetricToNum } from './mixins';

export const baseStyle = css`
  font-family: ${props => props.theme.global.font.family};
  font-size: ${props => props.theme.global.font.size};
  line-height: ${props => props.theme.global.font.height};
  color: ${props => normalizeColor('text', props.theme, true)};
  background: ${props => normalizeColor('background', props.theme, true)};

  box-sizing: border-box;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
`;

export const controlBorderStyle = css`
  border: ${props => (
    props.theme.global.control.border.width)} solid ${props => (
      normalizeColor('border', props.theme))};
  border-radius: ${props => props.theme.global.control.border.radius};
`;

export const edgeStyle = (kind, data, responsive, responsiveBreakpoint, theme) => {
  const breakpoint = responsiveBreakpoint && theme.global.breakpoints[responsiveBreakpoint];

  if (typeof data === 'string') {
    return css`
      ${kind}: ${theme.global.edgeSize[data]};
      ${responsive && breakpoint ? breakpointStyle(breakpoint, `
        ${kind}: ${breakpoint.edgeSize[data]};
      `) : ''}
    `;
  }
  const result = [];
  if (data.horizontal) {
    result.push(css`
      ${kind}-left: ${theme.global.edgeSize[data.horizontal]};
      ${kind}-right: ${theme.global.edgeSize[data.horizontal]};
      ${responsive && breakpoint ? breakpointStyle(breakpoint, `
        ${kind}-left: ${breakpoint.edgeSize[data.horizontal]};
        ${kind}-right: ${breakpoint.edgeSize[data.horizontal]};
      `) : ''}
    `);
  }
  if (data.vertical) {
    result.push(css`
      ${kind}-top: ${theme.global.edgeSize[data.vertical]};
      ${kind}-bottom: ${theme.global.edgeSize[data.vertical]};
      ${responsive && breakpoint ? breakpointStyle(breakpoint, `
        ${kind}-top: ${breakpoint.edgeSize[data.vertical]};
        ${kind}-bottom: ${breakpoint.edgeSize[data.vertical]};
      `) : ''}
    `);
  }
  if (data.top) {
    result.push(css`
      ${kind}-top: ${theme.global.edgeSize[data.top]};
      ${responsive && breakpoint ? breakpointStyle(breakpoint, `
        ${kind}-top: ${breakpoint.edgeSize[data.top]};
      `) : ''}
    `);
  }
  if (data.bottom) {
    result.push(css`
      ${kind}-bottom: ${theme.global.edgeSize[data.bottom]};
      ${responsive && breakpoint ? breakpointStyle(breakpoint, `
        ${kind}-bottom: ${breakpoint.edgeSize[data.bottom]};
      `) : ''}
    `);
  }
  if (data.left) {
    result.push(css`
      ${kind}-left: ${theme.global.edgeSize[data.left]};
      ${responsive && breakpoint ? breakpointStyle(breakpoint, `
        ${kind}-left: ${breakpoint.edgeSize[data.left]};
      `) : ''}
    `);
  }
  if (data.right) {
    result.push(css`
      ${kind}-right: ${theme.global.edgeSize[data.right]};
      ${responsive && breakpoint ? breakpointStyle(breakpoint, `
        ${kind}-right: ${breakpoint.edgeSize[data.left]};
      `) : ''}
    `);
  }
  return result;
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
    outline: ${
      props => props.theme.global.focus.border.color
    } solid 2px;
  }
  border-color: ${
    props => props.theme.global.focus.border.color
  };
  box-shadow: 0 0 2px 2px ${
    props => props.theme.global.focus.border.color
  };
`;

export const inputStyle = css`
  box-sizing: border-box;
  font-size: inherit;
  border: none;
  -webkit-appearance: none;
  padding: ${props => (
    (parseMetricToNum(props.theme.global.spacing) / 2)
    - parseMetricToNum(props.theme.global.control.border.width)
  )}px;
  outline: none;
  background: transparent;
  color: inherit;
  ${props => props.theme.global.input.weight && css`
    font-weight: ${props.theme.global.input.weight};
  `}
  margin: 0;

  ${props => props.focus && (!props.plain || props.focusIndicator) && focusStyle}
  ${controlBorderStyle}

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
`;

export const overflowStyle = (overflowProp) => {
  if (typeof overflowProp === 'string') {
    return css`
      overflow: ${overflowProp};
    `;
  }

  return css`
    ${overflowProp.horizontal && `overflow-x: ${overflowProp.horizontal};`}
    ${overflowProp.vertical && `overflow-y: ${overflowProp.vertical};`}
  `;
};

// evalStyle() converts a styled-components item into a string
export const evalStyle = (arg, theme) => {
  if (arg && Array.isArray(arg) && typeof arg[0] === 'function') {
    return arg[0]({ theme });
  }
  return arg;
};
