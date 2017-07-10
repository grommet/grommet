import PropTypes from 'prop-types';

export default {
  activeIndex: PropTypes.number,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  onActivate: PropTypes.func.isRequired,
  series: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string, // used in Spiral
    value: PropTypes.number.isRequired,
    colorIndex: PropTypes.string,
    onClick: PropTypes.func
  })).isRequired,
  stacked: PropTypes.bool,
  thresholds: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    colorIndex: PropTypes.string
  })).isRequired,
  total: PropTypes.number.isRequired,
  vertical: PropTypes.bool
};
