import styled, { css, keyframes } from 'styled-components';

import { defaultProps } from '../../default-props';

const PULSE_SIZES = {
  xsmall: 1.001,
  small: 1.01,
  medium: 1.1,
  large: 1.5,
  xlarge: 2,
};

const normalizeTiming = (time, defaultTiming) =>
  time ? `${time / 1000.0}s` : defaultTiming;

const animationEnding = type => {
  if (type === 'pulse') {
    return 'alternate infinite';
  }
  if (type === 'draw') {
    return 'linear forwards';
  }
  return 'fowards';
};

const animationBounds = (type, size = 'medium') => {
  if (type === 'pulse') {
    return ['transform: scale(1);', `transform: scale(${PULSE_SIZES[size]})`];
  }
  if (type === 'draw') {
    return ['', `stroke-dashoffset: 0`];
  }
  return [];
};

const animationObjectStyle = (animation, theme) => {
  const bounds = animationBounds(animation.type, animation.size);

  if (bounds) {
    const animationTransition = css`
      from {
        ${bounds[0]};
      }
      to {
        ${bounds[1]};
      }
    `;
    return css`
    ${keyframes`${animationTransition}`}
    ${normalizeTiming(
      animation.duration,
      (theme.global.animation[animation.type]
        ? theme.global.animation[animation.type].duration
        : undefined) || theme.global.animation.duration,
    )}
      ${normalizeTiming(animation.delay, '0s')}
      ${animationEnding(animation.type)}
    `;
  }
  return '';
};

const animationItemStyle = (item, theme) =>
  animationObjectStyle({ type: item }, theme);

const animationStyle = css`
  ${props => css`
    path {
      stroke-dasharray: 500;
      stroke-dashoffset: 500;
      animation: ${animationItemStyle(props.animation, props.theme)};
    }
  `};
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
