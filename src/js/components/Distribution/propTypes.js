import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    basis: PropTypes.oneOfType([
      PropTypes.oneOf([
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'xxlarge',
        'full',
        '1/2',
        '1/3',
        '2/3',
        '1/4',
        '2/4',
        '3/4',
        'auto',
      ]),
      PropTypes.string,
    ]),
    children: PropTypes.func,
    fill: PropTypes.bool,
    gap: PropTypes.oneOfType([
      PropTypes.oneOf([
        'none',
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
      ]),
      PropTypes.string,
    ]),
    values: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
      }),
    ).isRequired,
  };
}
export const DistributionPropTypes = PropType;
