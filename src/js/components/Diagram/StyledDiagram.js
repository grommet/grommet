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

const connectionStyle = (connection, index, theme) => {
  const { type } = connection.props.animation;
  const animationType = type || connection.props.animation;

  return css`
    path:nth-child(${index + 1}) {
      stroke-dasharray: ${animationType === 'draw' || animationType === true
        ? 500
        : 0};
      stroke-dashoffset: ${animationType === 'draw' || animationType === true
        ? 500
        : 0};
      animation: ${animationItemStyle(connection.props.animation, theme)};
    }
  `;
};

const availableAnimations = [true, 'draw', 'pulse'];

const StyledDiagram = styled.svg`
  max-width: 100%;
  width: 100%;
  height: 100%;

  /* connection's animation comes first to override Diagram's animations */
  ${props =>
    props.connections &&
    props.connections.map((connection, index) => {
      if (
        connection !== undefined &&
        connection.props.animation !== undefined &&
        availableAnimations.includes(
          connection.props.animation.type || connection.props.animation,
        )
      ) {
        return connectionStyle(connection, index, props.theme);
      }
      return '';
    })}
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
