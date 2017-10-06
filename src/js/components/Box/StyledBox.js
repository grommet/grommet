import styled, { css, keyframes } from 'styled-components';

import { backgroundStyle, colorForName, palm } from '../utils';

const ALIGN_MAP = {
  baseline: 'baseline',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch',
};

const alignStyle = css`
  align-items: ${props => ALIGN_MAP[props.align]};
`;

const ALIGN_CONTENT_MAP = {
  around: 'around',
  between: 'between',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch',
};

const alignContentStyle = css`
  align-content: ${props => ALIGN_CONTENT_MAP[props.alignContent]};
`;

const ALIGN_SELF_MAP = {
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch',
};

const alignSelfStyle = css`
  align-self: ${props => ALIGN_SELF_MAP[props.alignSelf]};
`;

const BASIS_MAP = {
  'full': '100%',
  '1/2': '50%',
  '1/4': '25%',
  '3/4': '75%',
  '1/3': '33.33%',
  '2/3': '66.66%',
};

const basisStyle = css`
  flex-basis: ${props => BASIS_MAP[props.basis] || props.theme.global.size[props.basis]};
`;

const directionStyle = css`
  flex-direction: ${(props) => {
    if (props.direction) {
      return (props.reverse ? `${props.direction}-reverse` : props.direction);
    }
    return 'column-reverse';
  }};
`;

const FLEX_MAP = {
  [true]: '1 1',
  [false]: '0 0',
  grow: '1 0',
  shrink: '0 1',
};

const flexStyle = css`
  flex: ${props => FLEX_MAP[props.flex]};
`;

const fullStyle = (full) => {
  if (full === 'horizontal') {
    return `
      max-width: 100%;
      width: 100vw;
    `;
  }
  if (full === 'vertical') {
    return `
      height: 100vh;
      max-height: 100%;
      overflow: auto;
    `;
  }
  if (full === 'grow') {
    return `
      max-width: 100%;
      width: 100vw;
      min-height: 100vh;
    `;
  }
  if (full) {
    return `
      max-width: 100%;
      width: 100vw;
      height: 100vh;
      max-height: 100%;
      overflow: auto;
    `;
  }
  return undefined;
};

const gridAreaStyle = css`
  grid-area: ${props => props.gridArea};
`;

const JUSTIFY_MAP = {
  between: 'space-between',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
};

const justifyStyle = css`
  justify-content: ${props => JUSTIFY_MAP[props.justify]};
`;

const TEXT_ALIGN_MAP = {
  center: 'center',
  end: 'right',
  start: 'left',
};

const textAlignStyle = css`
  text-align: ${props => TEXT_ALIGN_MAP[props.textAlign]};
`;

const wrapStyle = 'flex-wrap: wrap;';

const borderStyle = (data, theme) => {
  let style = '';
  const color = colorForName(data.color || 'light-2', theme);
  const borderSize = data.size || 'xsmall';
  const side = (typeof data === 'string') ? data : data.side || 'all';
  const value = `solid ${theme.global.borderSize[borderSize]} ${color}`;
  if (side === 'top' || side === 'bottom' || side === 'left' || side === 'right') {
    style = `border-${side}: ${value};`;
  } else if (side === 'horizontal') {
    style = `
      border-left: ${value};
      border-right: ${value};
    `;
  } else if (side === 'vertical') {
    style = `
      border-top: ${value};
      border-bottom: ${value};
    `;
  } else {
    style = `border: ${value};`;
  }
  return style;
};

const edgeStyle = (kind, data, theme) => {
  if (typeof data === 'string') {
    return `${kind}: ${theme.global.edgeSize[data]};`;
  }
  let result = '';
  if (data.horizontal) {
    result += `
      ${kind}-left: ${theme.global.edgeSize[data.horizontal]};
      ${kind}-right: ${theme.global.edgeSize[data.horizontal]};
    `;
  }
  if (data.vertical) {
    result += `
      ${kind}-top: ${theme.global.edgeSize[data.vertical]};
      ${kind}-bottom: ${theme.global.edgeSize[data.vertical]};
    `;
  }
  if (data.top) {
    result += `${kind}-top: ${theme.global.edgeSize[data.top]};`;
  }
  if (data.bottom) {
    result += `${kind}-bottom: ${theme.global.edgeSize[data.bottom]};`;
  }
  if (data.left) {
    result += `${kind}-left: ${theme.global.edgeSize[data.left]};`;
  }
  if (data.right) {
    result += `${kind}-right: ${theme.global.edgeSize[data.right]};`;
  }
  return result;
};

const ROUND_MAP = {
  'full': '100%',
};

const roundStyle = css`
  border-radius: ${props => ROUND_MAP[props.round] || props.theme.global.edgeSize[props.round]};
`;

