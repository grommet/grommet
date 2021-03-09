import styled, { css, keyframes } from 'styled-components';

import { defaultProps } from '../../default-props';

import {
  backgroundStyle,
  borderStyle,
  breakpointStyle,
  edgeStyle,
  fillStyle,
  focusStyle,
  genericStyles,
  getHoverIndicatorStyle,
  overflowStyle,
  parseMetricToNum,
  responsiveBorderStyle,
} from '../../utils';

import { getBreakpointStyle } from '../../utils/responsive';

import { roundStyle } from '../../utils/styles';

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

const BASIS_MAP = {
  auto: 'auto',
  full: '100%',
  '1/2': '50%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/3': '33.33%',
  '2/3': '66.66%',
};

const basisStyle = css`
  flex-basis: ${props =>
    BASIS_MAP[props.basis] ||
    props.theme.global.size[props.basis] ||
    props.basis};
`;

// min-width and min-height needed because of this
// https://stackoverflow.com/questions/36247140/why-doesnt-flex-item-shrink-past-content-size
// we assume we are in the context of a Box going the other direction
// TODO: revisit this
const directionStyle = (direction, theme) => {
  const styles = [
    css`
      min-width: 0;
      min-height: 0;
      flex-direction: ${direction === 'row-responsive' ? 'row' : direction};
    `,
  ];
  if (direction === 'row-responsive' && theme.box.responsiveBreakpoint) {
    const breakpoint = getBreakpointStyle(
      theme,
      theme.box.responsiveBreakpoint,
    );
    if (breakpoint) {
      styles.push(
        breakpointStyle(
          breakpoint,
          `
        flex-direction: column;
        flex-basis: auto;
        justify-content: flex-start;
        align-items: stretch;
      `,
        ),
      );
    }
  }
  return styles;
};

const elevationStyle = css`
  box-shadow: ${props =>
    props.theme.global.elevation[props.theme.dark ? 'dark' : 'light'][
      props.elevationProp
    ]};
`;

const FLEX_MAP = {
  [true]: '1 1',
  [false]: '0 0',
  grow: '1 0',
  shrink: '0 1',
};

const flexGrowShrinkProp = flex => {
  if (typeof flex === 'boolean' || typeof flex === 'string') {
    return FLEX_MAP[flex];
  }

  return `${flex.grow ? flex.grow : 0} ${flex.shrink ? flex.shrink : 0}`;
};

const flexStyle = css`
  flex: ${props =>
    `${flexGrowShrinkProp(props.flex)}${
      props.flex !== true && !props.basis ? ' auto' : ''
    }`};
`;

const JUSTIFY_MAP = {
  around: 'space-around',
  between: 'space-between',
  center: 'center',
  end: 'flex-end',
  evenly: 'space-evenly',
  start: 'flex-start',
};

const justifyStyle = css`
  justify-content: ${props => JUSTIFY_MAP[props.justify]};
`;

const WRAP_MAP = {
  true: 'wrap',
  reverse: 'wrap-reverse',
};

const wrapStyle = css`
  flex-wrap: ${props => WRAP_MAP[props.wrapProp]};
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

const normalizeTiming = (time, defaultTiming) =>
  time ? `${time / 1000.0}s` : defaultTiming;

const animationEnding = type => {
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
    return css`${keyframes`${animationTransition}`}
    ${normalizeTiming(
      animation.duration,
      (theme.global.animation[animation.type]
        ? theme.global.animation[animation.type].duration
        : undefined) || theme.global.animation.duration,
    )}
    ${normalizeTiming(animation.delay, '0s')}
    ${animationEnding(animation.type)}`;
  }
  return '';
};

const animationItemStyle = (item, theme) => {
  if (typeof item === 'string') {
    return animationObjectStyle({ type: item }, theme);
  }
  if (Array.isArray(item)) {
    return item.reduce(
      (style, a, index) =>
        css`${style}${index > 0 ? ',' : ''} ${animationItemStyle(a, theme)}`,
      '',
    );
  }
  if (typeof item === 'object') {
    return animationObjectStyle(item, theme);
  }
  return '';
};

const animationAncilaries = animation => {
  if (animation.type === 'flipIn' || animation.type === 'flipOut') {
    return 'perspective: 1000px; transform-style: preserve-3d;';
  }
  return '';
};

const animationObjectInitialStyle = animation => {
  const bounds = animationBounds(animation.type, animation.size);
  if (bounds) {
    return `${bounds[0]} ${animationAncilaries(animation)}`;
  }
  return '';
};

const animationInitialStyle = item => {
  if (typeof item === 'string') {
    return animationObjectInitialStyle({ type: item });
  }
  if (Array.isArray(item)) {
    return item
      .map(a =>
        typeof a === 'string'
          ? animationObjectInitialStyle({ type: a })
          : animationObjectInitialStyle(a),
      )
      .join('');
  }
  if (typeof item === 'object') {
    return animationObjectInitialStyle(item);
  }
  return '';
};

const animationStyle = css`
  ${props => css`
    ${animationInitialStyle(props.animation)}
    animation: ${animationItemStyle(props.animation, props.theme)};
  `};
