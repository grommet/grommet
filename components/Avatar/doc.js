"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _mixins = require("../../utils/mixins");

var doc = function doc(Avatar) {
  var DocumentedAvatar = (0, _reactDesc.describe)(Avatar).availableAt((0, _mixins.getAvailableAtBadge)('Avatar', 'Visualizations')).description('An Avatar.').usage("import { Avatar } from 'grommet';\n<Avatar/>").intrinsicElement('div');
  DocumentedAvatar.propTypes = {
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]).description('A fixed size.').defaultValue('medium'),
    src: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string]).description("Specifies a URL string for an avatar image.")
  };
  return DocumentedAvatar;
};

exports.doc = doc;
var themeDoc = {
  'avatar.extend': {
    description: 'Any additional style for the Avatar.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'avatar.size.xsmall': {
    description: 'The xsmall size of the Avatar.',
    type: 'string',
    defaultValue: '18px'
  },
  'avatar.size.small': {
    description: 'The small size of the Avatar.',
    type: 'string',
    defaultValue: '24px'
  },
  'avatar.size.medium': {
    description: 'The medium size of the Avatar.',
    type: 'string',
    defaultValue: '48px'
  },
  'avatar.size.large': {
    description: 'The large size of the Avatar.',
    type: 'string',
    defaultValue: '72px'
  },
  'avatar.size.xlarge': {
    description: 'The xlarge size of the Avatar.',
    type: 'string',
    defaultValue: '96px'
  },
  'avatar.text.extend': {
    description: 'Any additional style for the text.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'avatar.text.fontWeight': {
    description: 'The font weight of the label.',
    type: 'number',
    defaultValue: undefined
  },
  'avatar.text.size.xsmall': {
    description: "The size of the text that is mapped according to 'avatar.size.xsmall'.",
    type: 'string',
    defaultValue: 'small'
  },
  'avatar.text.size.small': {
    description: "The size of the text that is mapped according to 'avatar.size.small'.",
    type: 'string',
    defaultValue: 'medium'
  },
  'avatar.text.size.medium': {
    description: "The size of the text that is mapped according to 'avatar.size.medium'.",
    type: 'string',
    defaultValue: 'large'
  },
  'avatar.text.size.large': {
    description: "The size of the text that is mapped according to 'avatar.size.large'.",
    type: 'string',
    defaultValue: 'xlarge'
  },
  'avatar.text.size.xlarge': {
    description: "The size of the text that is mapped according to 'avatar.size.xlarge'.",
    type: 'string',
    defaultValue: 'xxlarge'
  }
};
exports.themeDoc = themeDoc;