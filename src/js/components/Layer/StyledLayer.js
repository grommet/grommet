import styled, { css, keyframes } from 'styled-components';

import { baseStyle, backgroundStyle, breakpointStyle } from '../../utils';
import { defaultProps } from '../../default-props';

const hiddenPositionStyle = css`
  left: -100%;
  right: 100%;
  z-index: -1;
  position: fixed;
`;

const desktopLayerStyle = `
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;

const responsiveLayerStyle = `
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const StyledLayer = styled.div`
  ${baseStyle}
  background: unset;
  position: relative;
  z-index: ${props => props.theme.layer.zIndex};
  pointer-events: none;
  outline: none;

  ${props => {
    if (props.position === 'hidden') {
      return hiddenPositionStyle;
    }
    const styles = [];
    if (props.targetBounds) {
      const { left, right, top, bottom } = props.targetBounds;
      styles.push(`
        position: fixed;
        top: ${top}px;
        left: ${left}px;
        right: ${window.innerWidth - right}px;
        bottom: ${window.innerHeight - bottom}px;
      `);
    } else {
      styles.push(desktopLayerStyle);
    }
    if (props.responsive && props.theme.layer.responsiveBreakpoint) {
      const breakpoint =
        props.theme.global.breakpoints[props.theme.layer.responsiveBreakpoint];
      styles.push(breakpointStyle(breakpoint, responsiveLayerStyle));
    }
    return styles;
  }} ${props => props.theme.layer && props.theme.layer.extend};
`;

StyledLayer.defaultProps = {};
Object.setPrototypeOf(StyledLayer.defaultProps, defaultProps);

const StyledOverlay = styled.div`
  position: absolute;
  ${props => {
    if (props.responsive && props.theme.layer.responsiveBreakpoint) {
      const breakpoint =
        props.theme.global.breakpoints[props.theme.layer.responsiveBreakpoint];
      return breakpointStyle(breakpoint, 'position: relative;');
    }
    return '';
  }} top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  ${props =>
    !props.plain &&
    props.theme.layer.overlay.background &&
    backgroundStyle(
      props.theme.layer.overlay.background,
      props.theme,
    )} pointer-events: all;
`;

const getMargin = (margin, theme, position) => {
  const axis =
    position.indexOf('top') !== -1 || position.indexOf('bottom') !== -1
      ? 'vertical'
      : 'horizontal';
  const marginValue = margin[position] || margin[axis] || margin;
  const marginApplied = theme.global.edgeSize[marginValue] || marginValue;
  const marginInTheme = !!theme.global.edgeSize[marginValue];

  return !marginInTheme && typeof marginValue !== 'string'
    ? '0px'
    : marginApplied;
};

const MARGINS = (margin, theme, position = undefined) => {
  if (position) {
    return getMargin(margin, theme, position);
  }
  return {
    bottom: getMargin(margin, theme, 'bottom'),
    'bottom-left': getMargin(margin, theme, 'bottom-left'),
    'bottom-right': getMargin(margin, theme, 'bottom-right'),
    end: getMargin(margin, theme, 'end'),
    left: getMargin(margin, theme, 'left'),
    right: getMargin(margin, theme, 'right'),
    start: getMargin(margin, theme, 'start'),
    top: getMargin(margin, theme, 'top'),
    'top-right': getMargin(margin, theme, 'top-right'),
    'top-left': getMargin(margin, theme, 'top-left'),
  };
};

