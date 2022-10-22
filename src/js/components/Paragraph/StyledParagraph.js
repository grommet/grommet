import styled, { css } from 'styled-components';

import {
  breakpointStyle,
  genericStyles,
  normalizeColor,
  textAlignStyle,
} from '../../utils';
import { defaultProps } from '../../default-props';

const colorStyle = css`
  color: ${(props) => normalizeColor(props.colorProp, props.theme)};
`;

const sizeStyle = (props) => {
  const size = props.size || 'medium';
  const paragraphTheme = props.theme.paragraph;
  const data = paragraphTheme.fontSize[size];
  const styles = [
    css`
      font-size: ${data ? data.size : size};
      line-height: ${data ? data.height : 'normal'};
      max-width: ${props.fillProp ? 'none' : data && data.maxWidth};
    `,
  ];
  if (props.responsive && paragraphTheme.responsiveBreakpoint) {
    const breakpoint =
      props.theme.global.breakpoints[paragraphTheme.responsiveBreakpoint];
    // create (ordered) Array of sizes to loop through
    const allSizes = Object.keys(paragraphTheme.fontSize);
    const sizePosition = allSizes.findIndex(
      (elementSize) => elementSize === size,
    );
    if (breakpoint) {
      const responsiveData = paragraphTheme.fontSize[allSizes[sizePosition - 1]]
        ? paragraphTheme.fontSize[allSizes[sizePosition - 1]]
        : paragraphTheme.fontSize[allSizes[sizePosition]];
      if (responsiveData) {
        styles.push(
          breakpointStyle(
            breakpoint,
            `
              font-size: ${responsiveData.size};
              line-height: ${responsiveData.height};
              max-width: ${props.fillProp ? 'none' : responsiveData.maxWidth};
            `,
          ),
        );
      }
    }
  }
  return styles;
};

const fontFamily = css`
  font-family: ${(props) => props.theme.paragraph.font.family};
`;

const maxlinesStyle = (props) =>
  props.maxLines &&
  css`
    display: -webkit-box;
    -webkit-line-clamp: ${props.maxLines};
    -webkit-box-orient: vertical;
    overflow: hidden;
  `;

const StyledParagraph = styled.p`
  ${genericStyles}
  ${(props) => maxlinesStyle(props)}
  ${(props) => sizeStyle(props)}
  ${(props) => props.textAlign && textAlignStyle}
  ${(props) => props.colorProp && colorStyle}
  ${(props) =>
    props.theme.paragraph.font &&
    props.theme.paragraph.font.family &&
    fontFamily}

  ${(props) => props.theme.paragraph && props.theme.paragraph.extend}
`;

StyledParagraph.defaultProps = {};
Object.setPrototypeOf(StyledParagraph.defaultProps, defaultProps);

export { StyledParagraph };
