import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    drop: PropTypes.bool,
    heading: PropTypes.string,
  };
}
export const DataFiltersPropTypes = PropType;
