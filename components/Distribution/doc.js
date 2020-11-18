"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _propTypes = require("../../utils/prop-types");

var _mixins = require("../../utils/mixins");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(Distribution) {
  var DocumentedDistribution = (0, _reactDesc.describe)(Distribution).availableAt((0, _mixins.getAvailableAtBadge)('Distribution', 'Visualizations')).description("Proportionally sized grid of boxes. The proportions are approximate. The\n      area given to each box isn't mathematically precise according to the\n      ratio to the total values. Instead, the boxes are laid out in a\n      manner that makes them more visually easy to scan. For example,\n      two values of 48 and 52 will actually each get 50% of the area.").usage("import { Distribution } from 'grommet';\n<Distribution />").intrinsicElement('div');
  DocumentedDistribution.propTypes = _extends({}, _propTypes.genericProps, {
    basis: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'full', '1/2', '1/3', '2/3', '1/4', '2/4', '3/4', 'auto']), _reactDesc.PropTypes.string]).description("A fixed or relative size along its container's main axis."),
    children: _reactDesc.PropTypes.func.description('Function that will be called when each value is rendered.'),
    fill: _reactDesc.PropTypes.bool.description("Whether the distribution expands to fill all of the available width \n        and height.").defaultValue(false),
    gap: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]).description('The amount of spacing between child elements.').defaultValue('xsmall'),
    values: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.shape({
      value: _reactDesc.PropTypes.number.isRequired
    })).description("Array of objects containing a value. The array should already be\n      sorted from largest to smallest value. The caller can put other\n      properties in the object. The children function will be called to\n      render the contents of each value.").isRequired
  });
  return DocumentedDistribution;
};

exports.doc = doc;