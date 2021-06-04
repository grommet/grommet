import styled, { css } from 'styled-components';

import { defaultProps } from '../../default-props';
import { animationObjectStyle } from '../../utils/animations';

const animationItemStyle = (animationType, theme) => {
  if (typeof animationType === 'string') {
    return animationObjectStyle({ type: animationType }, theme);
  }
  if (typeof animationType === 'object') {
    return animationObjectStyle(animationType, theme);
  }
  if (typeof animationType === 'boolean') {
    return animationObjectStyle({ type: 'draw' }, theme);
  }
  return '';
};

const animationStyle = props => {
  const animationType = props.animation.type || props.animation;

  if (animationType === 'draw' || animationType === true) {
    return css`
      path {
        stroke-dasharray: 500;
        stroke-dashoffset: 500;
        animation: ${animationItemStyle(props.animation, props.theme)};
      }
    `;
  }
  return css`
    animation: ${animationItemStyle(props.animation, props.theme)};
  `;
};

const availableAnimations = [true, 'draw', 'pulse'];

const connectionStyle = (connections, theme) =>
  connections.map((connection, index) => {
    if (connection !== undefined && connection.props.animation !== undefined) {
      const { type } = connection.props.animation;
      const animationType = type || connection.props.animation;

      if (!availableAnimations.includes(animationType)) {
        return '';
      }
      if (animationType === 'draw' || animationType === true) {
        return css`
          path:nth-child(${index + 1}) {
            stroke-dasharray: 500;
            stroke-dashoffset: 500;
            animation: ${animationItemStyle(connection.props.animation, theme)};
          }
        `;
      }
      return css`
        path:nth-child(${index + 1}) {
          stroke-dasharray: 0;
          stroke-dashoffset: 0;
          animation: ${animationItemStyle(connection.props.animation, theme)};
        }
      `;
    }
    return '';
  });

const StyledDiagram = styled.svg`
  max-width: 100%;
  width: 100%;
  height: 100%;

  /* connection's animation comes first to override Diagram's animations */
  ${props =>
    props.connections && connectionStyle(props.connections, props.theme)}
  ${props =>
    props.animation &&
    availableAnimations.includes(props.animation.type || props.animation)
      ? animationStyle(props)
      : ''}
  ${props => props.theme.diagram && props.theme.diagram.extend};
`;

StyledDiagram.defaultProps = {};
Object.setPrototypeOf(StyledDiagram.defaultProps, defaultProps);

export { StyledDiagram };
