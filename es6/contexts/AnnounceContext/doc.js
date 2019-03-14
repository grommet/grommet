import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge } from '../../utils';
export var doc = function doc(AnnounceContext) {
  var DocumentedAnnounceContext = describe(AnnounceContext).availableAt(getAvailableAtBadge('AnnounceContext')).description('A means of announcing events for screen readers.').usage("import { AnnounceContext } from 'grommet';\n<AnnounceContext.Consumer />\n{announce => ()}");
  DocumentedAnnounceContext.propTypes = {
    children: PropTypes.func.description("Render function that will be called with an 'announce' function that\n      can be called when something should be announced. \n      'announce' function accepts 'message', 'mode' and 'timeout' as arguments\n      and these arguments can be passed as 'props' to the return component.\n      'mode' can be one of 'polite', 'assertive' or 'off'. 'timeout' is measured in milliseconds.\n      Example:  {announce => <Button onClick={() => announce(\"Button was clicked\", \"polite\", 1000)}\n      ")
  };
  return DocumentedAnnounceContext;
};