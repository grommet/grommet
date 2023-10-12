import styled, { css } from 'styled-components';

import { genericStyles, normalizeColor, textAlignStyle } from '../../utils';
import { defaultProps } from '../../default-props';

const colorStyle = css`
  color: ${(props) => normalizeColor(props.colorProp, props.theme)};
`;

const sizeStyle = (props) => {
  const size = props.size || 'medium';
  const data = props.theme.paragraph[size];
  return css`
    font-size: ${data ? data.size : size};
    line-height: ${data ? data.height : 'normal'};
    max-width: ${props.fillProp ? 'none' : data && data.maxWidth};
  `;
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
