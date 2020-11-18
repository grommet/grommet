import { describe } from 'react-desc';
import { getAvailableAtBadge } from '../../utils/mixins';
export var doc = function doc(Header) {
  var DocumentedHeader = describe(Header).availableAt(getAvailableAtBadge('Header', 'Layout')).description('Is a Box container for introductory content').usage("import { Header } from 'grommet';\n<Header />");
  return DocumentedHeader;
};