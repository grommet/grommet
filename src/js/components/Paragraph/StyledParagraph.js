import styled, { css } from 'styled-components';

import { genericStyles, normalizeColor } from '../../utils';

const colorStyle = css`
  color: ${props => normalizeColor(props.colorProp, props.theme)};
`;

const sizeStyle = (props) => {
  const size = props.size || 'medium';
  const data = props.theme.paragraph[size];
  return css`
    font-size: ${data.size};
    line-height: ${data.height};
    max-width: ${data.maxWidth};
  `;
};

const TEXT_ALIGN_MAP = {
  center: 'center',
  end: 'right',
  start: 'left',
};

const textAlignStyle = css`
  text-align: ${props => TEXT_ALIGN_MAP[props.textAlign]};
`;

export const StyledParagraph = styled.p`
  ${genericStyles}
  ${props => sizeStyle(props)}
  ${props => props.textAlign && textAlignStyle}
  ${props => props.colorProp && colorStyle}

  ${props => props.theme.paragraph && props.theme.paragraph.extend}
`;
