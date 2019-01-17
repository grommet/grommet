import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge } from '../../utils';
export var doc = function doc(ResponsiveContext) {
  var DocumentedResponsiveContext = describe(ResponsiveContext).availableAt(getAvailableAtBadge('ResponsiveContext')).description("A means of providing different rendering behavior based on the\n      screen resolution.").usage("import { ResponsiveContext } from 'grommet';\n<ResponsiveContext.Consumer />\n{resolution => ()}");
  DocumentedResponsiveContext.propTypes = {
    children: PropTypes.func.description("Render function that will be called with the current screen resolution\n      size (e.g our base theme of size 'small', 'medium', 'large'). The size value will be derived from global.breakpoints entry\n      in the theme object.")
  };
  return DocumentedResponsiveContext;
};
export var themeDoc = {
  'global.breakpoints': {
    description: 'The possible breakpoints that could affect border, direction, gap, margin, pad, and round.',
    type: 'object',
    defaultValue: "{\n    small: {\n      value: '768px',\n      borderSize: {\n        xsmall: '1px',\n        small: '2px',\n        medium: '4px',\n        large: '6px',\n        xlarge: '12px',\n      },\n      edgeSize: {\n        none: '0px',\n        hair: '1px',\n        xxsmall: '2px',\n        xsmall: '3px',\n        small: '6px',\n        medium: '12px',\n        large: '24px',\n        xlarge: '48px',\n      },\n      size: {\n        xxsmall: '24px',\n        xsmall: '48px',\n        small: '96px',\n        medium: '192px',\n        large: '384px',\n        xlarge: '768px',\n        full: '100%',\n      },\n    },\n    medium: {\n      value: '1536px',\n    },\n    large: {},\n  }"
  }
};