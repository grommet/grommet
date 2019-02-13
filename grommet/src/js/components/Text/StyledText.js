import styled, { css } from 'styled-components';

import { genericStyles, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

const marginStyle = props => {
  if (typeof props.margin === 'string') {
    const margin = props.theme.global.edgeSize[props.margin];
    return `
      margin-top: ${margin};
      margin-bottom: ${margin};
      margin-left: ${margin};
      margin-right: ${margin};
    `;
  }
  if (props.margin.vertical) {
    return `
      margin-top: ${props.theme.global.edgeSize[props.margin.vertical]};
      margin-bottom: ${props.theme.global.edgeSize[props.margin.vertical]};
    `;
  }
  if (props.margin.horizontal) {
    return `
      margin-left: ${props.theme.global.edgeSize[props.margin.horizontal]};
      margin-right: ${props.theme.global.edgeSize[props.margin.horizontal]};
    `;
  }
  if (props.margin.top) {
    return `margin-top: ${props.theme.global.edgeSize[props.margin.top]};`;
  }
  if (props.margin.bottom) {
    return `margin-bottom: ${
      props.theme.global.edgeSize[props.margin.bottom]
    };`;
  }
  if (props.margin.left) {
    return `margin-left: ${props.theme.global.edgeSize[props.margin.left]};`;
  }
  if (props.margin.right) {
    return `margin-right: ${props.theme.global.edgeSize[props.margin.right]};`;
  }
  return '';
};

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

const StyledText = styled.span`
  ${genericStyles}
  ${props => sizeStyle(props)}
  ${props => props.margin && marginStyle(props)}
  ${props => props.textAlign && textAlignStyle}
  ${props => props.truncate && truncateStyle}
  ${props => props.colorProp && colorStyle}
  ${props => props.weight && weightStyle}

  ${props => props.theme.text && props.theme.text.extend}
`;

StyledText.defaultProps = {};
Object.setPrototypeOf(StyledText.defaultProps, defaultProps);

export { StyledText };
