import styled, { css, keyframes } from 'styled-components';

import { backgroundStyle, baseStyle, breakpointStyle } from '../../utils';

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
  width: 100vw;
  height: 100vh;
`;

const responsiveLayerStyle = `
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

export const StyledLayer = styled.div`
  ${baseStyle} background: unset;
  position: relative;
  z-index: 10;
  pointer-events: none;
  outline: none;

  ${props => {
    if (props.position === 'hidden') {
      return hiddenPositionStyle;
    }
    const styles = [desktopLayerStyle];
    if (props.responsive && props.theme.layer.responsiveBreakpoint) {
      const breakpoint =
        props.theme.global.breakpoints[props.theme.layer.responsiveBreakpoint];
      styles.push(breakpointStyle(breakpoint, responsiveLayerStyle));
    }
    return styles;
  }} ${props => props.theme.layer && props.theme.layer.extend};
`;

export const StyledOverlay = styled.div`
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

const MARGINS = {
  top: (margin, theme) =>
    theme.global.edgeSize[margin.top || margin.vertical || margin] || '0px',
  bottom: (margin, theme) =>
    theme.global.edgeSize[margin.bottom || margin.vertical || margin] || '0px',
  left: (margin, theme) =>
    theme.global.edgeSize[margin.left || margin.horizontal || margin] || '0px',
  right: (margin, theme) =>
    theme.global.edgeSize[margin.right || margin.horizontal || margin] || '0px',
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
};

// POSITIONS combines 'position', 'full', and 'margin' properties, since
// they are all interdependent.
// Basically, non-full axes combine 50% position with -50% translation.
// full axes pin to the window edges offset by any margin.
// The keyframe animations are included as they are done via translations
// as well so they must take into account the non-animated positioning.
const POSITIONS = {
  center: {
    vertical: (margin, theme) => css`
      top: ${MARGINS.top(margin, theme)};
      bottom: ${MARGINS.bottom(margin, theme)};
      left: 50%;
      transform: translateX(-50%);
      animation: ${KEYFRAMES.center.vertical} 0.2s ease-in-out forwards;
    `,
    horizontal: (margin, theme) => css`
      left: ${MARGINS.left(margin, theme)};
      right: ${MARGINS.right(margin, theme)};
      top: 50%;
      transform: translateY(-50%);
      animation: ${KEYFRAMES.center.horizontal} 0.2s ease-in-out forwards;
    `,
    true: (margin, theme) => css`
      top: ${MARGINS.top(margin, theme)};
      bottom: ${MARGINS.bottom(margin, theme)};
      left: ${MARGINS.left(margin, theme)};
      right: ${MARGINS.right(margin, theme)};
      animation: ${KEYFRAMES.center.true} 0.2s ease-in-out forwards;
    `,
    false: () => css`
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: ${KEYFRAMES.center.false} 0.2s ease-in-out forwards;
    `,
  },

  top: {
    vertical: (margin, theme) => css`
      top: ${MARGINS.top(margin, theme)};
      bottom: ${MARGINS.bottom(margin, theme)};
      left: 50%;
      transform: translate(-50%, 0%);
      animation: ${KEYFRAMES.top.vertical} 0.2s ease-in-out forwards;
    `,
    horizontal: (margin, theme) => css`
      left: ${MARGINS.left(margin, theme)};
      right: ${MARGINS.right(margin, theme)};
      top: ${MARGINS.top(margin, theme)};
      transform: translateY(0);
      animation: ${KEYFRAMES.top.horizontal} 0.2s ease-in-out forwards;
    `,
    true: (margin, theme) => css`
      top: ${MARGINS.top(margin, theme)};
      bottom: ${MARGINS.bottom(margin, theme)};
      left: ${MARGINS.left(margin, theme)};
      right: ${MARGINS.right(margin, theme)};
      transform: translateY(0);
      animation: ${KEYFRAMES.top.true} 0.2s ease-in-out forwards;
    `,
    false: (margin, theme) => css`
      top: ${MARGINS.top(margin, theme)};
      left: 50%;
      transform: translate(-50%, 0);
      animation: ${KEYFRAMES.top.false} 0.2s ease-in-out forwards;
    `,
  },

  bottom: {
    vertical: (margin, theme) => css`
      top: ${MARGINS.top(margin, theme)};
      bottom: ${MARGINS.bottom(margin, theme)};
      left: 50%;
      transform: translate(-50%, 0);
      animation: ${KEYFRAMES.bottom.vertical} 0.2s ease-in-out forwards;
    `,
    horizontal: (margin, theme) => css`
      left: ${MARGINS.left(margin, theme)};
      right: ${MARGINS.right(margin, theme)};
      bottom: ${MARGINS.bottom(margin, theme)};
      transform: translateY(0);
      animation: ${KEYFRAMES.bottom.horizontal} 0.2s ease-in-out forwards;
    `,
    true: (margin, theme) => css`
      top: ${MARGINS.top(margin, theme)};
      bottom: ${MARGINS.bottom(margin, theme)};
      left: ${MARGINS.left(margin, theme)};
      right: ${MARGINS.right(margin, theme)};
      transform: translateY(0);
      animation: ${KEYFRAMES.bottom.true} 0.2s ease-in-out forwards;
    `,
    false: (margin, theme) => css`
      bottom: ${MARGINS.bottom(margin, theme)};
      left: 50%;
      transform: translate(-50%, 0);
      animation: ${KEYFRAMES.bottom.false} 0.2s ease-in-out forwards;
    `,
  },

  left: {
    vertical: (margin, theme) => css`
      top: ${MARGINS.top(margin, theme)};
      bottom: ${MARGINS.bottom(margin, theme)};
      left: ${MARGINS.left(margin, theme)};
      transform: translateX(0);
      animation: ${KEYFRAMES.left.vertical} 0.2s ease-in-out forwards;
    `,
    horizontal: (margin, theme) => css`
      left: ${MARGINS.left(margin, theme)};
      right: ${MARGINS.right(margin, theme)};
      top: 50%;
      transform: translate(0, -50%);
      animation: ${KEYFRAMES.left.horizontal} 0.2s ease-in-out forwards;
    `,
    true: (margin, theme) => css`
      top: ${MARGINS.top(margin, theme)};
      bottom: ${MARGINS.bottom(margin, theme)};
      left: ${MARGINS.left(margin, theme)};
      right: ${MARGINS.right(margin, theme)};
      transform: translateX(0);
      animation: ${KEYFRAMES.left.true} 0.2s ease-in-out forwards;
    `,
    false: (margin, theme) => css`
      left: ${MARGINS.left(margin, theme)};
      top: 50%;
      transform: translate(0, -50%);
      animation: ${KEYFRAMES.left.false} 0.2s ease-in-out forwards;
    `,
  },

  right: {
    vertical: (margin, theme) => css`
      top: ${MARGINS.top(margin, theme)};
      bottom: ${MARGINS.bottom(margin, theme)};
      right: ${MARGINS.right(margin, theme)};
      transform: translateX(0);
      animation: ${KEYFRAMES.right.vertical} 0.2s ease-in-out forwards;
    `,
    horizontal: (margin, theme) => css`
      left: ${MARGINS.left(margin, theme)};
      right: ${MARGINS.right(margin, theme)};
      top: 50%;
      transform: translate(0, -50%);
      animation: ${KEYFRAMES.right.horizontal} 0.2s ease-in-out forwards;
    `,
    true: (margin, theme) => css`
      top: ${MARGINS.top(margin, theme)};
      bottom: ${MARGINS.bottom(margin, theme)};
      left: ${MARGINS.left(margin, theme)};
      right: ${MARGINS.right(margin, theme)};
      transform: translateX(0);
      animation: ${KEYFRAMES.right.true} 0.2s ease-in-out forwards;
    `,
    false: (margin, theme) => css`
      right: ${MARGINS.right(margin, theme)};
      top: 50%;
      transform: translate(0, -50%);
      animation: ${KEYFRAMES.right.false} 0.2s ease-in-out forwards;
    `,
  },
};

const desktopContainerStyle = css`
  position: ${props => (props.modal ? 'absolute' : 'fixed')};
  max-height: ${props =>
    `calc(100% - ${MARGINS.top(props.margin, props.theme)} - ${MARGINS.bottom(
      props.margin,
      props.theme,
    )})`};
  max-width: ${props =>
    `calc(100% - ${MARGINS.left(props.margin, props.theme)} - ${MARGINS.right(
      props.margin,
      props.theme,
    )})`};
  border-radius: ${props =>
    props.plain ? 0 : props.theme.layer.border.radius};
  ${props =>
    (props.position !== 'hidden' &&
      POSITIONS[props.position][props.full](props.margin, props.theme)) ||
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

export const StyledContainer = styled.div`
  ${props => (!props.modal ? baseStyle : '')} display: flex;
  flex-direction: column;
  min-height: ${props => props.theme.global.size.xxsmall};
  ${props =>
    !props.plain &&
    props.theme.layer.background &&
    backgroundStyle(props.theme.layer.background, props.theme)} outline: none;
  pointer-events: all;
  z-index: 15;

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
