import PropTypes from 'prop-types';
import {
  backgroundPropType,
  genericProps,
} from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    background: backgroundPropType,
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onRemove: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
  };
}
export const TagPropTypes = PropType;
