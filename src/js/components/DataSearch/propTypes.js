import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    drop: PropTypes.bool,
    responsive: PropTypes.bool,
  };
}
export const DataSearchPropTypes = PropType;
