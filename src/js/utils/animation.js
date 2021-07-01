import { css, keyframes } from 'styled-components';

const PULSE_SIZES = {
  xsmall: 1.001,
  small: 1.01,
  medium: 1.1,
  large: 1.5,
  xlarge: 2,
};
const SLIDE_SIZES = {
  xsmall: 1,
  small: 5,
  medium: 10,
  large: 50,
  xlarge: 200,
};
const JIGGLE_SIZES = {
  xsmall: 0.1,
  small: 1,
  medium: 5,
  large: 400,
  xlarge: 1000,
};
const ZOOM_SIZES = {
  xsmall: 0.001,
  small: 0.01,
  medium: 0.05,
  large: 0.1,
  xlarge: 0.5,
};
export const animationBounds = (type, size = 'medium') => {
  if (type === 'draw') {
    return ['', `stroke-dashoffset: 0`];
  }
  if (type === 'fadeIn') {
    return ['opacity: 0;', 'opacity: 1;'];
  }
  if (type === 'fadeOut') {
    return ['opacity: 1;', 'opacity: 0;'];
  }
  if (type === 'jiggle') {
    const deg = JIGGLE_SIZES[size];
    return [`transform: rotate(-${deg}deg);`, `transform: rotate(${deg}deg);`];
  }
  if (type === 'pulse') {
    return ['transform: scale(1);', `transform: scale(${PULSE_SIZES[size]})`];
  }
  if (type === 'rotateRight') {
    return [`transform: rotate(0deg);`, `transform: rotate(359deg);`];
  }
  if (type === 'rotateLeft') {
    return [`transform: rotate(0deg);`, `transform: rotate(-359deg);`];
  }
  if (type === 'flipIn') {
    return ['transform: rotateY(90deg);', 'transform: rotateY(0);'];
  }
  if (type === 'flipOut') {
    return ['transform: rotateY(0);', 'transform: rotateY(90deg);'];
  }
  if (type === 'slideDown') {
    return [
      `transform: translateY(-${SLIDE_SIZES[size]}%);`,
      'transform: none;',
    ];
  }
  if (type === 'slideLeft') {
    return [
      `transform: translateX(${SLIDE_SIZES[size]}%);`,
      'transform: none;',
    ];
  }
  if (type === 'slideRight') {
    return [
      `transform: translateX(-${SLIDE_SIZES[size]}%);`,
      'transform: none;',
    ];
  }
  if (type === 'slideUp') {
    return [
      `transform: translateY(${SLIDE_SIZES[size]}%);`,
      'transform: none;',
    ];
  }
  if (type === 'zoomIn') {
    return [`transform: scale(${1 - ZOOM_SIZES[size]});`, 'transform: none;'];
  }
  if (type === 'zoomOut') {
    return [`transform: scale(${1 + ZOOM_SIZES[size]});`, 'transform: none;'];
  }
  return [];
};

export const normalizeTiming = (time, defaultTiming) =>
  typeof time === 'number' ? `${time / 1000.0}s` : time || defaultTiming;

export const animationEnding = (type) => {
  if (type === 'draw') {
    return 'linear forwards';
  }
  if (type === 'jiggle') {
    return 'alternate infinite';
  }
  if (type === 'pulse') {
    return 'alternate infinite';
  }
  if (type === 'rotateRight' || type === 'rotateLeft') {
    return 'infinite linear';
  }
  return 'forwards';
};

export const animationObjectStyle = (animation, theme, themeObj) => {
  const bounds = animationBounds(animation.type, animation.size);
  const animationTheme =
    (themeObj && themeObj.animation) || theme.global.animation;

  if (bounds) {
    const animationTransition = css`
      from {
        ${bounds[0]};
      }
      to {
        ${bounds[1]};
      }
    `;

    const defaultDuration = () =>
      normalizeTiming(
        animationTheme[animation.type]
          ? animationTheme[animation.type].duration
          : animation.duration,
        animationTheme.duration,
      );

    return css`
      ${keyframes`${animationTransition}`}
      ${normalizeTiming(animation.duration, defaultDuration())}
    ${normalizeTiming(animation.delay, '0s')}
    ${animationEnding(animation.type)}
    `;
  }
  return '';
};
