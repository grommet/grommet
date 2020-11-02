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
      description: 'The border color of the component when in focus.',
      type: 'string | { dark: string, light: string }',
      defaultValue: 'focus',
    },
    'global.focus.outline.color': {
      description: 'The outline color around the component when in focus.',
      type: 'string | { dark: string, light: string }',
    },
    'global.focus.outline.size': {
      description:
        'The size of the outline around the component when in focus.',
      type: 'string',
    },
    'global.focus.shadow.color': {
      description: 'The shadow color around the component when in focus.',
      type: 'string | { dark: string, light: string }',
      defaultValue: 'focus',
    },
    'global.focus.shadow.size': {
      description: 'The size of the shadow around the component when in focus.',
      type: 'string',
      defaultValue: '2px',
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
    'global.input.font.height': {
      description: 'The line-height of the text.',
      type: 'string',
      defaultValue: undefined,
    },
    'global.input.font.size': {
      description: 'The size of the text.',
      type: 'string',
      defaultValue: undefined,
    },
    'global.input.font.weight': {
      description: `The font-weight of the text. This value will only be 
      applied if global.input.weight is undefined.`,
      type: 'number | string',
      defaultValue: 600,
    },
    'global.input.weight': {
      description: `This value has been deprecated and replaced by 
      global.input.font.weight.`,
      type: 'number | string',
      defaultValue: undefined,
    },
    'global.input.padding': {
      description: 'The padding of the text.',
      type: `string | { top: string, bottom: string, left: string, right: 
        string, horizontal: string, vertical: string }`,
      defaultValue: '12px',
    },
    'global.input.extend': {
      description: 'Any additional style for an input.',
      type: 'string | (props) => {}',
      defaultValue: undefined,
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
