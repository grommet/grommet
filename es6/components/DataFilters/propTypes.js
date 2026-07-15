import PropTypes from 'prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    clearFilters: PropTypes.bool,
    drop: PropTypes.bool,
    heading: PropTypes.string,
    layer: PropTypes.bool,
    updateOn: PropTypes.oneOf(['change', 'submit'])
  };
}
export var DataFiltersPropTypes = PropType;