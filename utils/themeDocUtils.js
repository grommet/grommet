"use strict";

exports.__esModule = true;
exports.themeDocUtils = void 0;
var themeDocUtils = {
  // 'The possible breakpoints that could affect border, direction, gap, margin, pad, and round.',
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
      description: 'The color around the component when in focus.',
      type: 'string | { dark: string, light: string }',
      defaultValue: 'focus'
    }
  },
  inputStyle: {
    'global.input.weight': {
      description: 'The font weight of the text entered.',
      type: 'number',
      defaultValue: 600
    },
    'global.input.padding': {
      description: 'The padding of the text.',
      type: 'string',
      defaultValue: '12px'
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
exports.themeDocUtils = themeDocUtils;