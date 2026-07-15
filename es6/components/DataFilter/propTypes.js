import PropTypes from 'prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
    })])),
    property: PropTypes.string,
    range: PropTypes.shape({
      max: PropTypes.number,
      min: PropTypes.number,
      step: PropTypes.number
    })
  };
}
export var DataFilterPropTypes = PropType;