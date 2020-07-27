import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = ResponsiveContext => {
  const DocumentedResponsiveContext = describe(ResponsiveContext)
    .availableAt(getAvailableAtBadge('ResponsiveContext'))
    .description(
      `A means of providing different rendering behavior based on the
      screen resolution.`,
    )
    .usage(
      `import { ResponsiveContext } from 'grommet'
       const Example = () => {
         const size = React.useContext(ResponsiveContext);
         return (
           <Box pad="medium">
             <Text>{size}</Text>
           </Box>
         );
       }`,
    );

  DocumentedResponsiveContext.propTypes = {
    children: PropTypes.func.description(
      `Render function that will be called with the current screen resolution
      size (e.g our base theme of size 'small', 'medium', 'large').
      The size value will be derived from global.breakpoints entry
      in the theme object.`,
    ),
  };

  return DocumentedResponsiveContext;
};

export const themeDoc = {
  'global.breakpoints': {
    description: `The possible breakpoints that could affect border, direction,
gap, margin, pad, and round. The default values help to optimize content for
mobile, tablet, and computer.`,
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
};
