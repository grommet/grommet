import { describe } from 'react-desc';
import { getAvailableAtBadge } from '../../utils/mixins';
export var doc = function doc(Main) {
  var DocumentedMain = describe(Main).availableAt(getAvailableAtBadge('Main', 'Layout')).description('main content of a document.').usage("import { Main } from 'grommet';\n<Main />");
  return DocumentedMain;
};