import { describe } from 'react-desc';
import { getAvailableAtBadge } from '../../utils/mixins';
export var doc = function doc(Footer) {
  var DocumentedFooter = describe(Footer).availableAt(getAvailableAtBadge('Footer', 'Layout')).description('Footer for a document or section').usage("import { Footer } from 'grommet';\n<Footer />");
  return DocumentedFooter;
};