import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = (ResponsiveContext) => {
  const DocumentedResponsiveContext = describe(ResponsiveContext)
    .availableAt(getAvailableAtBadge('ResponsiveContext'))
    .description(
      `A means of providing different rendering behavior based on the
      screen resolution.`)
    .usage("import { ResponsiveContext } from 'grommet';\n<ResponsiveContext.Consumer />\n{resolution => ()}");

  DocumentedResponsiveContext.propTypes = {
    children: PropTypes.func.description(
      `Render function that will be called with the current screen resolution
      size, either 'wide' or 'narrow'.`),
  };

  return DocumentedResponsiveContext;
};
