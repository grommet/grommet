"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _mixins = require("../../utils/mixins");

var doc = function doc(Spinner) {
  var DocumentedSpinner = (0, _reactDesc.describe)(Spinner).availableAt((0, _mixins.getAvailableAtBadge)('Spinner', 'Visualizations')).description('A Spinner.').usage("import { Spinner } from 'grommet';\n<Spinner/>");
  DocumentedSpinner.propTypes = {
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]).description('A fixed size.').defaultValue('small'),
    color: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
      dark: _reactDesc.PropTypes.string,
      light: _reactDesc.PropTypes.string
    })]).description('The border color of the Spinner.').defaultValue(undefined),
    message: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
      start: _reactDesc.PropTypes.string,
      end: _reactDesc.PropTypes.string
    })]).description("When message is a string, the message will be announced for \n        screen readers once the Spinner is loaded. \n        When an object, the 'start' message will be announced \n        as the Spinner appears, and the 'end' message as the spinner closes.").defaultValue(undefined)
  };
  return DocumentedSpinner;
};

exports.doc = doc;
var themeDoc = {
  'spinner.container': {
    description: "Any valid Box prop for the Spinner container. \n    Including 'color' for the spinner border color and 'size' for the default \n    size of the Spinner.",
    type: 'object',
    defaultValue: {
      animation: 'rotateRight',
      color: 'brand',
      pad: 'small',
      round: 'full',
      size: 'small'
    }
  },
  'spinner.icon': {
    description: "An icon or an SVG to use as the default Spinner.",
    type: 'ReactElement | SVG',
    defaultValue: undefined
  },
  'spinner.size.xsmall': {
    description: 'The xsmall size of the Spinner.',
    type: 'string',
    defaultValue: '18px'
  },
  'spinner.size.small': {
    description: 'The small size of the Spinner.',
    type: 'string',
    defaultValue: '24px'
  },
  'spinner.size.medium': {
    description: 'The medium size of the Spinner.',
    type: 'string',
    defaultValue: '48px'
  },
  'spinner.size.large': {
    description: 'The large size of the Spinner.',
    type: 'string',
    defaultValue: '72px'
  },
  'spinner.size.xlarge': {
    description: 'The xlarge size of the Spinner.',
    type: 'string',
    defaultValue: '96px'
  }
};
exports.themeDoc = themeDoc;