const KEYFRAMES = {
  center: {
    vertical: keyframes`
      0% { transform: translateX(-50%) scale(0.8); }
      100% { transform: translateX(-50%) scale(1); }
    `,
    horizontal: keyframes`
      0% { transform: translateY(-50%) scale(0.8); }
      100% { transform: translateY(-50) scale(1); }
    `,
    true: keyframes`
      0% { transform: scale(0.8); }
      100% { transform: scale(1); }
    `,
    false: keyframes`
      0% { transform: translate(-50%, -50%) scale(0.8); }
      100% { transform: translate(-50%, -50%) scale(1); }
    `,
  },
  top: {
    vertical: keyframes`
      0% { transform: translate(-50%, -100%); }
      100% { transform: translate(-50%, 0); }
    `,
    horizontal: keyframes`
      0% { transform: translateY(-100%); }
      100% { transform: translateY(0); }
    `,
    true: keyframes`
      0% { transform: translateY(-100%); }
      100% { transform: translateY(0); }
    `,
    false: keyframes`
      0% { transform: translate(-50%, -100%); }
      100% { transform: translate(-50%, 0); }
    `,
  },
  bottom: {
    vertical: keyframes`
      0% { transform: translate(-50%, 100%); }
      100% { transform: translate(-50%, 0); }
    `,
    horizontal: keyframes`
      0% { transform: translateY(100%); }
      100% { transform: translateY(0); }
    `,
    true: keyframes`
      0% { transform: translateY(100%); }
      100% { transform: translateY(0); }
    `,
    false: keyframes`
      0% { transform: translate(-50%, 100%); }
      100% { transform: translate(-50%, 0); }
    `,
  },
  left: {
    vertical: keyframes`
      0% { transform: translateX(-100%); }
      100% { transform: translateX(0); }
    `,
    horizontal: keyframes`
      0% { transform: translate(-100%, -50%); }
      100% { transform: translate(0, -50%); }
    `,
    true: keyframes`
      0% { transform: translateX(-100%); }
      100% { transform: translateX(0); }
    `,
    false: keyframes`
      0% { transform: translate(-100%, -50%); }
      100% { transform: translate(0, -50%); }
    `,
  },
  right: {
    vertical: keyframes`
      0% { transform: translateX(100%); }
      100% { transform: translateX(0); }
    `,
    horizontal: keyframes`
      0% { transform: translate(100%, -50%); }
      100% { transform: translate(0, -50%); }
    `,
    true: keyframes`
      0% { transform: translateX(100%); }
      100% { transform: translateX(0); }
    `,
    false: keyframes`
      0% { transform: translate(100%, -50%); }
      100% { transform: translate(0, -50%); }
    `,
  },
  start: {
    vertical: keyframes`
      0% { transform: translateX(-100%); }
      100% { transform: translateX(0); }
    `,
    horizontal: keyframes`
      0% { transform: translate(-100%, -50%); }
      100% { transform: translate(0, -50%); }
    `,
    true: keyframes`
      0% { transform: translateX(-100%); }
      100% { transform: translateX(0); }
    `,
    false: keyframes`
      0% { transform: translate(-100%, -50%); }
      100% { transform: translate(0, -50%); }
    `,
  },
  end: {
    vertical: keyframes`
      0% { transform: translateX(100%); }
      100% { transform: translateX(0); }
    `,
    horizontal: keyframes`
      0% { transform: translate(100%, -50%); }
      100% { transform: translate(0, -50%); }
    `,
    true: keyframes`
      0% { transform: translateX(100%); }
      100% { transform: translateX(0); }
    `,
    false: keyframes`
      0% { transform: translate(100%, -50%); }
      100% { transform: translate(0, -50%); }
    `,
  },
};

const animationDuration = 200;

const getAnimationStyle = (props, position, full) => {
  let animation =
    props.animation !== undefined ? props.animation : props.animate;
  if (animation === undefined) animation = 'slide';
  let keys;
  if (animation === 'slide' || animation === true) {
    keys = KEYFRAMES[position][full];
  } else if (animation === 'fadeIn') {
    keys = keyframes`0% { opacity: 0 } 100% { opacity: 1 }`;
  }
  return keys
    ? css`
        animation: ${keys} ${animationDuration / 1000.0}s ease-in-out forwards;
      `
    : '';
};

