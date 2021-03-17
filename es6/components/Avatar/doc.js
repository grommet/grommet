import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge } from '../../utils/mixins';
export var doc = function doc(Avatar) {
  var DocumentedAvatar = describe(Avatar).availableAt(getAvailableAtBadge('Avatar', 'Visualizations')).description('An Avatar.').usage("import { Avatar } from 'grommet';\n<Avatar/>").intrinsicElement('div');
  DocumentedAvatar.propTypes = {
    size: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', '2xl', '3xl', '4xl', '5xl']), PropTypes.string]).description('A fixed size.').defaultValue('medium'),
    src: PropTypes.oneOfType([PropTypes.string]).description("Specifies a URL string for an avatar image.")
  };
  return DocumentedAvatar;
};
export var themeDoc = {
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
  'avatar.size.2xl': {
    description: 'The 2xlarge size of the Avatar.',
    type: 'string',
    defaultValue: '120px'
  },
  'avatar.size.3xl': {
    description: 'The 3xlarge size of the Avatar.',
    type: 'string',
    defaultValue: '144px'
  },
  'avatar.size.4xl': {
    description: 'The 4xlarge size of the Avatar.',
    type: 'string',
    defaultValue: '168px'
  },
  'avatar.size.5xl': {
    description: 'The 5xlarge size of the Avatar.',
    type: 'string',
    defaultValue: '192px'
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
    defaultValue: '14px'
  },
  'avatar.text.size.small': {
    description: "The size of the text that is mapped according to 'avatar.size.small'.",
    type: 'string',
    defaultValue: '18px'
  },
  'avatar.text.size.medium': {
    description: "The size of the text that is mapped according to 'avatar.size.medium'.",
    type: 'string',
    defaultValue: '22px'
  },
  'avatar.text.size.large': {
    description: "The size of the text that is mapped according to 'avatar.size.large'.",
    type: 'string',
    defaultValue: '26px'
  },
  'avatar.text.size.xlarge': {
    description: "The size of the text that is mapped according to 'avatar.size.xlarge'.",
    type: 'string',
    defaultValue: '34px'
  },
  'avatar.text.size.2xl': {
    description: "The size of the text that is mapped according to 'avatar.size.2xl'.",
    type: 'string',
    defaultValue: '42px'
  },
  'avatar.text.size.3xl': {
    description: "The size of the text that is mapped according to 'avatar.size.3xl'.",
    type: 'string',
    defaultValue: '54px'
  },
  'avatar.text.size.4xl': {
    description: "The size of the text that is mapped according to 'avatar.size.4xl'.",
    type: 'string',
    defaultValue: '70px'
  },
  'avatar.text.size.5xl': {
    description: "The size of the text that is mapped according to 'avatar.size.5xl'.",
    type: 'string',
    defaultValue: '90px'
  }
};