import { keyframes, style } from '@vanilla-extract/css';

import { animationBounds, animationEnding, normalizeTiming } from './animation';

const animationTypes = [
  'draw',
  'fadeIn',
  'fadeOut',
  'jiggle',
  'pulse',
  'rotateRight',
  'rotateLeft',
  'flipIn',
  'flipOut',
  'slideDown',
  'slideLeft',
  'slideRight',
  'slideUp',
  'zoomIn',
  'zoomOut',
];

const animationSizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];

const toCamelCase = (prop) =>
  prop.replace(/-([a-z])/g, (_, char) => char.toUpperCase());

const parseDeclarations = (cssString) =>
  cssString
    .split(';')
    .map((declaration) => declaration.trim())
    .filter(Boolean)
    .reduce((acc, declaration) => {
      const [property, ...valueParts] = declaration.split(':');
      if (!property || !valueParts.length) return acc;
      acc[toCamelCase(property.trim())] = valueParts.join(':').trim();
      return acc;
    }, {});

const getAnimationMeta = (type) => {
  if (type === 'draw') {
    return { animationFillMode: 'forwards', animationTimingFunction: 'linear' };
  }
  if (type === 'jiggle' || type === 'pulse') {
    return {
      animationDirection: 'alternate',
      animationIterationCount: 'infinite',
    };
  }
  if (type === 'rotateRight' || type === 'rotateLeft') {
    return {
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
    };
  }
  return { animationFillMode: 'forwards' };
};

export const animationClassMap = animationTypes.reduce((typeAcc, type) => {
  const sizeMap = animationSizes.reduce((sizeAcc, size) => {
    const bounds = animationBounds(type, size);
    const frames = keyframes({
      from: parseDeclarations(bounds[0] || ''),
      to: parseDeclarations(bounds[1] || ''),
    });

    sizeAcc[size] = style({
      animationName: frames,
      ...getAnimationMeta(type),
    });

    return sizeAcc;
  }, {} as Record<string, string>);

  typeAcc[type] = sizeMap;
  return typeAcc;
}, {} as Record<string, Record<string, string>>);

export const resolveAnimationClassName = (animation) => {
  if (!animation || !animation.type) return undefined;
  return animationClassMap[animation.type]?.[animation.size || 'medium'];
};

export const resolveAnimationStyle = (animation, theme, themeObj) => {
  if (!animation || !animation.type) return undefined;

  const animationTheme =
    (themeObj && themeObj.animation) || theme.global.animation;
  const defaultDuration = normalizeTiming(
    animationTheme[animation.type]
      ? animationTheme[animation.type].duration
      : animation.duration,
    animationTheme.duration,
  );
  const ending = animationEnding(animation.type);
  const styleObject: Record<string, string> = {
    animationDuration: normalizeTiming(animation.duration, defaultDuration),
    animationDelay: normalizeTiming(animation.delay, '0s'),
  };

  if (ending.includes('linear')) {
    styleObject.animationTimingFunction = 'linear';
  }
  if (ending.includes('forwards')) {
    styleObject.animationFillMode = 'forwards';
  }
  if (ending.includes('alternate')) {
    styleObject.animationDirection = 'alternate';
  }
  if (ending.includes('infinite')) {
    styleObject.animationIterationCount = 'infinite';
  }

  return styleObject;
};
