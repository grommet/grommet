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

const availableAnimations = [true, 'draw', 'pulse'];

const animationStyle = props => {
  const animationType = props.animation.type || props.animation;
  if (!availableAnimations.includes(animationType)) {
    return 'Not available for Diagram';
  }
  if (animationType === 'draw' || animationType === true) {
    return css`
      path {
        stroke-dasharray: 500;
        stroke-dashoffset: 500;
        animation: ${animationItemStyle(animationType, props.theme)};
      }
    `;
  }
  return css`
    animation: ${animationItemStyle(props.animation, props.theme)};
  `;
};

const handleConnection = connections => {
  console.log('Anything');
  console.log(connections);
};

const StyledDiagram = styled.svg`
  max-width: 100%;
  width: 100%;
  height: 100%;

  ${props => props.connections && handleConnection(props.connections)}
  ${props => props.animation && animationStyle(props)}
  ${props => props.theme.diagram && props.theme.diagram.extend};
`;

StyledDiagram.defaultProps = {};
Object.setPrototypeOf(StyledDiagram.defaultProps, defaultProps);

export { StyledDiagram };
