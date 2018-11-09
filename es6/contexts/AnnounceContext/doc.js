import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge } from '../../utils';
export var doc = function doc(AnnounceContext) {
  var DocumentedAnnounceContext = describe(AnnounceContext).availableAt(getAvailableAtBadge('AnnounceContext')).description('A means of announcing events for screen readers.').usage("import { AnnounceContext } from 'grommet';\n<AnnounceContext.Consumer />\n{announce => ()}");
  DocumentedAnnounceContext.propTypes = {
    children: PropTypes.func.description("Render function that will be called with an 'announce' function that\n      can be called when something should be announced.")
  };
  return DocumentedAnnounceContext;
};