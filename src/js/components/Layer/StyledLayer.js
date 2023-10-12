import styled, { css, keyframes } from 'styled-components';

import {
  baseStyle,
  backgroundStyle,
  breakpointStyle,
  parseMetricToNum,
} from '../../utils';
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
  position: fixed;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const StyledLayer = styled.div`
  ${baseStyle}
  background: transparent;
  position: relative;
  z-index: ${(props) => props.theme.layer.zIndex};
  pointer-events: none;
  outline: none;

  ${(props) => {
    if (props.position === 'hidden') {
      return hiddenPositionStyle;
    }
    const styles = [];
    styles.push(desktopLayerStyle);
    if (
      props.responsive &&
      props.theme.layer.responsiveBreakpoint &&
      !props.layerTarget
    ) {
      const breakpoint =
        props.theme.global.breakpoints[props.theme.layer.responsiveBreakpoint];
      styles.push(breakpointStyle(breakpoint, responsiveLayerStyle));
    }
    return styles;
  }}
  ${(props) => props.theme.layer && props.theme.layer.extend};
`;

StyledLayer.defaultProps = {};
Object.setPrototypeOf(StyledLayer.defaultProps, defaultProps);

const StyledOverlay = styled.div`
  position: absolute;
  ${(props) => {
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
  ${(props) =>
    props.theme.layer.overlay.backdropFilter &&
    `backdrop-filter: ${props.theme.layer.overlay.backdropFilter};`}
  ${(props) =>
    !props.plain &&
    props.theme.layer.overlay.background &&
    backgroundStyle(
      props.theme.layer.overlay.background,
      props.theme,
    )} pointer-events: all;
  // necessary so overlay doesn't get repainted on scroll
  // improves scroll performance
  // https://dev.opera.com/articles/css-will-change-property/
  will-change: transform;
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
    ? 0
    : parseMetricToNum(marginApplied);
};

const getBounds = (bounds, margin, theme, position = undefined) => {
  if (position) {
    return bounds[position] + getMargin(margin, theme, position);
  }
  return {
    bottom: bounds.bottom + getMargin(margin, theme, 'bottom'),
    // 'bottom-left': getMargin(margin, theme, 'bottom-left'),
    // 'bottom-right': getMargin(margin, theme, 'bottom-right'),
    end: bounds.right + getMargin(margin, theme, 'end'),
    left: bounds.left + getMargin(margin, theme, 'left'),
    right: bounds.right + getMargin(margin, theme, 'right'),
    start: bounds.left + getMargin(margin, theme, 'start'),
    top: bounds.top + getMargin(margin, theme, 'top'),
    // 'top-right': getMargin(margin, theme, 'top-right'),
    // 'top-left': getMargin(margin, theme, 'top-left'),
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
    vertical: (bounds) => css`
      top: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      left: 50%;
      transform: translateX(-50%);
      ${(props) => getAnimationStyle(props, 'center', 'vertical')}
    `,
    horizontal: (bounds) => css`
      left: ${bounds.left}px;
      right: ${bounds.right}px;
      top: 50%;
      transform: translateY(-50%);
      ${(props) => getAnimationStyle(props, 'center', 'horizontal')}
    `,
    true: (bounds) => css`
      top: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      left: ${bounds.left}px;
      right: ${bounds.right}px;
      ${(props) => getAnimationStyle(props, 'center', 'true')}
    `,
    false: () => css`
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      ${(props) => getAnimationStyle(props, 'center', 'false')}
    `,
  },

  top: {
    vertical: (bounds) => css`
      top: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      left: 50%;
      transform: translate(-50%, 0%);
      ${(props) => getAnimationStyle(props, 'top', 'vertical')}
    `,
    horizontal: (bounds) => css`
      left: ${bounds.left}px;
      right: ${bounds.right}px;
      top: ${bounds.top}px;
      transform: translateY(0);
      ${(props) => getAnimationStyle(props, 'top', 'horizontal')}
    `,
    true: (bounds) => css`
      top: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      left: ${bounds.left}px;
      right: ${bounds.right}px;
      transform: translateY(0);
      ${(props) => getAnimationStyle(props, 'top', 'true')}
    `,
    false: (bounds) => css`
      top: ${bounds.top}px;
      left: 50%;
      transform: translate(-50%, 0);
      ${(props) => getAnimationStyle(props, 'top', 'false')}
    `,
  },

  bottom: {
    vertical: (bounds) => css`
      top: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      left: 50%;
      transform: translate(-50%, 0);
      ${(props) => getAnimationStyle(props, 'bottom', 'vertical')}
    `,
    horizontal: (bounds) => css`
      left: ${bounds.left}px;
      right: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      transform: translateY(0);
      ${(props) => getAnimationStyle(props, 'bottom', 'horizontal')}
    `,
    true: (bounds) => css`
      top: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      left: ${bounds.left}px;
      right: ${bounds.right}px;
      transform: translateY(0);
      ${(props) => getAnimationStyle(props, 'bottom', 'true')}
    `,
    false: (bounds) => css`
      bottom: ${bounds.bottom}px;
      left: 50%;
      transform: translate(-50%, 0);
      ${(props) => getAnimationStyle(props, 'bottom', 'false')}
    `,
  },

  left: {
    vertical: (bounds) => css`
      top: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      left: ${bounds.left}px;
      transform: translateX(0);
      ${(props) => getAnimationStyle(props, 'left', 'vertical')}
    `,
    horizontal: (bounds) => css`
      left: ${bounds.left}px;
      right: ${bounds.right}px;
      top: 50%;
      transform: translate(0, -50%);
      ${(props) => getAnimationStyle(props, 'left', 'horizontal')}
    `,
    true: (bounds) => css`
      top: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      left: ${bounds.left}px;
      right: ${bounds.right}px;
      transform: translateX(0);
      ${(props) => getAnimationStyle(props, 'left', 'true')}
    `,
    false: (bounds) => css`
      left: ${bounds.left}px;
      top: 50%;
      transform: translate(0, -50%);
      ${(props) => getAnimationStyle(props, 'left', 'false')}
    `,
  },

  right: {
    vertical: (bounds) => css`
      top: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      right: ${bounds.right}px;
      transform: translateX(0);
      ${(props) => getAnimationStyle(props, 'right', 'vertical')}
    `,
    horizontal: (bounds) => css`
      left: ${bounds.left}px;
      right: ${bounds.right}px;
      top: 50%;
      transform: translate(0, -50%);
      ${(props) => getAnimationStyle(props, 'right', 'horizontal')}
    `,
    true: (bounds) => css`
      top: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      left: ${bounds.left}px;
      right: ${bounds.right}px;
      transform: translateX(0);
      ${(props) => getAnimationStyle(props, 'right', 'true')}
    `,
    false: (bounds) => css`
      right: ${bounds.right}px;
      top: 50%;
      transform: translate(0, -50%);
      ${(props) => getAnimationStyle(props, 'right', 'false')}
    `,
  },

  start: {
    vertical: (bounds) => css`
      top: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      inset-inline-start: ${bounds.start}px;
      transform: translateX(0);
      ${(props) => getAnimationStyle(props, 'start', 'vertical')}
    `,
    horizontal: (bounds) => css`
      inset-inline-start: ${bounds.start}px;
      inset-inline-end: ${bounds.end}px;
      top: 50%;
      transform: translate(0, -50%);
      ${(props) => getAnimationStyle(props, 'start', 'horizontal')}
    `,
    true: (bounds) => css`
      top: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      inset-inline-start: ${bounds.start}px;
      inset-inline-end: ${bounds.end}px;
      transform: translateX(0);
      ${(props) => getAnimationStyle(props, 'start', 'true')}
    `,
    false: (bounds) => css`
      inset-inline-start: ${bounds.start}px;
      top: 50%;
      transform: translate(0, -50%);
      ${(props) => getAnimationStyle(props, 'start', 'false')}
    `,
  },

  end: {
    vertical: (bounds) => css`
      top: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      inset-inline-end: ${bounds.end}px;
      transform: translateX(0);
      ${(props) => getAnimationStyle(props, 'end', 'vertical')}
    `,
    horizontal: (bounds) => css`
      inset-inline-start: ${bounds.start}px;
      inset-inline-end: ${bounds.end}px;
      top: 50%;
      transform: translate(0, -50%);
      ${(props) => getAnimationStyle(props, 'end', 'horizontal')}
    `,
    true: (bounds) => css`
      top: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      inset-inline-start: ${bounds.start}px;
      inset-inline-end: ${bounds.end}px;
      transform: translateX(0);
      ${(props) => getAnimationStyle(props, 'end', 'true')}
    `,
    false: (bounds) => css`
      inset-inline-end: ${bounds.end}px;
      top: 50%;
      transform: translate(0, -50%);
      ${(props) => getAnimationStyle(props, 'end', 'false')}
    `,
  },

  'top-right': {
    vertical: (bounds) => css`
      top: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      right: ${bounds.right}px;
      transform: translateX(0);
      ${(props) => getAnimationStyle(props, 'top', 'true')};
    `,
    horizontal: (bounds) => css`
      left: ${bounds.left}px;
      right: ${bounds.right}px;
      top: 0;
      transform: translateX(0);
      ${(props) => getAnimationStyle(props, 'top', 'true')};
    `,
    true: (bounds) => css`
      top: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      left: ${bounds.left}px;
      right: ${bounds.right}px;
      transform: translateX(0);
      ${(props) => getAnimationStyle(props, 'top', 'true')};
    `,
    false: (bounds) => css`
      top: ${bounds.top}px;
      right: ${bounds.right}px;
      transform: translateY(0);
      ${(props) => getAnimationStyle(props, 'top', 'true')};
    `,
  },

  'top-left': {
    vertical: (bounds) => css`
      top: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      left: ${bounds.left}px;
      transform: translateX(0);
      ${(props) => getAnimationStyle(props, 'top', 'true')}
    `,
    horizontal: (bounds) => css`
      left: ${bounds.left}px;
      right: ${bounds.right}px;
      top: 0;
      transform: translateX(0);
      ${(props) => getAnimationStyle(props, 'top', 'true')}
    `,
    true: (bounds) => css`
      top: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      left: ${bounds.left}px;
      right: ${bounds.right}px;
      transform: translateX(0);
      ${(props) => getAnimationStyle(props, 'top', 'true')}
    `,
    false: (bounds) => css`
      top: ${bounds.top}px;
      left: ${bounds.left}px;
      transform: translateY(0);
      ${(props) => getAnimationStyle(props, 'top', 'true')}
    `,
  },

  'bottom-right': {
    vertical: (bounds) => css`
      top: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      right: ${bounds.right}px;
      transform: translateX(0);
      ${(props) => getAnimationStyle(props, 'bottom', 'true')}
    `,
    horizontal: (bounds) => css`
      left: ${bounds.left}px;
      right: ${bounds.right}px;
      bottom: ${bounds.bottom}px;
      transform: translateY(0);
      ${(props) => getAnimationStyle(props, 'bottom', 'true')}
    `,
    true: (bounds) => css`
      top: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      left: ${bounds.left}px;
      right: ${bounds.right}px;
      transform: translateX(0);
      ${(props) => getAnimationStyle(props, 'bottom', 'true')}
    `,
    false: (bounds) => css`
      bottom: ${bounds.bottom}px;
      right: ${bounds.right}px;
      transform: translateY(0);
      ${(props) => getAnimationStyle(props, 'bottom', 'true')}
    `,
  },

  'bottom-left': {
    vertical: (bounds) => css`
      top: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      left: ${bounds.left}px;
      transform: translateX(0);
      ${(props) => getAnimationStyle(props, 'bottom', 'true')}
    `,
    horizontal: (bounds) => css`
      left: ${bounds.left}px;
      right: ${bounds.right}px;
      bottom: ${bounds.bottom}px;
      transform: translateY(0);
      ${(props) => getAnimationStyle(props, 'bottom', 'true')}
    `,
    true: (bounds) => css`
      top: ${bounds.top}px;
      bottom: ${bounds.bottom}px;
      left: ${bounds.left}px;
      right: ${bounds.right}px;
      transform: translateX(0);
      ${(props) => getAnimationStyle(props, 'bottom', 'true')}
    `,
    false: (bounds) => css`
      bottom: ${bounds.bottom}px;
      left: ${bounds.left}px;
      transform: translateY(0);
      ${(props) => getAnimationStyle(props, 'bottom', 'true')}
    `,
  },
};

const roundStyle = (data, theme, position, margin) => {
  const styles = [];
  const size = data === true ? 'medium' : data;
  const round = theme.global.edgeSize[size] || size;
  // if user provides CSS string such as '50px 12px', apply that always
  const customCSS = round.split(' ').length > 1;

  if (
    margin === 'none' &&
    !customCSS &&
    theme.layer.border.intelligentRounding === true
  ) {
    if (position === 'bottom') {
      styles.push(
        css`
          border-radius: ${round} ${round} 0 0;
        `,
      );
    } else if (position === 'bottom-left') {
      styles.push(
        css`
          border-radius: 0 ${round} 0 0;
        `,
      );
    } else if (position === 'bottom-right') {
      styles.push(
        css`
          border-radius: ${round} 0 0 0;
        `,
      );
    } else if (position === 'end') {
      // only works on Firefox, what should be fallback?
      styles.push(css`
        border-start-start-radius: ${round};
        border-end-start-radius: ${round};
      `);
    } else if (position === 'left') {
      styles.push(
        css`
          border-radius: 0 ${round} ${round} 0;
        `,
      );
    } else if (position === 'right') {
      styles.push(
        css`
          border-radius: ${round} 0 0 ${round};
        `,
      );
    } else if (position === 'start') {
      // only works on Firefox, what should be fallback?
      styles.push(css`
        border-end-end-radius: ${round};
        border-start-end-radius: ${round};
      `);
    } else if (position === 'top') {
      styles.push(
        css`
          border-radius: 0 0 ${round} ${round};
        `,
      );
    } else if (position === 'top-left') {
      styles.push(
        css`
          border-radius: 0 0 ${round} 0;
        `,
      );
    } else if (position === 'top-right') {
      styles.push(
        css`
          border-radius: 0 0 0 ${round};
        `,
      );
    } else {
      // position is center, apply uniform border-radius
      styles.push(
        css`
          border-radius: ${round};
        `,
      );
    }
  } else {
    // if there's a margin apply uniform border-radius, or if user has supplied
    // a complex CSS string such as "50px 20px" apply this
    styles.push(css`
      border-radius: ${round};
    `);
  }

  return styles;
};

const bounds = { left: 0, right: 0, top: 0, bottom: 0 };

const desktopContainerStyle = css`
  ${(props) => {
    if (!props.modal && props.position === 'hidden') {
      return hiddenPositionStyle;
    }
    return css`
      // when there is a target (modal or non-modal) we need to position
      // layer with respect to the target's position
      // ensures positioning and animations stay aligned
      position: ${props.modal || props.layerTarget ? 'absolute' : 'fixed'};
    `;
  }}
  max-height: ${(props) =>
    `calc(100% - ${getBounds(
      bounds,
      props.margin,
      props.theme,
      'top',
    )}px - ${getBounds(bounds, props.margin, props.theme, 'bottom')}px)`};
  max-width: ${(props) =>
    `calc(100% - ${getBounds(
      bounds,
      props.margin,
      props.theme,
      'left',
    )}px - ${getBounds(bounds, props.margin, props.theme, 'right')}px)`};
  ${(props) =>
    props.plain || (props.full && props.margin === 'none')
      ? `border-radius: 0;`
      : roundStyle(
          props.theme.layer.border.radius,
          props.theme,
          props.position,
          props.margin,
        )};
  ${(props) =>
    (props.position !== 'hidden' &&
      POSITIONS[props.position][props.full](
        getBounds(bounds, props.margin, props.theme),
        bounds,
      )) ||
    ''};
