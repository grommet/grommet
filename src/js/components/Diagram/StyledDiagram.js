import styled, { css } from 'styled-components';

import { defaultProps } from '../../default-props';
import { animationObjectStyle } from '../../utils/animation';

const animationItemStyle = (animationType, theme) => {
  if (typeof animationType === 'string') {
    return animationObjectStyle({ type: animationType }, theme, theme.diagram);
  }
  if (typeof animationType === 'object') {
    return animationObjectStyle(animationType, theme, theme.diagram);
  }
  if (typeof animationType === 'boolean') {
    return animationObjectStyle({ type: 'draw' }, theme, theme.diagram);
  }
  return '';
};

const animationStyle = (props) => {
  const animationCopy = props.animation;
  if (typeof props.animation === 'object') {
    animationCopy.type = animationCopy.type || 'draw';
  }
  const animationType = animationCopy.type || animationCopy;

  if (animationType === 'draw' || animationType === true) {
    return css`
      path {
        stroke-dasharray: 500;
        stroke-dashoffset: 500;
        animation: ${animationItemStyle(animationCopy, props.theme)};
      }
    `;
  }
  return css`
    animation: ${animationItemStyle(animationCopy, props.theme)};
  `;
};

const connectionStyle = (connection, index, theme) => {
  let { type } = connection.props.animation;
  if (typeof connection.props.animation === 'object') {
    type = type || 'draw';
  }
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
  ${(props) =>
    props.connections &&
    props.connections.map((connection, index) => {
      if (connection !== undefined && connection.props.animation) {
        const { animation } = connection.props;
        // setting type to 'draw' if user doesn't specify a type
        if (typeof animation === 'object') {
          // copying 'connection' to avoid linter error
          const connectionCopy = connection;
          connectionCopy.props.animation.type = animation.type || 'draw';
          return availableAnimations.includes(animation.type || animation)
            ? connectionStyle(connectionCopy, index, props.theme)
            : '';
        }
        return connectionStyle(connection, index, props.theme);
      }
      return '';
    })}

  ${(props) =>
    props.animation &&
    (availableAnimations.includes(props.animation.type || props.animation) ||
      Object.keys(props.animation).length !== 0)
      ? animationStyle(props)
      : ''}
  ${(props) => props.theme.diagram && props.theme.diagram.extend}
`;

StyledDiagram.defaultProps = {};
Object.setPrototypeOf(StyledDiagram.defaultProps, defaultProps);

export { StyledDiagram };
