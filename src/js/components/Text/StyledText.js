import styled, { css } from 'styled-components';

import {
  breakpointStyle,
  genericStyles,
  normalizeColor,
  textAlignStyle,
} from '../../utils';
import { defaultProps } from '../../default-props';

const sizeStyle = (props) => {
  const size = props.size || 'medium';
  const textTheme = props.theme.text;
  const data = textTheme.fontSize[size];
  const styles = [
    css`
      font-size: ${data ? data.size : size};
      line-height: ${data ? data.height : 'normal'};
    `,
  ];
  if (props.responsive && textTheme.responsiveBreakpoint) {
    const breakpoint =
      props.theme.global.breakpoints[textTheme.responsiveBreakpoint];
    // create (ordered) Array of sizes to loop through
    const allSizes = Object.keys(textTheme.fontSize);
    const sizePosition = allSizes.findIndex(
      (elementSize) => elementSize === size,
    );
    if (breakpoint) {
      const responsiveData = textTheme.fontSize[allSizes[sizePosition - 1]]
        ? textTheme.fontSize[allSizes[sizePosition - 1]]
        : textTheme.fontSize[allSizes[sizePosition]];
      console.log(responsiveData);
      if (responsiveData) {
        styles.push(
          breakpointStyle(
            breakpoint,
            `
              font-size: ${responsiveData.size};
              line-height: ${responsiveData.height};
            `,
          ),
        );
      }
    }
  }
  return styles;
};

const truncateStyle = `
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const colorStyle = css`
  color: ${(props) => normalizeColor(props.colorProp, props.theme)};
`;

const weightStyle = css`
  font-weight: ${(props) => props.weight};
`;

const wordBreakStyle = css`
  word-break: ${(props) => props.wordBreak};
`;

const fontFamily = css`
  font-family: ${(props) => props.theme.text.font.family};
`;

const StyledText = styled('span').withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    defaultValidatorFn(prop) && prop !== 'size',
})`
  ${genericStyles}
  ${(props) => sizeStyle(props)}
  ${(props) => props.textAlign && textAlignStyle}
  ${(props) => props.truncate && truncateStyle}
  ${(props) => props.colorProp && colorStyle}
  ${(props) => props.weight && weightStyle}
  ${(props) => props.wordBreak && wordBreakStyle}
  ${(props) =>
    props.theme.text.font && props.theme.text.font.family && fontFamily}

  ${(props) => props.theme.text && props.theme.text.extend}
`;

StyledText.defaultProps = {};
Object.setPrototypeOf(StyledText.defaultProps, defaultProps);

export { StyledText };
