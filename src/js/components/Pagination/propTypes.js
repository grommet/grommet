import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    numberEdgePages: PropTypes.number,
    numberItems: PropTypes.number,
    numberMiddlePages: PropTypes.number,
    onChange: PropTypes.func,
    page: PropTypes.number,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    step: PropTypes.number,
  };
}
export const PaginationPropTypes = PropType;