// POSITIONS combines 'position', 'full', and 'margin' properties, since
// they are all interdependent.
// Basically, non-full axes combine 50% position with -50% translation.
// full axes pin to the window edges offset by any margin.
// The keyframe animations are included as they are done via translations
// as well so they must take into account the non-animated positioning.
const POSITIONS = {
  center: {
    vertical: margin => css`
      top: ${margin.top};
      bottom: ${margin.bottom};
      left: 50%;
      transform: translateX(-50%);
      ${props => getAnimationStyle(props, 'center', 'vertical')}
    `,
    horizontal: margin => css`
      left: ${margin.left};
      right: ${margin.right};
      top: 50%;
      transform: translateY(-50%);
      ${props => getAnimationStyle(props, 'center', 'horizontal')}
    `,
    true: margin => css`
      top: ${margin.top};
      bottom: ${margin.bottom};
      left: ${margin.left};
      right: ${margin.right};
      ${props => getAnimationStyle(props, 'center', 'true')}
    `,
    false: () => css`
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      ${props => getAnimationStyle(props, 'center', 'false')}
    `,
  },

  top: {
    vertical: margin => css`
      top: ${margin.top};
      bottom: ${margin.bottom};
      left: 50%;
      transform: translate(-50%, 0%);
      ${props => getAnimationStyle(props, 'top', 'vertical')}
    `,
    horizontal: margin => css`
      left: ${margin.left};
      right: ${margin.right};
      top: ${margin.top};
      transform: translateY(0);
      ${props => getAnimationStyle(props, 'top', 'horizontal')}
    `,
    true: margin => css`
      top: ${margin.top};
      bottom: ${margin.bottom};
      left: ${margin.left};
      right: ${margin.right};
      transform: translateY(0);
      ${props => getAnimationStyle(props, 'top', 'true')}
    `,
    false: margin => css`
      top: ${margin.top};
      left: 50%;
      transform: translate(-50%, 0);
      ${props => getAnimationStyle(props, 'top', 'false')}
    `,
  },

  bottom: {
    vertical: margin => css`
      top: ${margin.top}
      bottom: ${margin.bottom};
      left: 50%;
      transform: translate(-50%, 0);
      ${props => getAnimationStyle(props, 'bottom', 'vertical')}
    `,
    horizontal: margin => css`
      left: ${margin.left};
      right: ${margin.top};
      bottom: ${margin.bottom};
      transform: translateY(0);
      ${props => getAnimationStyle(props, 'bottom', 'horizontal')}
    `,
    true: margin => css`
      top: ${margin.top};
      bottom: ${margin.bottom};
      left: ${margin.left};
      right: ${margin.right};
      transform: translateY(0);
      ${props => getAnimationStyle(props, 'bottom', 'true')}
    `,
    false: margin => css`
      bottom: ${margin.bottom};
      left: 50%;
      transform: translate(-50%, 0);
      ${props => getAnimationStyle(props, 'bottom', 'false')}
    `,
  },

  left: {
    vertical: margin => css`
      top: ${margin.top};
      bottom: ${margin.bottom};
      left: ${margin.left};
      transform: translateX(0);
      ${props => getAnimationStyle(props, 'left', 'vertical')}
    `,
    horizontal: margin => css`
      left: ${margin.left};
      right: ${margin.right};
      top: 50%;
      transform: translate(0, -50%);
      ${props => getAnimationStyle(props, 'left', 'horizontal')}
    `,
    true: margin => css`
      top: ${margin.top};
      bottom: ${margin.bottom};
      left: ${margin.left};
      right: ${margin.right};
      transform: translateX(0);
      ${props => getAnimationStyle(props, 'left', 'true')}
    `,
    false: margin => css`
      left: ${margin.left};
      top: 50%;
      transform: translate(0, -50%);
      ${props => getAnimationStyle(props, 'left', 'false')}
    `,
  },

  right: {
    vertical: margin => css`
      top: ${margin.top};
      bottom: ${margin.bottom};
      right: ${margin.right};
      transform: translateX(0);
      ${props => getAnimationStyle(props, 'right', 'vertical')}
    `,
    horizontal: margin => css`
      left: ${margin.left};
      right: ${margin.right};
      top: 50%;
      transform: translate(0, -50%);
      ${props => getAnimationStyle(props, 'right', 'horizontal')}
    `,
    true: margin => css`
      top: ${margin.top};
      bottom: ${margin.bottom};
      left: ${margin.left};
      right: ${margin.right};
      transform: translateX(0);
      ${props => getAnimationStyle(props, 'right', 'true')}
    `,
    false: margin => css`
      right: ${margin.right};
      top: 50%;
      transform: translate(0, -50%);
      ${props => getAnimationStyle(props, 'right', 'false')}
    `,
  },

  start: {
    vertical: margin => css`
      top: ${margin.top};
      bottom: ${margin.bottom};
      inset-inline-start: ${margin.start};
      transform: translateX(0);
      ${props => getAnimationStyle(props, 'start', 'vertical')}
    `,
    horizontal: margin => css`
      inset-inline-start: ${margin.start};
      inset-inline-end: ${margin.end};
      top: 50%;
      transform: translate(0, -50%);
      ${props => getAnimationStyle(props, 'start', 'horizontal')}
    `,
    true: margin => css`
      top: ${margin.top};
      bottom: ${margin.bottom};
      inset-inline-start: ${margin.start};
      inset-inline-end: ${margin.end};
      transform: translateX(0);
      ${props => getAnimationStyle(props, 'start', 'true')}
    `,
    false: margin => css`
      inset-inline-start: ${margin.start};
      top: 50%;
      transform: translate(0, -50%);
      ${props => getAnimationStyle(props, 'start', 'false')}
    `,
  },

  end: {
    vertical: margin => css`
      top: ${margin.top};
      bottom: ${margin.bottom};
      inset-inline-end: ${margin.end};
      transform: translateX(0);
      ${props => getAnimationStyle(props, 'end', 'vertical')}
    `,
    horizontal: margin => css`
      inset-inline-start: ${margin.start};
      inset-inline-end: ${margin.end};
      top: 50%;
      transform: translate(0, -50%);
      ${props => getAnimationStyle(props, 'end', 'horizontal')}
    `,
    true: margin => css`
      top: ${margin.top};
      bottom: ${margin.bottom};
      inset-inline-start: ${margin.start};
      inset-inline-end: ${margin.end};
      transform: translateX(0);
      ${props => getAnimationStyle(props, 'end', 'true')}
    `,
    false: margin => css`
      inset-inline-end: ${margin.end};
      top: 50%;
      transform: translate(0, -50%);
      ${props => getAnimationStyle(props, 'end', 'false')}
    `,
  },

  'top-right': {
    vertical: margin => css`
      top: ${margin.top};
      bottom: ${margin.bottom};
      right: ${margin.right};
      transform: translateX(0);
      ${props => getAnimationStyle(props, 'top', 'true')};
    `,
    horizontal: margin => css`
      left: ${margin.left};
      right: ${margin.right};
      top: 0;
      transform: translateX(0);
      ${props => getAnimationStyle(props, 'top', 'true')};
    `,
    true: margin => css`
      top: ${margin.top};
      bottom: ${margin.bottom};
      left: ${margin.left};
      right: ${margin.right};
      transform: translateX(0);
      ${props => getAnimationStyle(props, 'top', 'true')};
    `,
    false: margin => css`
      top: ${margin.top};
      right: ${margin.right};
      transform: translateY(0);
      ${props => getAnimationStyle(props, 'top', 'true')};
    `,
  },

  'top-left': {
    vertical: margin => css`
      top: ${margin.top};
      bottom: ${margin.bottom};
      left: ${margin.left};
      transform: translateX(0);
      ${props => getAnimationStyle(props, 'top', 'true')}
    `,
    horizontal: margin => css`
      left: ${margin.left};
      right: ${margin.right};
      top: 0;
      transform: translateX(0);
      ${props => getAnimationStyle(props, 'top', 'true')}
    `,
    true: margin => css`
      top: ${margin.top};
      bottom: ${margin.bottom};
      left: ${margin.left};
      right: ${margin.right};
      transform: translateX(0);
      ${props => getAnimationStyle(props, 'top', 'true')}
    `,
    false: margin => css`
      top: ${margin.top};
      left: ${margin.left};
      transform: translateY(0);
      ${props => getAnimationStyle(props, 'top', 'true')}
    `,
  },

  'bottom-right': {
    vertical: margin => css`
      top: ${margin.top};
      bottom: ${margin.bottom};
      right: ${margin.right};
      transform: translateX(0);
      ${props => getAnimationStyle(props, 'bottom', 'true')}
    `,
    horizontal: margin => css`
      left: ${margin.left};
      right: ${margin.right};
      bottom: ${margin.bottom};
      transform: translateY(0);
      ${props => getAnimationStyle(props, 'bottom', 'true')}
    `,
    true: margin => css`
      top: ${margin.top};
      bottom: ${margin.bottom};
      left: ${margin.left};
      right: ${margin.right};
      transform: translateX(0);
      ${props => getAnimationStyle(props, 'bottom', 'true')}
    `,
    false: margin => css`
      bottom: ${margin.bottom};
      right: ${margin.right};
      transform: translateY(0);
      ${props => getAnimationStyle(props, 'bottom', 'true')}
    `,
  },

  'bottom-left': {
    vertical: margin => css`
      top: ${margin.top};
      bottom: ${margin.bottom};
      left: ${margin.left};
      transform: translateX(0);
      ${props => getAnimationStyle(props, 'bottom', 'true')}
    `,
    horizontal: margin => css`
      left: ${margin.left};
      right: ${margin.right};
      bottom: ${margin.bottom};
      transform: translateY(0);
      ${props => getAnimationStyle(props, 'bottom', 'true')}
    `,
    true: margin => css`
      top: ${margin.top};
      bottom: ${margin.bottom};
      left: ${margin.left};
      right: ${margin.right};
      transform: translateX(0);
      ${props => getAnimationStyle(props, 'bottom', 'true')}
    `,
    false: margin => css`
      bottom: ${margin.bottom};
      left: ${margin.left};
      transform: translateY(0);
      ${props => getAnimationStyle(props, 'bottom', 'true')}
    `,
  },
};

