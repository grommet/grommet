import styled, { css } from 'styled-components';

const marginStyle = (props) => {
  if (typeof props.margin === 'string') {
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

const StyledParagraph = styled.p`
  ${props => sizeStyle(props)}
  ${props => props.margin && marginStyle(props)}
  ${props => props.textAlign && textAlignStyle}
`;

export default StyledParagraph.extend`
  ${props => props.theme.paragraph && props.theme.paragraph.extend}
`;
