import styled, { css } from 'styled-components';

import { defaultProps } from '../../default-props';
import { animationObjectStyle } from '../../utils';

const animationItemStyle = (item, theme) =>
  animationObjectStyle({ type: item }, theme);

const animationStyle = css`
  ${props =>
    props.animation === 'draw'
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
