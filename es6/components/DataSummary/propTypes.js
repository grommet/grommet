import PropTypes from 'prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    messages: PropTypes.shape({
      filteredTotal: PropTypes.number,
      total: PropTypes.number
    })
  };
}
export var DataSummaryPropTypes = PropType;