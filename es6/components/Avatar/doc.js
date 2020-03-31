import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge } from '../../utils';
export var doc = function doc(Avatar) {
  var DocumentedAvatar = describe(Avatar).availableAt(getAvailableAtBadge('Avatar')).description('An Avatar.').usage("import { Avatar } from 'grommet';\n<Avatar/>").intrinsicElement('div');
  DocumentedAvatar.propTypes = {
    size: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]).description('A fixed size.').defaultValue('medium'),
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
  'avatar.text.extend': {
    description: 'Any additional style for the text.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'avatar.text.fontWeight': {
    description: 'The font weight of the label.',
    type: 'number',
    defaultValue: undefined
  }
};