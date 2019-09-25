"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(RoutedAnchor) {
  var DocumentedRoutedAnchor = (0, _reactDesc.describe)(RoutedAnchor).availableAt((0, _utils.getAvailableAtBadge)('RoutedAnchor')).description('An Anchor with support for React Router.').usage("import { RoutedAnchor } from 'grommet';\n" + "<RoutedAnchor primary path='/documentation' />").intrinsicElement('a');
  DocumentedRoutedAnchor.propTypes = _extends({}, _utils.ROUTER_PROPS);
  return DocumentedRoutedAnchor;
};

exports.doc = doc;