import PropTypes from 'prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    drop: PropTypes.bool,
    responsive: PropTypes.bool,
    updateOn: PropTypes.oneOf(['change', 'submit'])
  };
}
export var DataSearchPropTypes = PropType;