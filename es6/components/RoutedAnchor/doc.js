function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe } from 'react-desc';
import { ROUTER_PROPS } from '../../utils/router';
import { getAvailableAtBadge } from '../../utils/mixins';
export var doc = function doc(RoutedAnchor) {
  var DocumentedRoutedAnchor = describe(RoutedAnchor).availableAt(getAvailableAtBadge('RoutedAnchor', 'Controls')).description('An Anchor with support for React Router.').usage("import { RoutedAnchor } from 'grommet';\n" + "<RoutedAnchor primary path='/documentation' />").intrinsicElement('a');
  DocumentedRoutedAnchor.propTypes = _extends({}, ROUTER_PROPS);
  return DocumentedRoutedAnchor;
};