const desktopContainerStyle = css`
  position: ${props => (props.modal ? 'absolute' : 'fixed')};
  max-height: ${props =>
    `calc(100% - ${MARGINS(props.margin, props.theme, 'top')} - ${MARGINS(
      props.margin,
      props.theme,
      'bottom',
    )})`};
  max-width: ${props =>
    `calc(100% - ${MARGINS(props.margin, props.theme, 'left')} - ${MARGINS(
      props.margin,
      props.theme,
      'right',
    )})`};
  border-radius: ${props =>
    props.plain ? 0 : props.theme.layer.border.radius};
  ${props =>
    (props.position !== 'hidden' &&
      POSITIONS[props.position][props.full](
        MARGINS(props.margin, props.theme),
      )) ||
    ''};
`;

const responsiveContainerStyle = css`
  position: relative;
  max-height: none;
  max-width: none;
  border-radius: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transform: none;
  animation: none;
  height: 100vh;
  width: 100vw;
`;

const StyledContainer = styled.div`
  ${props => (!props.modal ? baseStyle : '')} display: flex;
  flex-direction: column;
  min-height: ${props => props.theme.global.size.xxsmall};
  ${props =>
    !props.plain &&
    props.theme.layer.background &&
    backgroundStyle(props.theme.layer.background, props.theme)} outline: none;
  pointer-events: all;
  z-index: ${props => props.theme.layer.container.zIndex};

  ${desktopContainerStyle} ${props => {
    if (props.responsive && props.theme.layer.responsiveBreakpoint) {
      const breakpoint =
        props.theme.global.breakpoints[props.theme.layer.responsiveBreakpoint];
      if (breakpoint) {
        return breakpointStyle(breakpoint, responsiveContainerStyle);
      }
    }
    return '';
  }};
`;

StyledContainer.defaultProps = {};
Object.setPrototypeOf(StyledContainer.defaultProps, defaultProps);

export { animationDuration, StyledLayer, StyledOverlay, StyledContainer };