const responsiveStyle = css`
  ${props => palm(`
    flex-direction: column;
    flex-basis: auto;

    ${props.justify === 'center' && 'align-items: stretch;'}
    ${props.reverse && 'flex-direction: column-reverse'}
  `)}
  }
`;

const INITIAL_ANIMATION_STATE = {
  fadeIn: 'opacity: 0;',
  fadeOut: 'opacity: 1;',
  slideDown: 'transform: translateY(-10%);',
  slideLeft: 'transform: translateX(10%);',
  slideRight: 'transform: translateX(-10%);',
  slideUp: 'transform: translateY(10%);',
  zoomIn: 'transform: scale(0.95);',
  zoomOut: 'transform: scale(1.05);',
};

const KEYFRAMES = {
  fadeIn: keyframes`
    from { ${INITIAL_ANIMATION_STATE.fadeIn} }
    to   { opacity: 1; }
  `,
  fadeOut: keyframes`
    from { ${INITIAL_ANIMATION_STATE.fadeOut} }
    to   { opacity: 0; }
  `,
  slideDown: keyframes`
    from { ${INITIAL_ANIMATION_STATE.slideDown} }
    to   { transform: none; }
  `,
  slideLeft: keyframes`
    from { ${INITIAL_ANIMATION_STATE.slideLeft} }
    to   { transform: none; }
  `,
  slideRight: keyframes`
    from { ${INITIAL_ANIMATION_STATE.slideRight} }
    to   { transform: none; }
  `,
  slideUp: keyframes`
    from { ${INITIAL_ANIMATION_STATE.slideUp} }
    to   { transform: none; }
  `,
  zoomIn: keyframes`
    from { ${INITIAL_ANIMATION_STATE.zoomIn} }
    to   { transform: none; }
  `,
  zoomOut: keyframes`
    from { ${INITIAL_ANIMATION_STATE.zoomOut} }
    to   { transform: none; }
  `,
};

const normalizeTiming = (time, defaultTiming) => (time ? `${time / 1000.0}s` : defaultTiming);

const animationObjectStyle = (animation, theme) => {
  if (KEYFRAMES[animation.type]) {
    return `${KEYFRAMES[animation.type]} ${normalizeTiming(animation.duration, theme.global.animation.duration)} ${normalizeTiming(animation.delay, '0s')} forwards`;
  }
  return '';
};

const animationItemStyle = (item, theme) => {
  if (typeof item === 'string') {
    return animationObjectStyle({ type: item }, theme);
  } else if (Array.isArray(item)) {
    return item.map(a => animationItemStyle(a, theme)).join(', ');
  } else if (typeof item === 'object') {
    return animationObjectStyle(item, theme);
  }
  return '';
};

const animationObjectInitialStyle = (animation) => {
  if (KEYFRAMES[animation.type]) {
    return INITIAL_ANIMATION_STATE[animation.type];
  }
  return '';
};

const animationInitialStyle = (item) => {
  if (typeof item === 'string') {
    return animationObjectInitialStyle({ type: item });
  } else if (Array.isArray(item)) {
    return item.map(a => animationObjectInitialStyle(a)).join('');
  } else if (typeof item === 'object') {
    return animationObjectInitialStyle(item);
  }
  return '';
};

const animationStyle = css`
  ${props => `
    ${animationInitialStyle(props.animation)}
    animation: ${animationItemStyle(props.animation, props.theme)};
  `}
`;

// NOTE: basis must be after flex! Otherwise, flex overrides basis
const StyledBox = styled.div`
  display: flex;
  max-width: 100%;

  ${props => props.align && alignStyle}
  ${props => props.alignContent && alignContentStyle}
  ${props => props.alignSelf && alignSelfStyle}
  ${props => props.background && backgroundStyle(props.background, props.theme)}
  ${props => props.border && borderStyle(props.border, props.theme)}
  ${props => (props.direction || props.reverse) && directionStyle}
  ${props => props.flex !== undefined && flexStyle}
  ${props => props.basis && basisStyle}
  ${props => props.full && fullStyle(props.full)}
  ${props => props.gridArea && gridAreaStyle}
  ${props => props.justify && justifyStyle}
  ${props => props.margin && edgeStyle('margin', props.margin, props.theme)}
  ${props => props.pad && edgeStyle('padding', props.pad, props.theme)}
  ${props => props.round && roundStyle}
  ${props => props.textAlign && textAlignStyle}
  ${props => props.wrap && wrapStyle}
  ${props => props.responsive && responsiveStyle}
  ${props => props.animation && animationStyle}
`;

export default StyledBox.extend`
  ${props => props.theme.box && props.theme.box.extend}
`;