`;

const interactiveStyle = css`
  cursor: pointer;

  &:hover {
    ${props =>
      props.hoverIndicator &&
      getHoverIndicatorStyle(props.hoverIndicator, props.theme)}
  }
`;

const getSize = (props, size) => props.theme.global.size[size] || size;

const heightObjectStyle = css`
  ${props =>
    props.heightProp.max &&
    css`
      max-height: ${getSize(props, props.heightProp.max)};
    `};
  ${props =>
    props.heightProp.min &&
    css`
      min-height: ${getSize(props, props.heightProp.min)};
    `};
`;

const heightStyle = css`
  height: ${props => getSize(props, props.heightProp)};
`;

const widthObjectStyle = css`
  ${props =>
    props.widthProp.max &&
    css`
      max-width: ${getSize(props, props.widthProp.max)};
    `};
  ${props =>
    props.widthProp.min &&
    css`
      min-width: ${getSize(props, props.widthProp.min)};
    `};
  ${props =>
    props.widthProp.width &&
    css`
      width: ${getSize(props, props.widthProp.width)};
    `};
`;

const widthStyle = css`
  width: ${props => getSize(props, props.widthProp)};
`;

// NOTE: basis must be after flex! Otherwise, flex overrides basis
const StyledBox = styled.div`
  display: flex;
  box-sizing: border-box;
  ${props => !props.basis && 'max-width: 100%;'};

  ${genericStyles}
  ${props => props.align && alignStyle}
  ${props => props.alignContent && alignContentStyle}
  ${props => props.background && backgroundStyle(props.background, props.theme)}
  ${props =>
    props.border &&
    (Array.isArray(props.border)
      ? props.border.map(border =>
          borderStyle(border, props.responsive, props.theme),
        )
      : borderStyle(props.border, props.responsive, props.theme))}
  ${props =>
    props.directionProp && directionStyle(props.directionProp, props.theme)}
  ${props =>
    props.heightProp &&
    (typeof props.heightProp === 'object' ? heightObjectStyle : heightStyle)}
  ${props =>
    props.widthProp &&
    (typeof props.widthProp === 'object' ? widthObjectStyle : widthStyle)}
  ${props => props.flex !== undefined && flexStyle}
  ${props => props.basis && basisStyle}
  ${props => props.fillProp && fillStyle(props.fillProp)}
  ${props => props.justify && justifyStyle}
  ${props =>
    props.pad &&
    edgeStyle(
      'padding',
      props.pad,
      props.responsive,
      props.theme.box.responsiveBreakpoint,
      props.theme,
    )}
  ${props =>
    props.round && roundStyle(props.round, props.responsive, props.theme)}
  ${props => props.wrapProp && wrapStyle}
  ${props => props.overflowProp && overflowStyle(props.overflowProp)}
  ${props => props.elevationProp && elevationStyle}
  ${props => props.animation && animationStyle}
  ${props => props.onClick && interactiveStyle}
  ${props =>
    props.onClick &&
    props.focus &&
    props.focusIndicator !== false &&
    focusStyle()}
  ${props => props.theme.box && props.theme.box.extend}
