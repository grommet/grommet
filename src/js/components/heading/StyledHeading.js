import styled, { css } from 'styled-components';

const marginStyle = (props) => {
  if (typeof props.margin === 'string') {
    if (props.margin === 'none') {
      return `
        margin-top: 0;
        margin-bottom: 0;
      `;
    }
    const margin = props.theme.global.edgeSize[props.margin];
    return `
      margin-top: ${margin};
      margin-bottom: ${margin};
    `;
  }
  if (props.margin.top) {
    return `margin-top: ${props.theme.global.edgeSize[props.margin.top]};`;
  }
  if (props.margin.bottom) {
    return `margin-bottom: ${props.theme.global.edgeSize[props.margin.bottom]};`;
  }
  return '';
};

const sizeStyle = (props) => {
  // size is a combination of the level and size properties
  const size = props.size || 'medium';
  const data = props.theme.heading.level[props.level][size];
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

const StyledHeading = styled.h1`
  ${props => sizeStyle(props)}
  ${props => props.margin && marginStyle(props)}
  ${props => props.textAlign && textAlignStyle}
  ${props => props.truncate && truncateStyle}
`;

export default StyledHeading.extend`
  ${props => props.theme.box && props.theme.box.extend}
`;
