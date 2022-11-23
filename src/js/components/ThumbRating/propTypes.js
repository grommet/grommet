import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    outlineColor: PropType.string,
    fillColor: PropType.string,
    onChange: PropTypes.func,
    scale: PropTypes.number,
    value: PropTypes.number,
  };
}
export const FeedbackPosNegPropTypes = PropType;
