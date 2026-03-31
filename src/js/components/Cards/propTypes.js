import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    as: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
    ),
    children: PropTypes.func,
    onMore: PropTypes.func,
    paginate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    show: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({ page: PropTypes.number }),
    ]),
    step: PropTypes.number,
  };
}
export const CardsPropTypes = PropType;
