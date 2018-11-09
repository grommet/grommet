import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge } from '../../utils';
export var doc = function doc(ResponsiveContext) {
  var DocumentedResponsiveContext = describe(ResponsiveContext).availableAt(getAvailableAtBadge('ResponsiveContext')).description("A means of providing different rendering behavior based on the\n      screen resolution.").usage("import { ResponsiveContext } from 'grommet';\n<ResponsiveContext.Consumer />\n{resolution => ()}");
  DocumentedResponsiveContext.propTypes = {
    children: PropTypes.func.description("Render function that will be called with the current screen resolution\n      size (e.g 'wide', 'narrow'). The size value will be derived from global.breakpoints entry\n      in the theme object.")
  };
  return DocumentedResponsiveContext;
};