`;

const responsiveContainerStyle = (props) => css`
  position: relative;
  max-height: none;
  max-width: none;
  border-radius: 0;
  height: ${!props.layerTarget ? '100vh' : '100%'};
  width: ${!props.layerTarget ? '100vw' : '100%'};
`;

const elevationStyle = css`
  box-shadow: ${(props) =>
    props.theme.global.elevation[props.theme.dark ? 'dark' : 'light'][
      props.theme.layer.container.elevation
    ]};
`;

const StyledContainer = styled.div.withConfig({
  // don't let elevation leak to DOM
  // https://styled-components.com/docs/api#shouldforwardprop
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !['elevation'].includes(prop) && defaultValidatorFn(prop),
})`
  ${(props) => (!props.modal ? baseStyle : '')}
  display: flex;
  flex-direction: column;
  min-height: ${(props) => props.theme.global.size.xxsmall};
  ${(props) =>
    !props.plain &&
    (props.background || props.theme.layer.background) &&
    backgroundStyle(
      props.background || props.theme.layer.background,
      props.theme,
    )} outline: none;
  pointer-events: all;
  z-index: ${(props) => props.theme.layer.container.zIndex};
  ${(props) =>
    !props.plain && props.theme.layer.container.elevation && elevationStyle}
  ${desktopContainerStyle}
  ${(props) => {
    if (props.responsive && props.theme.layer.responsiveBreakpoint) {
      const breakpoint =
        props.theme.global.breakpoints[props.theme.layer.responsiveBreakpoint];
      if (breakpoint) {
        return breakpointStyle(breakpoint, responsiveContainerStyle);
      }
    }
    return '';
  }};
  ${(props) =>
    props.theme.layer.container && props.theme.layer.container.extend};
`;

StyledContainer.defaultProps = {};
Object.setPrototypeOf(StyledContainer.defaultProps, defaultProps);

export { animationDuration, StyledLayer, StyledOverlay, StyledContainer };
