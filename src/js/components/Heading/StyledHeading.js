import styled, { css } from 'styled-components';

import { breakpointStyle, genericStyles, normalizeColor } from '../../utils';

const sizeStyle = props => {
  // size is a combination of the level and size properties
  const size = props.size || 'medium';
  const headingTheme = props.theme.heading;
  const levelStyle = headingTheme.level[props.level];
  if (levelStyle) {
    const data = levelStyle[size];
    const styles = [
      css`
        font-size: ${data.size};
        line-height: ${data.height};
        max-width: ${data.maxWidth};
        font-weight: ${headingTheme.weight};
      `,
    ];
    if (props.responsive && headingTheme.responsiveBreakpoint) {
      const breakpoint = props.theme.global.breakpoints[headingTheme.responsiveBreakpoint];
      if (breakpoint) {
        const responsiveData = headingTheme.level[Math.min(props.level + 1, 4)][size];
        styles.push(
          breakpointStyle(
            breakpoint,
            `
          font-size: ${responsiveData.size};
          line-height: ${responsiveData.height};
          max-width: ${responsiveData.maxWidth};
        `
          )
        );
      }
    }
    return styles;
  }
  console.warn(`Heading level ${props.level} is not defined in your theme.`);

  return '';
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

export const StyledHeading = styled.h1`
  ${genericStyles}
  ${props =>
    props.theme.heading.font &&
    css`
      font-family: ${props.theme.heading.font.family};
    `}
  ${props => sizeStyle(props)}
  ${props => props.textAlign && textAlignStyle}
  ${props => props.truncate && truncateStyle}
  ${props => props.colorProp && colorStyle}
  ${props => props.theme.heading && props.theme.heading.extend}
`;
