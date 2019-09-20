import styled, { css } from 'styled-components';

import { genericStyles, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

const sizeStyle = props => {
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

const weightStyle = css`
  font-weight: ${props => props.weight};
`;

const wordBreakStyle = css`
  word-break: ${props => props.wordBreak};
`;

const StyledText = styled.span`
  ${genericStyles}
  ${props => sizeStyle(props)}
  ${props => props.textAlign && textAlignStyle}
  ${props => props.truncate && truncateStyle}
  ${props => props.colorProp && colorStyle}
  ${props => props.weight && weightStyle}
  ${props => props.wordBreak && wordBreakStyle}

  ${props => props.theme.text && props.theme.text.extend}
`;

StyledText.defaultProps = {};
Object.setPrototypeOf(StyledText.defaultProps, defaultProps);

export { StyledText };
