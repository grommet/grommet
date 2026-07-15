const SPACING_PROPS = new Set(['gap', 'margin', 'pad', 'thickness']);
const BORDER_PROPS = new Set(['border']);
const CONTAINER_PROPS = new Set(['height', 'width', 'columns', 'rows']);
const RADIUS_PROPS = new Set(['round']);

const SPACING_SIZE_COMPONENTS = new Set(['RangeSelector']);

const TSHIRT_TOKENS = new Set([
  '5xsmall',
  '3xsmall',
  'xxsmall',
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
  'xxlarge',
  '3xlarge',
]);

const MAPS = {
  spacing: {
    xxsmall: '5xsmall',
    xsmall: '3xsmall',
    small: 'xsmall',
    medium: 'medium',
    large: 'xlarge',
    xlarge: '3xlarge',
  },
  border: {
    xlarge: 'large',
  },
  container: {
    xxsmall: '5xsmall',
    xsmall: '3xsmall',
    small: 'xsmall',
    medium: 'medium',
    large: 'xlarge',
    xlarge: 'xxlarge',
    xxlarge: '3xlarge',
  },
  radius: {
    small: 'medium',
    medium: 'xlarge',
    large: 'xxlarge',
    xlarge: 'xxlarge',
  },
};

const isTshirtToken = (value) =>
  typeof value === 'string' && TSHIRT_TOKENS.has(value);

const getMapForProp = (prop, context = {}) => {
  if (SPACING_PROPS.has(prop)) return MAPS.spacing;
  if (RADIUS_PROPS.has(prop)) return MAPS.radius;

  if (prop === 'size') {
    if (context.parentProp === 'border') return MAPS.border;
    if (SPACING_SIZE_COMPONENTS.has(context.componentName)) return MAPS.spacing;
    return MAPS.container;
  }

  if (prop === 'columns' || prop === 'rows' || CONTAINER_PROPS.has(prop)) {
    return MAPS.container;
  }

  if (BORDER_PROPS.has(prop)) return MAPS.border;

  return undefined;
};

const mapSizeToken = (prop, value, context = {}) => {
  if (!isTshirtToken(value)) return value;

  const map = getMapForProp(prop, context);
  if (!map) return value;

  return map[value] || value;
};

const remapScale = (scale = {}, mapping = {}) => {
  const next = { ...scale };

  Object.keys(mapping).forEach((oldToken) => {
    const mappedToken = mapping[oldToken];
    if (
      Object.prototype.hasOwnProperty.call(scale, mappedToken) &&
      scale[mappedToken] !== undefined
    ) {
      next[oldToken] = scale[mappedToken];
    }
  });

  return next;
};

const createHpeCompatTheme = (hpeTheme = {}) => {
  const global = hpeTheme.global || {};

  return {
    ...hpeTheme,
    global: {
      ...global,
      edgeSize: remapScale(global.edgeSize, MAPS.spacing),
      size: remapScale(global.size, MAPS.container),
      borderSize: remapScale(global.borderSize, MAPS.border),
      radius: remapScale(global.radius, MAPS.radius),
    },
  };
};

module.exports = {
  createHpeCompatTheme,
  mapSizeToken,
  SPACING_PROPS,
};
