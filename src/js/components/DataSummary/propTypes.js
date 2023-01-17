import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    messages: PropTypes.shape({
      filteredTotal: PropTypes.number,
      total: PropTypes.number,
    }),
  };
}
export const DataSummaryPropTypes = PropType;
