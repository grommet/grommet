import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    fillColor: PropTypes.string,
    name: PropTypes.string,
    label: PropType.string,
    onChange: PropTypes.func,
    outlineColor: PropType.string,
    scale: PropTypes.number,
    value: PropTypes.number,
  };
}
export const FeedbackRatingTypes = PropType;
