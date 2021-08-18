import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    a11yTitle: PropTypes.string,
    id: PropTypes.string,
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string,
    onChange: PropTypes.func,
    step: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };
}
export const RangeInputPropTypes = PropType;
