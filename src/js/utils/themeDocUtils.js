export const themeDocUtils = {
  // 'The possible breakpoints that could affect border, direction, gap,
  // margin, pad, and round.',
  breakpointStyle: description => ({
    'global.breakpoints': {
      description,
      type: 'object',
      defaultValue: `{
    small: {
      value: '768px',
      borderSize: {
        xsmall: '1px',
        small: '2px',
        medium: '4px',
        large: '6px',
        xlarge: '12px',
      },
      edgeSize: {
        none: '0px',
        hair: '1px',
        xxsmall: '2px',
        xsmall: '3px',
        small: '6px',
        medium: '12px',
        large: '24px',
        xlarge: '48px',
      },
      size: {
        xxsmall: '24px',
        xsmall: '48px',
        small: '96px',
        medium: '192px',
        large: '384px',
        xlarge: '768px',
        full: '100%',
      },
    },
    medium: {
      value: '1536px',
    },
    large: {},
  }`,
    },
  }),
  disabledStyle: {
    'global.control.disabled.opacity': {
      description: 'The opacity when a component is disabled.',
      type: 'number',
      defaultValue: 0.3,
    },
  },
  edgeStyle: description => ({
    'global.edgeSize': {
      description,
      type: 'object',
      defaultValue: `{
    edgeSize: {
      none: '0px',
      hair: '1px',
      xxsmall: '3px',
      xsmall: '6px',
      small: '12px',
      medium: '24px',
      large: '48px',
      xlarge: '96px',
      responsiveBreakpoint: 'small',
    },
  }`,
    },
  }),
  focusStyle: {
    'global.focus.border.color': {
      description: 'The color around the component when in focus.',
      type: 'string | { dark: string, light: string }',
      defaultValue: 'focus',
    },
  },
  iconColor: {
    'global.colors.icon': {
      description: 'The color of a given icon.',
      type: 'string | { dark: string, light: string }',
      defaultValue: '{ dark: #f8f8f8, light: #666666 }',
    },
  },

  inputStyle: {
    'global.input.weight': {
      description: 'The font weight of the text entered.',
      type: 'number',
      defaultValue: 600,
    },
    'global.input.padding': {
      description: 'The padding of the text.',
      type: 'string',
      defaultValue: '12px',
    },
  },
  placeholderStyle: {
    'global.colors.placeholder': {
      description: 'The placeholder color used for the component.',
      type: 'string',
      defaultValue: '#AAAAAA',
    },
  },
  responsiveBreakpoint: description => ({
    'global.edgeSize.responsiveBreakpoint': {
      description,
      type: 'string',
      defaultValue: 'small',
    },
  }),
};
