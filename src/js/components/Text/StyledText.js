import styled, { css } from 'styled-components';

import {
  genericStyles,
  normalizeColor,
  textAlignStyle,
  styledComponentsConfig,
} from '../../utils';
import { withTheme } from '../../default-props';

const sizeStyle = (props) => {
  const size = props.size || 'medium';
  const data = props.theme.text[size];
  if (data) {
    return css`
      font-size: ${data.size};
      line-height: ${data.height};
    `;
  }
  return css`
    font-size: ${size};
    line-height: normal;
  `;
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

const StyledText = styled('span')
  .attrs(withTheme)
  .withConfig(styledComponentsConfig)`
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

export { StyledText };
