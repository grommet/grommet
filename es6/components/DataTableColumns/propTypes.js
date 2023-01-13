import PropTypes from 'prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    drop: PropTypes.bool.isRequired,
    options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      property: PropTypes.string
    }))]).isRequired
  };
}
export var DataTableColumnsPropTypes = PropType;