import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    messages: PropTypes.shape({
      filtered: PropTypes.string,
      filteredSingle: PropTypes.string,
      items: PropTypes.string,
      itemsSingle: PropTypes.string,
      selected: PropTypes.string,
      total: PropTypes.string,
      totalSingle: PropTypes.string,
    }),
  };
}
export const DataSummaryPropTypes = PropType;
