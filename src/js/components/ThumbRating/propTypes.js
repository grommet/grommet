import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    fillColor: PropType.string,
    onChange: PropTypes.func,
    outlineColor: PropType.string,
    options: PropType.array,
    scale: PropTypes.number,
    value: PropTypes.number,
  };
}
export const FeedbackPosNegPropTypes = PropType;
