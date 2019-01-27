export const themeDocUtils = {
  placeholderStyle: {
    'global.colors.placeholder': {
      description: 'The placeholder color used for the component.',
      type: 'string',
      defaultValue: '#AAAAAA',
    },
  },
  focusStyle: {
    'global.focus.border.color': {
      description: 'The color around the component when in focus.',
      type: 'string | { dark: string, light: string }',
      defaultValue: 'focus',
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
  edgeStyle: {
    'global.edgeSize': {
      description: 'The possible sizes for any of gap, margin, and pad.',
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
  },
  breakpointStyle: {
    'global.breakpoints': {
      description:
        'The possible breakpoints that could affect border, direction, gap, margin, pad, and round.',
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
  },
  normalizeColor: {
    'global.colors.text': {
      description: 'The text color used inside the component.',
      type: 'string | { dark: string, light: string }',
      defaultValue: "{ dark: '#f8f8f8', light: '#444444' }",
    },
  },
};
