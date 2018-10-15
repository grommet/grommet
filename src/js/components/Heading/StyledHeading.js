import styled, { css } from 'styled-components';

import { colorForName, breakpointStyle } from '../../utils';

const marginStyle = (props) => {
  if (typeof props.margin === 'string') {
    const margin = props.theme.global.edgeSize[props.margin];
    const styles = [css`
      margin-top: ${margin};
      margin-bottom: ${margin};
    `];
    if (props.responsive) {
      Object.keys(props.theme.global.breakpoints).forEach((name) => {
        const breakpoint = props.theme.global.breakpoints[name];
        if (breakpoint.edgeSize
          && breakpoint.edgeSize[props.margin] !== undefined) {
          const responsiveMargin = breakpoint.edgeSize[props.margin];
          styles.push(breakpointStyle(breakpoint, `
            margin-top: ${responsiveMargin};
            margin-bottom: ${responsiveMargin};
          `));
        }
      });
    }
    return styles;
  }
  const styles = [];
  if (props.margin.top) {
    if (props.margin.top === 'none') {
      styles.push(css`margin-top: 0;`);
    } else {
      styles.push(css`margin-top: ${props.theme.global.edgeSize[props.margin.top]};`);
      if (props.responsive) {
        Object.keys(props.theme.global.breakpoints).forEach((name) => {
          const breakpoint = props.theme.global.breakpoints[name];
          if (breakpoint.edgeSize
            && breakpoint.edgeSize[props.margin.top] !== undefined) {
            styles.push(breakpointStyle(breakpoint,
              `margin-top: ${breakpoint.edgeSize[props.margin.top]};`));
          }
        });
      }
    }
  }
  if (props.margin.bottom) {
    if (props.margin.bottom === 'none') {
      styles.push(css`margin-bottom: 0;`);
    } else {
      styles.push(css`margin-bottom: ${props.theme.global.edgeSize[props.margin.bottom]};`);
      if (props.responsive) {
        Object.keys(props.theme.global.breakpoints).forEach((name) => {
          const breakpoint = props.theme.global.breakpoints[name];
          if (breakpoint.edgeSize
            && breakpoint.edgeSize[props.margin.bottom] !== undefined) {
            styles.push(breakpointStyle(breakpoint,
              `margin-bottom: ${breakpoint.edgeSize[props.margin.bottom]};`));
          }
        });
      }
    }
  }
  return styles;
};

const sizeStyle = (props) => {
  // size is a combination of the level and size properties
  const size = props.size || 'medium';
  const headingTheme = props.theme.heading;
  const data = headingTheme.level[props.level][size];
  const styles = [css`
    font-size: ${data.size};
    line-height: ${data.height};
    max-width: ${data.maxWidth};
    font-weight: ${headingTheme.weight};
  `];
  if (props.responsive && headingTheme.responsiveBreakpoint) {
    const breakpoint = props.theme.global.breakpoints[headingTheme.responsiveBreakpoint];
    if (breakpoint) {
      const responsiveData = headingTheme.level[Math.min(props.level + 1, 4)][size];
      styles.push(breakpointStyle(breakpoint, `
        font-size: ${responsiveData.size};
        line-height: ${responsiveData.height};
        max-width: ${responsiveData.maxWidth};
      `));
    }
  }
  return styles;
};

const TEXT_ALIGN_MAP = {
  center: 'center',
  end: 'right',
  start: 'left',
};

const textAlignStyle = css`
  text-align: ${props => TEXT_ALIGN_MAP[props.textAlign]};
`;

const truncateStyle = `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const colorStyle = css`
  color: ${props => colorForName(props.colorValue, props.theme)};
`;

export const StyledHeading = styled.h1`
  ${props => props.theme.heading.font && css`
    font-family: ${props.theme.heading.font.family};
  `}
  ${props => sizeStyle(props)}
  ${props => props.margin && marginStyle(props)}
  ${props => props.textAlign && textAlignStyle}
  ${props => props.truncate && truncateStyle}
  ${props => props.colorValue && colorStyle}
  ${props => props.theme.heading && props.theme.heading.extend}
`;
