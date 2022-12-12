import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    scale: PropTypes.number,
  };
}
export const StarRatingPropTypes = PropType;
