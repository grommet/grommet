import PropTypes from 'prop-types';

export const AvatarType = {
  size: PropTypes.oneOfType([
    PropTypes.oneOf([
      'xsmall',
      'small',
      'medium',
      'large',
      'xlarge',
      '2xl',
      '3xl',
      '4xl',
      '5xl',
    ]),
    PropTypes.string,
  ]),
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
