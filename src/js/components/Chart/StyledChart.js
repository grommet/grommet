import styled, { css, keyframes } from 'styled-components';

import { genericStyles } from '../../utils';
import { defaultProps } from '../../default-props';

const animateStyle = ({ theme, typeProp }) => {
  let animateBounds;
  if (typeProp === 'line')
    // 200% allows the line to be squiggly
    animateBounds = ['stroke-dashoffset: 200%;', 'stroke-dashoffset: 0%;'];
  else if (typeProp === 'point') animateBounds = ['opacity: 0;', 'opacity: 1;'];
  else animateBounds = ['transform: scaleY(0);', 'transform: scaleY(1);'];
  return css`
    ${typeProp === 'line' && 'stroke-dasharray: 200%;'}
    animation:
    ${keyframes`from { ${animateBounds[0]} } to { ${animateBounds[1]} }`}
    ${theme.global.animation.duration}
    forwards;
    ${(typeProp === 'bar' || typeProp === 'area') &&
      'transform-origin: center bottom 0;'}
  `;
};

const StyledChart = styled.svg`
  display: block;
  max-width: 100%;
  overflow: visible;

  ${genericStyles}
  ${props => props.animate && animateStyle(props)}
  ${props => props.theme.chart && props.theme.chart.extend};
`;

StyledChart.defaultProps = {};
Object.setPrototypeOf(StyledChart.defaultProps, defaultProps);

export { StyledChart };
