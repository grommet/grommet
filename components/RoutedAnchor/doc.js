"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _router = require("../../utils/router");

var _mixins = require("../../utils/mixins");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(RoutedAnchor) {
  var DocumentedRoutedAnchor = (0, _reactDesc.describe)(RoutedAnchor).availableAt((0, _mixins.getAvailableAtBadge)('RoutedAnchor', 'Controls')).description('An Anchor with support for React Router.').usage("import { RoutedAnchor } from 'grommet';\n" + "<RoutedAnchor primary path='/documentation' />").intrinsicElement('a');
  DocumentedRoutedAnchor.propTypes = _extends({}, _router.ROUTER_PROPS);
  return DocumentedRoutedAnchor;
};

exports.doc = doc;