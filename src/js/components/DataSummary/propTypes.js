import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    messages: PropTypes.shape({
      filtered: PropTypes.string,
      total: PropTypes.string,
    }),
  };
}
export const DataSummaryPropTypes = PropType;
