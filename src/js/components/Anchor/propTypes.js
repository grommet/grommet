import PropTypes from 'prop-types';
import { colorPropType, genericProps } from '../../utils/general-prop-types';

export const AnchorType = {
  ...genericProps,
  a11yTitle: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  color: colorPropType,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.element,
  label: PropTypes.node,
  onClick: PropTypes.func,
  reverse: PropTypes.bool,
  size: PropTypes.oneOfType([
    PropTypes.oneOf([
      'xsmall',
      'small',
      'medium',
      'large',
      'xlarge',
      'xxlarge',
    ]),
    PropTypes.string,
  ]),
  weight: PropTypes.oneOfType([
    PropTypes.oneOf([
      'normal',
      'bold',
      'lighter',
      'bolder',
      'inherit',
      'initial',
      'revert',
      'unset',
    ]),
    PropTypes.number,
  ]),
};
