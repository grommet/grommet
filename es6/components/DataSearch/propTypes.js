import PropTypes from 'prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    drop: PropTypes.bool,
    responsive: PropTypes.bool
  };
}
export var DataSearchPropTypes = PropType;