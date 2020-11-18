import { describe } from 'react-desc';
import { getAvailableAtBadge } from '../../utils/mixins';
export var doc = function doc(Nav) {
  var DocumentedNav = describe(Nav).availableAt(getAvailableAtBadge('Nav', 'Controls')).description('Is a Box container for navigation links').usage("import { Nav } from 'grommet';\n<Nav />");
  return DocumentedNav;
};