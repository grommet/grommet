import { css } from 'styled-components';

export const baseStyle = css`
  font-family: ${props => props.theme.global.font.family};
  font-size: ${props => props.theme.global.font.size};
  line-height: ${props => props.theme.global.font.height};
  box-sizing: border-box;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
`;

export const breakpointStyle = (breakpoint, content) => css`
  @media only screen ${breakpoint.value &&
      `and (max-width: ${breakpoint.value}px)`} {
    ${content};
  }
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
  if (data.horizontal) {
    result.push(css`
      ${kind}-left: ${theme.global.edgeSize[data.horizontal] ||
        data.horizontal};
      ${kind}-right: ${theme.global.edgeSize[data.horizontal] ||
        data.horizontal};
      ${responsive && breakpoint
        ? breakpointStyle(
            breakpoint,
            `
        ${kind}-left: ${breakpoint.edgeSize[data.horizontal] ||
              data.horizontal};
        ${kind}-right: ${breakpoint.edgeSize[data.horizontal] ||
              data.horizontal};
      `,
          )
        : ''};
    `);
  }
  if (data.vertical) {
    result.push(css`
      ${kind}-top: ${theme.global.edgeSize[data.vertical] || data.vertical};
      ${kind}-bottom: ${theme.global.edgeSize[data.vertical] || data.vertical};
      ${responsive && breakpoint
        ? breakpointStyle(
            breakpoint,
            `
        ${kind}-top: ${breakpoint.edgeSize[data.vertical] || data.vertical};
        ${kind}-bottom: ${breakpoint.edgeSize[data.vertical] || data.vertical};
      `,
          )
        : ''};
    `);
  }
  if (data.top) {
    result.push(css`
      ${kind}-top: ${theme.global.edgeSize[data.top] || data.top};
      ${responsive && breakpoint
        ? breakpointStyle(
            breakpoint,
            `
        ${kind}-top: ${breakpoint.edgeSize[data.top] || data.top};
      `,
          )
        : ''};
    `);
  }
  if (data.bottom) {
    result.push(css`
      ${kind}-bottom: ${theme.global.edgeSize[data.bottom] || data.bottom};
      ${responsive && breakpoint
        ? breakpointStyle(
            breakpoint,
            `
        ${kind}-bottom: ${breakpoint.edgeSize[data.bottom] || data.bottom};
      `,
          )
        : ''};
    `);
  }
  if (data.left) {
    result.push(css`
      ${kind}-left: ${theme.global.edgeSize[data.left] || data.left};
      ${responsive && breakpoint
        ? breakpointStyle(
            breakpoint,
            `
        ${kind}-left: ${breakpoint.edgeSize[data.left] || data.left};
      `,
          )
        : ''};
    `);
  }
  if (data.right) {
    result.push(css`
      ${kind}-right: ${theme.global.edgeSize[data.right] || data.right};
      ${responsive && breakpoint
        ? breakpointStyle(
            breakpoint,
            `
        ${kind}-right: ${breakpoint.edgeSize[data.right] || data.right};
      `,
          )
        : ''};
    `);
  }
  return result;
};