`;

const gapStyle = (directionProp, gap, responsive, border, theme) => {
  const metric = theme.global.edgeSize[gap] || gap;
  const breakpoint = getBreakpointStyle(theme, theme.box.responsiveBreakpoint);
  const responsiveMetric = responsive && breakpoint && breakpoint.edgeSize[gap];

  const styles = [];
  if (directionProp === 'column' || directionProp === 'column-reverse') {
    styles.push(`height: ${metric};`);
    if (responsiveMetric) {
      styles.push(breakpointStyle(breakpoint, `height: ${responsiveMetric};`));
    }
  } else {
    styles.push(`width: ${metric};`);
    if (responsiveMetric) {
      if (directionProp === 'row' || directionProp === 'row-reverse') {
        styles.push(breakpointStyle(breakpoint, `width: ${responsiveMetric};`));
      } else if (directionProp === 'row-responsive') {
        styles.push(
          breakpointStyle(
            breakpoint,
            `
          width: auto;
          height: ${responsiveMetric};
        `,
          ),
        );
      }
    }
  }

  if (border === 'between' || (border && border.side === 'between')) {
    const borderSize = border.size || 'xsmall';
    const borderMetric = theme.global.borderSize[borderSize] || borderSize;
    const borderOffset = `${parseMetricToNum(metric) / 2 -
      parseMetricToNum(borderMetric) / 2}px`;
    const responsiveBorderMetric =
      responsive &&
      breakpoint &&
      (breakpoint.borderSize[borderSize] || borderSize);
    const responsiveBorderOffset =
      responsiveBorderMetric &&
      `${parseMetricToNum(responsiveMetric) / 2 -
        parseMetricToNum(responsiveBorderMetric) / 2}px`;

    if (directionProp === 'column' || directionProp === 'column-reverse') {
      const adjustedBorder =
        typeof border === 'string' ? 'top' : { ...border, side: 'top' };
      styles.push(css`
        position: relative;
        &:after {
          content: '';
          position: absolute;
          width: 100%;
          top: ${borderOffset};
          ${borderStyle(adjustedBorder, responsive, theme)}
        }
      `);
      if (responsiveBorderOffset) {
        styles.push(
          breakpointStyle(
            breakpoint,
            `
            &:after {
              content: '';
              top: ${responsiveBorderOffset};
            }`,
          ),
        );
      }
    } else {
      const adjustedBorder =
        typeof border === 'string' ? 'left' : { ...border, side: 'left' };
      styles.push(css`
        position: relative;
        &:after {
          content: '';
          position: absolute;
          height: 100%;
          left: ${borderOffset};
          ${borderStyle(
            adjustedBorder,
            directionProp !== 'row-responsive' && responsive,
            theme,
          )}
        }
      `);
      if (responsiveBorderOffset) {
        if (directionProp === 'row' || directionProp === 'row-reverse') {
          styles.push(
            breakpointStyle(
              breakpoint,
              `
              &:after {
                content: '';
                left: ${responsiveBorderOffset};
              }`,
            ),
          );
        } else if (directionProp === 'row-responsive') {
          const adjustedBorder2 =
            typeof border === 'string' ? 'top' : { ...border, side: 'top' };
          styles.push(
            breakpointStyle(
              breakpoint,
              `
              &:after {
                content: '';
                height: auto;
                left: unset;
                width: 100%;
                top: ${responsiveBorderOffset};
                border-left: none;
                ${responsiveBorderStyle(adjustedBorder2, theme)}
              }`,
            ),
          );
        }
      }
    }
  }

  return styles;
};

StyledBox.defaultProps = {};
Object.setPrototypeOf(StyledBox.defaultProps, defaultProps);

const StyledBoxGap = styled.div`
  flex: 0 0 auto;
  align-self: stretch;
  ${props =>
    props.gap &&
    gapStyle(
      props.directionProp,
      props.gap,
      props.responsive,
      props.border,
      props.theme,
    )};
`;

StyledBoxGap.defaultProps = {};
Object.setPrototypeOf(StyledBoxGap.defaultProps, defaultProps);

export { StyledBox, StyledBoxGap };
