function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe } from 'react-desc';
import { ROUTER_PROPS, getAvailableAtBadge } from '../../utils';
export var doc = function doc(RoutedButton) {
  var DocumentedRoutedButton = describe(RoutedButton).availableAt(getAvailableAtBadge('RoutedButton')).description('A button with support for React Router.').usage("import { RoutedButton } from 'grommet';\n<RoutedButton primary={true} path='/documentation' />").intrinsicElement('button');
  DocumentedRoutedButton.propTypes = _extends({}, ROUTER_PROPS);
  return DocumentedRoutedButton;
};