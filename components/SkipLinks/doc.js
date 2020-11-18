"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _mixins = require("../../utils/mixins");

var doc = function doc(SkipLinks) {
  var DocumentedSkipLinks = (0, _reactDesc.describe)(SkipLinks).availableAt((0, _mixins.getAvailableAtBadge)('SkipLinks', 'Utilities')).description('Describe a list of elements to skip to.').usage("import { SkipLinks } from 'grommet';\n<SkipLinks elements={['main', 'footer']} />");
  DocumentedSkipLinks.propTypes = {
    children: _reactDesc.PropTypes.node.description('Array of SkipLink').isRequired,
    messages: _reactDesc.PropTypes.shape({
      skipTo: _reactDesc.PropTypes.string
    }).description("Custom messages for SkipLinks. Used for accessibility by screen \nreaders.")
  };
  return DocumentedSkipLinks;
};

exports.doc = doc;
var themeDoc = {
  'skipLinks.position': {
    description: 'Position of the layer content once opened.',
    type: 'string',
    defaultValue: 'top'
  },
  'skipLinks.container': {
    description: 'Any valid Box prop for the SkipLinks container.',
    type: 'object',
    defaultValue: "{ elevation: 'large', pad: 'medium', round: 'small' }"
  },
  'skipLinks.container.elevation': {
    description: 'The container shadow.',
    type: 'string',
    defaultValue: 'large'
  },
  'skipLinks.container.pad': {
    description: 'The pad used for the layer container.',
    type: 'string | object',
    defaultValue: 'medium'
  },
  'skipLinks.container.round': {
    description: 'The rounding of the later container.',
    type: 'boolean | string | object',
    defaultValue: 'small'
  },
  'skipLinks.label': {
    description: 'Any valid Text prop for the text message.',
    type: 'object',
    defaultValue: "{ margin: 'small', size: 'medium' }"
  },
  'skipLinks.label.margin': {
    description: 'The margin size around the text message.',
    type: 'string',
    defaultValue: '{ bottom: medium }'
  },
  'skipLinks.label.size': {
    description: 'The font size of the text label.',
    type: 'string',
    defaultValue: 'medium'
  },
  'text.medium.size': {
    description: 'The font size of the text label.',
    type: 'string',
    defaultValue: '18px'
  }
};
exports.themeDoc = themeDoc;