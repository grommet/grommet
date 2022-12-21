import PropTypes from 'prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    messages: PropTypes.shape({
      filtered: PropTypes.string,
      total: PropTypes.string
    })
  };
}
export var DataSummaryPropTypes = PropType;