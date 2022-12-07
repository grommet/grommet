import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    color: PropTypes.string,
    onChange: PropTypes.func,
    scale: PropTypes.number,
  };
}
export const FeedbackRatingTypes = PropType;
