import PropTypes from 'prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    drop: PropTypes.bool,
    heading: PropTypes.string,
    layer: PropTypes.bool
  };
}
export var DataFiltersPropTypes = PropType;