import styled, { css } from 'styled-components';

import { defaultProps } from '../../default-props';
import { animationObjectStyle } from '../../utils/animations';

const animationItemStyle = (item, theme) => {
  if (typeof item === 'string') {
    return animationObjectStyle({ type: item }, theme);
  }
  if (typeof item === 'object') {
    return animationObjectStyle(item, theme);
  }
  if (typeof item === 'boolean') {
    return animationObjectStyle({ type: 'draw' }, theme);
  }
  return '';
};

const animationStyle = css`
  ${props =>
    props.animation === 'draw' ||
    props.animation.type === 'draw' ||
    props.animation === true
      ? css`
          path {
            stroke-dasharray: 500;
            stroke-dashoffset: 500;
            animation: ${animationItemStyle(props.animation, props.theme)};
          }
        `
      : css`
          animation: ${animationItemStyle(props.animation, props.theme)};
        `}
`;

const StyledDiagram = styled.svg`
  max-width: 100%;
  width: 100%;
  height: 100%;

  ${props => props.animation && animationStyle}
  ${props => props.theme.diagram && props.theme.diagram.extend};
`;

StyledDiagram.defaultProps = {};
Object.setPrototypeOf(StyledDiagram.defaultProps, defaultProps);

export { StyledDiagram };
