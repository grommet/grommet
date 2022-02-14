import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onRemove: PropTypes.func,
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]),
  };
}
export const TagPropTypes = PropType;
