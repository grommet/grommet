export var themeDocUtils = {
  // 'The possible breakpoints that could affect border, direction, gap,
  // margin, pad, and round.',
  breakpointStyle: function breakpointStyle(description) {
    return {
      'global.breakpoints': {
        description: description,
        type: 'object',
        defaultValue: "{\n    small: {\n      value: '768px',\n      borderSize: {\n        xsmall: '1px',\n        small: '2px',\n        medium: '4px',\n        large: '6px',\n        xlarge: '12px',\n      },\n      edgeSize: {\n        none: '0px',\n        hair: '1px',\n        xxsmall: '2px',\n        xsmall: '3px',\n        small: '6px',\n        medium: '12px',\n        large: '24px',\n        xlarge: '48px',\n      },\n      size: {\n        xxsmall: '24px',\n        xsmall: '48px',\n        small: '96px',\n        medium: '192px',\n        large: '384px',\n        xlarge: '768px',\n        full: '100%',\n      },\n    },\n    medium: {\n      value: '1536px',\n    },\n    large: {},\n  }"
      }
    };
  },
  disabledStyle: {
    'global.control.disabled.opacity': {
      description: 'The opacity when a component is disabled.',
      type: 'number',
      defaultValue: 0.3
    }
  },
  edgeStyle: function edgeStyle(description) {
    return {
      'global.edgeSize': {
        description: description,
        type: 'object',
        defaultValue: "{\n    edgeSize: {\n      none: '0px',\n      hair: '1px',\n      xxsmall: '3px',\n      xsmall: '6px',\n      small: '12px',\n      medium: '24px',\n      large: '48px',\n      xlarge: '96px',\n      responsiveBreakpoint: 'small',\n    },\n  }"
      }
    };
  },
  focusStyle: {
    'global.focus.border.color': {
      description: 'The border color of the component when in focus.',
      type: 'string | { dark: string, light: string }',
      defaultValue: 'focus'
    },
    'global.focus.outline.color': {
      description: 'The outline color around the component when in focus.',
      type: 'string | { dark: string, light: string }'
    },
    'global.focus.outline.size': {
      description: 'The size of the outline around the component when in focus.',
      type: 'string'
    },
    'global.focus.shadow.color': {
      description: 'The shadow color around the component when in focus.',
      type: 'string | { dark: string, light: string }',
      defaultValue: 'focus'
    },
    'global.focus.shadow.size': {
      description: 'The size of the shadow around the component when in focus.',
      type: 'string',
      defaultValue: '2px'
    }
  },
  iconColor: {
    'global.colors.icon': {
      description: 'The color of a given icon.',
      type: 'string | { dark: string, light: string }',
      defaultValue: '{ dark: #f8f8f8, light: #666666 }'
    }
  },
  inputStyle: {
    'global.input.font.height': {
      description: 'The line-height of the text.',
      type: 'string',
      defaultValue: undefined
    },
    'global.input.font.size': {
      description: 'The size of the text.',
      type: 'string',
      defaultValue: undefined
    },
    'global.input.font.weight': {
      description: "The font-weight of the text. This value will only be \n      applied if global.input.weight is undefined.",
      type: 'number | string',
      defaultValue: 600
    },
    'global.input.weight': {
      description: "This value has been deprecated and replaced by \n      global.input.font.weight.",
      type: 'number | string',
      defaultValue: undefined
    },
    'global.input.padding': {
      description: 'The padding of the text.',
      type: "string | { top: string, bottom: string, left: string, right: \n        string, horizontal: string, vertical: string }",
      defaultValue: '12px'
    },
    'global.input.extend': {
      description: 'Any additional style for an input.',
      type: 'string | (props) => {}',
      defaultValue: undefined
    }
  },
  placeholderStyle: {
    'global.colors.placeholder': {
      description: 'The placeholder color used for the component.',
      type: 'string',
      defaultValue: '#AAAAAA'
    }
  },
  responsiveBreakpoint: function responsiveBreakpoint(description) {
    return {
      'global.edgeSize.responsiveBreakpoint': {
        description: description,
        type: 'string',
        defaultValue: 'small'
      }
    };
  }
};