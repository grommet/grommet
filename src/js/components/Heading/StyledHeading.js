import styled, { css } from 'styled-components';

import { baseStyle, colorForName, palm } from '../../utils';

const marginStyle = (props) => {
  if (typeof props.margin === 'string') {
    const margin = props.theme.global.edgeSize[props.margin];
    const narrowMargin = props.theme.global.edgeSize.narrow[props.margin];
    return css`
      margin-top: ${margin};
      margin-bottom: ${margin};
      ${(props.responsive ? palm(`
        margin-top: ${narrowMargin};
        margin-bottom: ${narrowMargin};
      `) : '')}
    `;
  }
  const result = [];
  if (props.margin.top) {
    if (props.margin.top === 'none') {
      result.push(css`margin-top: 0;`);
    } else {
      result.push(css`margin-top: ${props.theme.global.edgeSize[props.margin.top]};`);
      if (props.responsive) {
        result.push(palm(`margin-top: ${props.theme.global.edgeSize.narrow[props.margin.top]};`));
      }
    }
  }
  if (props.margin.bottom) {
    if (props.margin.bottom === 'none') {
      result.push(css`margin-bottom: 0;`);
    } else {
      result.push(css`margin-bottom: ${props.theme.global.edgeSize[props.margin.bottom]};`);
      if (props.responsive) {
        result.push(palm(`margin-bottom: ${props.theme.global.edgeSize.narrow[props.margin.bottom]};`));
      }
    }
  }
  return result;
};

const sizeStyle = (props) => {
  // size is a combination of the level and size properties
  const size = props.size || 'medium';
  const data = props.theme.heading.level[props.level][size];
  const narrowData = props.theme.heading.level[Math.min(props.level + 1, 4)][size];
  return css`
    font-size: ${data.size};
    line-height: ${data.height};
    max-width: ${data.maxWidth};
    font-weight: ${props.theme.heading.weight};
    ${(props.responsive ? palm(`
      font-size: ${narrowData.size};
      line-height: ${narrowData.height};
      max-width: ${narrowData.maxWidth};
      font-weight: ${props.theme.heading.weight};
    `) : '')}
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
  color: ${props => colorForName(props.color, props.theme)};
`;

const StyledHeading = styled.h1`
  ${props => !props.theme.heading.font && baseStyle}
  ${props => props.theme.heading.font && css`
    font-family: ${props.theme.heading.font.family};
  `}
  ${props => sizeStyle(props)}
  ${props => props.margin && marginStyle(props)}
  ${props => props.textAlign && textAlignStyle}
  ${props => props.truncate && truncateStyle}
  ${props => props.color && colorStyle}
`;

export default StyledHeading.extend`
  ${props => props.theme.heading && props.theme.heading.extend}
`;
