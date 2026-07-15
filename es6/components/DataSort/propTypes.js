import PropTypes from 'prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    drop: PropTypes.bool
  };
}
export var DataSortPropTypes = PropType;