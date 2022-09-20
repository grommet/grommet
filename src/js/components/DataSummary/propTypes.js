import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    property: PropTypes.string,
  };
}
export const DataSummaryPropTypes = PropType;
