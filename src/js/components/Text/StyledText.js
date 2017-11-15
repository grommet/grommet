import styled, { css } from 'styled-components';

import { colorForName } from '../../utils';

const marginStyle = (props) => {
  if (typeof props.margin === 'string') {
    if (props.margin === 'none') {
      return 'margin: 0;';
    }
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
    return `margin-bottom: ${props.theme.global.edgeSize[props.margin.bottom]};`;
  }
  if (props.margin.left) {
    return `margin-left: ${props.theme.global.edgeSize[props.margin.left]};`;
  }
  if (props.margin.right) {
    return `margin-right: ${props.theme.global.edgeSize[props.margin.right]};`;
  }
  return '';
};

const sizeStyle = (props) => {
  // size is a combination of the level and size properties
  const size = props.size || 'medium';
  const data = props.theme.text[size];
  return css`
    font-size: ${data.size};
    line-height: ${data.height};
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
  color: ${props => colorForName(props.color, props.theme)}
`;

const StyledText = styled.span`
  ${props => sizeStyle(props)}
  ${props => props.margin && marginStyle(props)}
  ${props => props.textAlign && textAlignStyle}
  ${props => props.truncate && truncateStyle}
  ${props => props.color && colorStyle}
`;

export default StyledText.extend`
  ${props => props.theme.text && props.theme.text.extend}
`;
