import styled, { css, keyframes } from 'styled-components';

import { backgroundStyle, colorForName, palm } from '../../utils';

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
  'auto': 'auto',
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

// min-width and min-height needed because of this
// https://stackoverflow.com/questions/36247140/why-doesnt-flex-item-shrink-past-content-size
// we assume we are in the context of a Box going the other direction
// TODO: revisit this
const directionStyle = css`
  ${props => props.direction === 'row' && 'min-height: 0;'}
  ${props => props.direction === 'column' && 'min-width: 0;'}
  flex-direction: ${props => props.direction};
`;

const elevationStyle = css`
  box-shadow: ${props => props.theme.global.elevation[props.elevation]};
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

const fillStyle = (fill) => {
  if (fill === 'horizontal') {
    return 'width: 100%;';
  }
  if (fill === 'vertical') {
    return 'height: 100%;';
  }
  if (fill) {
    return `
      width: 100%;
      height: 100%;
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

const wrapStyle = 'flex-wrap: wrap;';

const borderStyle = (data, theme) => {
  let style = '';
  const color = colorForName(data.color || 'border', theme);
  const borderSize = data.size || 'xsmall';
  const side = (typeof data === 'string') ? data : data.side || 'all';
  const value = `solid ${theme.global.borderSize[borderSize]} ${color}`;
  if (side === 'top' || side === 'bottom' || side === 'left' || side === 'right') {
    style = `border-${side}: ${value};`;
  } else if (side === 'vertical') {
    style = `
      border-left: ${value};
      border-right: ${value};
    `;
  } else if (side === 'horizontal') {
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
  `)}
  }
`;

const SLIDE_SIZES = {
  xsmall: 1,
  small: 5,
  medium: 10,
  large: 50,
  xlarge: 200,
};

const PULSE_SIZES = {
  xsmall: 1.001,
  small: 1.01,
  medium: 1.1,
  large: 1.5,
  xlarge: 2,
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

const animationBounds = (type, size = 'medium') => {
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
  if (type === 'flipIn') {
    return ['transform: rotateY(90deg);', 'transform: rotateY(0);'];
  }
  if (type === 'flipOut') {
    return ['transform: rotateY(0);', 'transform: rotateY(90deg);'];
  }
  if (type === 'slideDown') {
    return [`transform: translateY(-${SLIDE_SIZES[size]}%);`, 'transform: none;'];
  }
  if (type === 'slideLeft') {
    return [`transform: translateX(${SLIDE_SIZES[size]}%);`, 'transform: none;'];
  }
  if (type === 'slideRight') {
    return [`transform: translateX(-${SLIDE_SIZES[size]}%);`, 'transform: none;'];
  }
  if (type === 'slideUp') {
    return [`transform: translateY(${SLIDE_SIZES[size]}%);`, 'transform: none;'];
  }
  if (type === 'zoomIn') {
    return [`transform: scale(${1 - ZOOM_SIZES[size]});`, 'transform: none;'];
  }
  if (type === 'zoomOut') {
    return [`transform: scale(${1 + ZOOM_SIZES[size]});`, 'transform: none;'];
  }
  return [];
};

const normalizeTiming = (time, defaultTiming) => (time ? `${time / 1000.0}s` : defaultTiming);

const animationEnding = (type) => {
  if (type === 'jiggle') {
    return 'alternate infinite';
  }
  if (type === 'pulse') {
    return 'alternate infinite';
  }
  return 'forwards';
};

const animationObjectStyle = (animation, theme) => {
  const bounds = animationBounds(animation.type, animation.size);
  if (bounds) {
    return `${keyframes`from { ${bounds[0]} } to { ${bounds[1]} }`}
    ${normalizeTiming(animation.duration,
      (theme.global.animation[animation.type] ?
        theme.global.animation[animation.type].duration : undefined) ||
      theme.global.animation.duration)}
    ${normalizeTiming(animation.delay, '0s')}
    ${animationEnding(animation.type)}`;
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

const animationAncilaries = (animation) => {
  if (animation.type === 'flipIn' || animation.type === 'flipOut') {
    return 'perspective: 1000px; transform-style: preserve-3d;';
  }
  return '';
};

const animationObjectInitialStyle = (animation) => {
  const bounds = animationBounds(animation.type, animation.size);
  if (bounds) {
    return `${bounds[0]} ${animationAncilaries(animation)}`;
  }
  return '';
};

const animationInitialStyle = (item) => {
  if (typeof item === 'string') {
    return animationObjectInitialStyle({ type: item });
  } else if (Array.isArray(item)) {
    return item.map(a => (
      typeof a === 'string' ? animationObjectInitialStyle({ type: a }) :
      animationObjectInitialStyle(a)
    )).join('');
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
  box-sizing: border-box;
  ${props => !props.basis && 'max-width: 100%;'};

  ${props => props.align && alignStyle}
  ${props => props.alignContent && alignContentStyle}
  ${props => props.alignSelf && alignSelfStyle}
  ${props => props.background && backgroundStyle(props.background, props.theme)}
  ${props => props.border && borderStyle(props.border, props.theme)}
  ${props => props.direction && directionStyle}
  ${props => props.flex !== undefined && flexStyle}
  ${props => props.basis && basisStyle}
  ${props => props.fill && fillStyle(props.fill)}
  ${props => props.gridArea && gridAreaStyle}
  ${props => props.justify && justifyStyle}
  ${props => (props.margin && edgeStyle('margin', props.margin, props.theme))}
  ${props => (props.pad && edgeStyle('padding', props.pad, props.theme))}
  ${props => props.round && roundStyle}
  ${props => props.wrap && wrapStyle}
  ${props => props.responsive && responsiveStyle}
  ${props => props.overflow && `overflow: ${props.overflow};`}
  ${props => props.elevation && elevationStyle}
  ${props => props.animation && animationStyle}
`;

export default StyledBox.extend`
  ${props => props.theme.box && props.theme.box.extend}
`;

const gapStyle = (gap, direction, theme) => {
  if (direction === 'column') {
    return `height: ${theme.global.edgeSize[gap]};`;
  }
  return `width: ${theme.global.edgeSize[gap]};`;
};

export const StyledBoxGap = styled.div`
  ${props => props.gap && gapStyle(props.gap, props.direction, props.theme)};
`;
