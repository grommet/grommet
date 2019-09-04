import styled, { css } from 'styled-components';

import { breakpointStyle, genericStyles, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

const sizeStyle = props => {
  // size is a combination of the level and size properties
  const size = props.size || 'medium';
  const headingTheme = props.theme.heading;
  const levelStyle = headingTheme.level[props.level];
  if (levelStyle) {
    const data = levelStyle[size];
    const styles =  
    [
      css`
        font-size: ${data ? data.size : size};
        line-height: ${data ? data.height : 'normal'};
        max-width: ${data ? data.maxWidth : levelStyle.medium.maxWidth};
        font-weight: ${levelStyle.font.weight || headingTheme.weight};
      `,
    ];
    if (props.responsive && headingTheme.responsiveBreakpoint) {
      const breakpoint =
        props.theme.global.breakpoints[headingTheme.responsiveBreakpoint];
      if (breakpoint) {
        const responsiveData =
          headingTheme.level[Math.min(props.level + 1, 4)][size];
        if(responsiveData) {
          styles.push(
            breakpointStyle(
              breakpoint,
              `
            font-size: ${responsiveData.size};
            line-height: ${responsiveData.height};
            max-width: ${responsiveData.maxWidth};
          `,
            ),
          );
        }
      }
    }
    return styles;
  }
  console.warn(`Heading level ${props.level} is not defined in your theme.`);

  return '';
};

const fontFamily = props => {
  const { font } = props.theme.heading.level[props.level];
  if (font && font.family) {
    return css`
      font-family: ${font.family};
    `;
  }
  return props.theme.heading.font
    ? css`
        font-family: ${props.theme.heading.font.family};
      `
    : '';
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
  color: ${props => normalizeColor(props.colorProp, props.theme)};
`;

const StyledHeading = styled.h1`
  ${genericStyles}
  ${props => fontFamily(props)}
  ${props => sizeStyle(props)}
  ${props => props.textAlign && textAlignStyle}
  ${props => props.truncate && truncateStyle}
  ${props => props.colorProp && colorStyle}
  ${props => props.theme.heading && props.theme.heading.extend}
`;

StyledHeading.defaultProps = {};
Object.setPrototypeOf(StyledHeading.defaultProps, defaultProps);

export { StyledHeading };
