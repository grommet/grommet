import PropTypes from 'prop-types';
import { colorPropType, genericProps } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
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
      PropTypes.oneOf(['normal', 'bold']),
      PropTypes.number,
    ]),
  };
}
export const AnchorPropType = PropType;
